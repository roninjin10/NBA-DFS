import actionCreatorFactory, { ActionCreator } from 'typescript-fsa'
import { AppState } from './AppState'

const actionCreator = actionCreatorFactory('app')

// delete me
export const setTitle: ActionCreator<string> = actionCreator<string>('setTitle')
export function setTitleHandler(state: AppState): AppState {
  return {
    ...state,
  }
}
