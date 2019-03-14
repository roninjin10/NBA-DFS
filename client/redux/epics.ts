import { combineEpics, Epic } from 'redux-observable'
import { filter, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import * as actions from './actions'
import { messageWorker } from '../serviceWorker'

interface Message<T> {
  type: string
  payload: T
}

class Epics {
  private readonly messageWorker = messageWorker(new MessageChannel())

  dispatchToProxyStore: Epic = action$ =>
    action$.pipe(mergeMap(action => this.messageWorker(action)))
}

const epics = new Epics()

export const proxyEpics = combineEpics(epics.dispatchToProxyStore)

export const workerEpics = combineEpics()