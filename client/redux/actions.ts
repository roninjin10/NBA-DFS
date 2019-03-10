import actionCreatorFactory from 'typescript-fsa'
import { AppState, Filters } from './AppState'
import * as functionalSets from '../lib/functionalSets'
import { NBALineup } from '../lib/NBALineup'
import { ZeroThroughEight, Player } from '../lib/types'

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
      lineup: new NBALineup([...state.lineup]).addPlayers(newPlayer).toArray(),
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
export const setPlayerSortHandler: ActionHandler<keyof Player> = (state, sortBy) => ({
  ...state,
  sortBy,
  isSortByReversed: sortBy === state.sortBy && !state.isSortByReversed,
})

interface ToggleFilterHandlerPayload {
  item: string
  filter: keyof Filters
}

const toggleFilterHandler: ActionHandler<ToggleFilterHandlerPayload> = (
  state,
  { item, filter }
) => ({
  ...state,
  filters: {
    ...state.filters,
    [filter]: functionalSets.toggleItem(state.filters[filter], item),
  },
})

export const toggleTeamFilter = actionCreator<string>('toggleTeamFilter')
export const toggleTeamFilterHandler: ActionHandler<string> = (state, team) =>
  toggleFilterHandler(state, {
    item: team,
    filter: 'team',
  })

const allTeams = (games: AppState['games']) =>
  games.reduce((a, { home, away }) => [...a, home, away], [] as string[])

export const toggleAllGames = actionCreator<undefined>('toggleAllGames')
export const toggleAllGamesHandler: ActionHandler<undefined> = state => ({
  ...state,
  filters: {
    ...state.filters,
    team: state.filters.team.size ? new Set() : new Set(allTeams(state.games)),
  },
})

export const togglePositionFilter = actionCreator<string>('togglePositionFilter')
export const togglePositionFilterHandler: ActionHandler<string> = (state, position) =>
  toggleFilterHandler(state, {
    item: position,
    filter: 'position',
  })

export const setPickerSearch = actionCreator<string>('setPickerSearch')
export const setPickerSearchHandler: ActionHandler<string> = (state, searchString) => ({
  ...state,
  pickerSearch: searchString,
})
