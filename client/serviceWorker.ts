import { createStore, Store } from 'redux'
import { AppState } from './redux/AppState'
import { createWorkerStore } from './redux/store'

type CheckForWorker = <TArgs extends any[], TReturn>(
  cb: (...args: TArgs) => TReturn
) => (...args: TArgs) => TReturn | null

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
      // tslint:disable-next-line
      outPort.onmessage = ({ data }) => (!data.error ? resolve(data) : reject(data.error))

      navigator.serviceWorker!.controller!.postMessage(message, [inPort])
    })
)

type AddWorkerListener = (cb: (t: MessageEvent) => void) => void

const addWorkerListener: AddWorkerListener = cb =>
  navigator.serviceWorker.addEventListener('message', cb)

export const listenToWorker = checkForWorker(addWorkerListener)

type WTF = any

export const listenForProxyStore = (self: ServiceWorker, store: Store<AppState>): void => {
  self.addEventListener('message', ({ data, ports: [port] }: WTF) => {
    store.dispatch(data)

    port.postMessage(store.getState())
  })
}
