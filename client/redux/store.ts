import { createStore, Store } from 'redux'
import { workerReducers, proxyReducers } from '../redux/reducers'
import { INITIAL_STATE } from '../redux/initialState'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { IS_PROD } from '../lib/isProd'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { proxyEpics, workerEpics } from './epics'
import * as actions from './actions'
import { AppState } from './AppState'

const getProxyMiddleware = () => {
  const epicMiddleware = createEpicMiddleware()

  const run = () => epicMiddleware.run(proxyEpics)

  const middleware = applyMiddleware(routerMiddleware(createBrowserHistory()), epicMiddleware)

  return { middleware, run }
}

const getWorkerMiddleware = () => {
  const epicMiddleware = createEpicMiddleware()

  const run = () => epicMiddleware.run(workerEpics)

  const middleware = applyMiddleware(epicMiddleware)

  const maybeComposedMiddleware = IS_PROD ? middleware : composeWithDevTools(middleware)

  return {
    middleware: maybeComposedMiddleware,
    run,
  }
}

const connectWorkerToProxy = (worker: ServiceWorker) => (store: Store<AppState>) => {
  let proxyPort: MessagePort | null = null

  const listenForProxyDispatches = (e: MessageEvent) => {
    proxyPort = e.ports[0]
    store.dispatch(e.data)
  }

  const updateProxy = () =>
    proxyPort ? proxyPort.postMessage(store.getState()) : console.warn('proxy store is not ready')

  store.subscribe(updateProxy)
  worker.addEventListener('message', (e: Event) => listenForProxyDispatches(e as MessageEvent))

  return store
}

const connectProxyToWorker = (navigator: Navigator) => (store: Store<AppState>) => {
  const handleWorkerStoreUpdate = (ev: MessageEvent) =>
    store.dispatch(actions.updateState(ev.data as AppState))

  navigator.serviceWorker.addEventListener('message', handleWorkerStoreUpdate)

  return store
}

export const createWorkerStore = (worker: ServiceWorker) => {
  const { middleware, run } = getWorkerMiddleware()
  const store = connectWorkerToProxy(worker)(createStore(workerReducers, INITIAL_STATE, middleware))
  run()
  return store
}

export const createProxyStore = (navigator: Navigator) => {
  const { middleware, run } = getProxyMiddleware()
  const store = connectProxyToWorker(navigator)(
    createStore(proxyReducers, INITIAL_STATE, middleware)
  )
  run()
  return store
}
