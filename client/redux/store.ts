import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore, Store } from 'redux'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { IS_PROD } from '../lib/isProd'
import { INITIAL_STATE } from '../redux/initialState'
import { proxyReducers, workerReducers } from '../redux/reducers'
import * as actions from './actions'
import { AppState } from './AppState'
import { proxyEpics, workerEpics } from './epics'

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
  const proxyPort: MessagePort | null = null

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
