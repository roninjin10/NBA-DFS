import { wrappedCreateStore } from './redux/createStore'
import { createStore } from 'redux'
import { AppState } from './redux/AppState'

interface CheckForWorker {
  <TArgs extends any[], TReturn>(cb: (...args: TArgs) => TReturn): (
    ...args: TArgs
  ) => TReturn | null
}

const checkForWorker: CheckForWorker = cb => (...args) => {
  if (!navigator.serviceWorker) {
    console.warn('this browser does not support service workers')
    return null
  }
  return cb(...args)
}

export const messageWorker = checkForWorker(
  ({ port1: outPort, port2: inPort }: MessageChannel) => <T>(message: T) =>
    new Promise((resolve, reject) => {
      outPort.onmessage = ({ data }) => (!data.error ? resolve(data) : reject(data.error))

      navigator.serviceWorker.controller.postMessage(message, [inPort])
    })
)

interface ListenToWorker {
  (cb: (t: MessageEvent) => void): void
}

const _listenToWorker: ListenToWorker = cb =>
  navigator.serviceWorker.addEventListener('message', cb)

export const listenToWorker = checkForWorker(_listenToWorker)

class WrappedReduxStore {
  dispatch: ReturnType<typeof wrappedCreateStore>['dispatch']
  getState: ReturnType<typeof wrappedCreateStore>['getState']
  replaceReducer: ReturnType<typeof wrappedCreateStore>['replaceReducer']
  subscribe: ReturnType<typeof wrappedCreateStore>['subscribe']

  constructor() {
    const { dispatch, getState, replaceReducer, subscribe } = wrappedCreateStore()

    this.dispatch = dispatch
    this.getState = getState
    this.replaceReducer = replaceReducer
    this.subscribe = subscribe
  }
}

export class WorkerStore extends Store {
  constructor(self: ServiceWorker) {
    super()

    self.addEventListener('message', this._onMessage)
  }

  private _onMessage: EventListenerOrEventListenerObject = (e: MessageEvent) => {
    this.dispatch(e.data)

    e.ports[0].postMessage(this._store.getState())
  }
}

export const listenForProxyStore = (self: ServiceWorker, store: Store<AppState>): void => {
  self.addEventListener('message', ({ data, ports: [port] }: MessageEvent) => {
    store.dispatch(data)

    port.postMessage(store.getState())
  })
}
