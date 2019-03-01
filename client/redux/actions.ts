import actionCreatorFactory, { ActionCreator } from 'typescript-fsa'
import { AppState, Player } from './AppState'

const actionCreator = actionCreatorFactory('app')

const freeze = Object.freeze.bind(Object) as typeof Object.freeze

function sortPool(field: keyof Player, playerPool: Player[]): Player[] {
  return freeze(playerPool.sort((a, b) => {
    return a[field] > b[field] ? 1 : -1
  })) as Player[]
}

function resortPool(state: AppState) {
  return freeze({
    ...state,
    playerPool: sortPool(state.sortBy, state.playerPool)
  })
}

export const addToLineup: ActionCreator<number> = actionCreator<number>('addToLineup')
export function addToLineupHandler(state: AppState, playerIndex: number): AppState {
  const player = state.playerPool[playerIndex]

  const playerPool = state.playerPool.filter((_, i) => i !== playerIndex)

  const lineup = [...state.lineup, player]
  return freeze(resortPool({
    ...state,
    playerPool,
    lineup,
  }))
}

export const removeFromLineup: ActionCreator<number> = actionCreator<number>('removeFromLineup')
export function removeFromLineupHandler(state: AppState, playerIndex: number): AppState {
  const player = state.lineup[playerIndex]

  const playerPool = [...state.playerPool, player]

  const lineup = state.lineup.filter((_, i) => i !== playerIndex)

  return freeze(resortPool({
    ...state,
    playerPool,
    lineup,
  }))
}

export const setPlayerSort: ActionCreator<keyof Player> = actionCreator<keyof Player>('setPlayerSort')
export function setPlayerSortHandler(state: AppState, sortBy: keyof Player): AppState {
  return freeze(resortPool({
    ...state,
    sortBy,
  }))
}
