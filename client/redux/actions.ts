import actionCreatorFactory, { ActionCreator } from 'typescript-fsa'
import { AppState, Player, HomeAway } from './AppState'
import { ERANGE } from 'constants';

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

export const setPlayerSort: ActionCreator<keyof Player> = actionCreator<keyof Player>('setPlayerSort')
export function setPlayerSortHandler(state: AppState, sortBy: keyof Player): AppState {
  return {
    ...state,
    sortBy,
    isSortByReversed: sortBy === state.sortBy && !state.isSortByReversed
  }
}
