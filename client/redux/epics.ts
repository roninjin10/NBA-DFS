import { combineEpics, Epic } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import { messageWorker } from '../serviceWorker'

type WTF = any

const _messageWorker = messageWorker(new MessageChannel()) as WTF

const dispatchToProxyStore: Epic = action$ =>
  action$.pipe(mergeMap(action => _messageWorker(action)))

export const proxyEpics = combineEpics(dispatchToProxyStore)

export const workerEpics = combineEpics()
