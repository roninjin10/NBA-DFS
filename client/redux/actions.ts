import actionCreatorFactory, { ActionCreator } from 'typescript-fsa'
import { AppState, Player, HomeAway, Filters } from './AppState'
import * as functionalSets from '../lib/functionalSets'
import { INITIAL_STATE } from './initialState';

const actionCreator = actionCreatorFactory('app')

type PlayerId = string

interface ActionHandler<T> {
  (state: AppState, payload: T): AppState
}

export const addToLineup = actionCreator<PlayerId>('addToLineup')
export const addToLineupHandler: ActionHandler<PlayerId> = (state, id) => {
  const newPlayer = state.playerPool.find(player => player.id === id)!

  const playerPool = state.playerPool.filter(player => player !== newPlayer)

  const lineup = [...state.lineup, newPlayer]
  return {
    ...state,
    playerPool,
    lineup,
  }
}

export const removeFromLineup = actionCreator<number>('removeFromLineup')
export const removeFromLineupHandler: ActionHandler<number> = (state, playerIndex) => {
  const player = state.lineup[playerIndex]

  const playerPool = [...state.playerPool, player]

  const lineup = state.lineup.filter((_, i) => i !== playerIndex)

  return {
    ...state,
    playerPool,
    lineup,
  }
}

export const setPlayerSort = actionCreator<keyof Player>('setPlayerSort')
export const setPlayerSortHandler: ActionHandler<keyof Player> = (state, sortBy) => {
  return {
    ...state,
    sortBy,
    isSortByReversed: sortBy === state.sortBy && !state.isSortByReversed
  }
}

interface FilterHandlerPayload {
  item: string
  filter: keyof Filters
}

const filterHandler: ActionHandler<FilterHandlerPayload> = (state, { item, filter }) => {
  const oldFilter = state.filters[filter]

  const newFilter = functionalSets.toggleItem(oldFilter, item)

  return {
    ...state,
    filters: {
      ...state.filters,
      [filter]: newFilter
    }
  }
}

export const setTeamFilter = actionCreator<string>('setTeamFilter')
export const setTeamFilterHandler: ActionHandler<string> = (state, team) =>
  filterHandler(state, {
    item: team,
    filter: 'team'
  })

export const setPositionFilter = actionCreator<string>('setPositionFilter')
export const setPositionFilterHandler: ActionHandler<string> = (state, position) =>
  filterHandler(state, {
    item: position,
    filter: 'position'
  })
