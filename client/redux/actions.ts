import actionCreatorFactory, { ActionCreator } from 'typescript-fsa'
import { AppState } from './AppState'

const actionCreator = actionCreatorFactory('app')

export const setTitle: ActionCreator<string> = actionCreator<string>('setTitle')
export function setTitleHandler(state: AppState, title: string): AppState {
  return {
    ...state,
    title,
  }
}
