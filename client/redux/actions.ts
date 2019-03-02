import actionCreatorFactory, { ActionCreator } from 'typescript-fsa'
import { AppState, Player, HomeAway } from './AppState'
import { ERANGE } from 'constants';

const actionCreator = actionCreatorFactory('app')

type PlayerId = string

export const addToLineup: ActionCreator<PlayerId> = actionCreator<PlayerId>('addToLineup')
export function addToLineupHandler(state: AppState, id: PlayerId): AppState {
  const newPlayer = state.playerPool.find(player => player.id === id)!

  const playerPool = state.playerPool.filter(player => player !== newPlayer)

  const lineup = [...state.lineup, newPlayer]
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

export const setTeamFilter: ActionCreator<string> = actionCreator<string>('setTeamFilter')
export function setTeamFilterHandler(state: AppState, team: string): AppState {
  const newTeamFilter = new Set([...state.filters.team])

  newTeamFilter.has(team)
    ? newTeamFilter.delete(team)
    : newTeamFilter.add(team)


  return {
    ...state,
    filters: {
      ...state.filters,
      team: newTeamFilter
    }
  }
}

export const setPositionFilter: ActionCreator<string> = actionCreator<string>('setTeamFilter')
export function setPositionFilterHandler(state: AppState, position: string): AppState {
  const newPositionFilter = new Set([...state.filters.team])

  newPositionFilter.has(position)
    ? newPositionFilter.delete(position)
    : newPositionFilter.add(position)


  return {
    ...state,
    filters: {
      ...state.filters,
      team: newPositionFilter
    }
  }
}
