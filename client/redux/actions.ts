import actionCreatorFactory, { ActionCreator } from 'typescript-fsa'
import { AppState } from './AppState'

const actionCreator = actionCreatorFactory('app')

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

export const removeFromLineup: ActionCreator<number> = actionCreator<number>('removeFromLineup')
export function removeFromLineupHandler(state: AppState, playerIndex: number): AppState {
  const player = state.lineup[playerIndex]

  const playerPool = [...state.playerPool, player]

  const lineup = state.lineup.filter((_, i) => i !== playerIndex)

  return {
    ...state,
    playerPool,
    lineup,
  }
}
