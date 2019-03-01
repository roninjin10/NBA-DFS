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

export const addToLineup: ActionCreator<number> = actionCreator<number>('addToLineup')
export function addToLineupHandler(state: AppState, playerIndex: number): AppState {
  const player = state.playerPool[playerIndex]

  const playerPool = state.playerPool.filter((_, i) => i !== playerIndex)
  const lineup = [...state.lineup, player]
  return {
    ...state,
    playerPool,
    lineup,
  }
}