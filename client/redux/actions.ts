import actionCreatorFactory from 'typescript-fsa'
import { AppState, Player, Filters } from './AppState'
import * as functionalSets from '../lib/functionalSets'
import { NBALineup, ZeroThroughEight } from '../lib/NBALineup'

const actionCreator = actionCreatorFactory('app')

type PlayerId = string

interface ActionHandler<T> {
  (state: AppState, payload: T): AppState
}

export const addToLineup = actionCreator<PlayerId>('addToLineup')
export const addToLineupHandler: ActionHandler<PlayerId> = (state, id) => {
  const newPlayer = state.playerPool.find(player => player.id === id)!

  const playerPool = state.playerPool.filter(player => player !== newPlayer)

  try {
    return {
      ...state,
      playerPool,
      lineup: new NBALineup([...state.lineup])
        .addPlayers(newPlayer)
        .toArray()
    }
  } catch (e) {
    console.error('unable to add player to lineup', e)
    return state
  }

}

export const removeFromLineup = actionCreator<ZeroThroughEight>('removeFromLineup')
export const removeFromLineupHandler: ActionHandler<ZeroThroughEight> = (state, playerIndex) => {
  const player = state.lineup[playerIndex]

  if (!player) return state

  const playerPool = [...state.playerPool, player]

  const lineup = new NBALineup([...state.lineup])
    .removePlayer(playerIndex as ZeroThroughEight)
    .toArray()

  return {
    ...state,
    playerPool,
    lineup,
  }
}

export const setPlayerSort = actionCreator<keyof Player>('setPlayerSort')
export const setPlayerSortHandler: ActionHandler<keyof Player> = (state, sortBy) => {
  return ({
    ...state,
    sortBy,
    isSortByReversed: sortBy === state.sortBy && !state.isSortByReversed
  })
}

interface FilterHandlerPayload {
  item: string
  filter: keyof Filters
}

const filterHandler: ActionHandler<FilterHandlerPayload> = (state, { item, filter }) => {
  return ({
    ...state,
    filters: {
      ...state.filters,
      [filter]: functionalSets.toggleItem(state.filters[filter], item)
    }
  })
}

export const setTeamFilter = actionCreator<string>('setTeamFilter')
export const setTeamFilterHandler: ActionHandler<string> = (state, team) => {
  return filterHandler(state, {
    item: team,
    filter: 'team'
  })
}

export const setPositionFilter = actionCreator<string>('setPositionFilter')
export const setPositionFilterHandler: ActionHandler<string> = (state, position) => {
  return filterHandler(state, {
    item: position,
    filter: 'position'
  })
}
