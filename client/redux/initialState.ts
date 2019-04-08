import rawPlayerPool from '../dummyData/pool.json'
import { dummyDataToPlayer } from '../lib/dummyDataToPlayer'
import { IHomeAway, INBALineup, IPlayer } from '../lib/types'
import { IAppState, IFilters, SortBy } from './AppState'

type Unique = <T extends Array<any>>(arr: T) => T

const unique: Unique = arr => [...new Set(arr)] as typeof arr

type GetGames = (playerPool: Array<IPlayer>) => Array<IHomeAway>

const getGames: GetGames = playerPool =>
  unique(playerPool.map(player => player.gameInfo).map(info => JSON.stringify(info))).map(
    jsonString => JSON.parse(jsonString)
  )

const INITIAL_POOL: Array<IPlayer> = rawPlayerPool.map(dummyDataToPlayer)

const INITIAL_LINEUP = [null, null, null, null, null, null, null, null] as INBALineup

const INITIAL_FILTERS: IFilters = {
  position: new Set(),
  team: new Set(),
}

const INITIAL_SORT_BY: SortBy = 'salary'

const INITIAL_GAMES: ReadonlyArray<IHomeAway> = getGames(INITIAL_POOL)

export const INITIAL_STATE: IAppState = {
  filters: INITIAL_FILTERS,
  games: INITIAL_GAMES,
  initialPool: INITIAL_POOL,
  isSortByReversed: false,
  lineup: INITIAL_LINEUP,
  playerPool: INITIAL_POOL,
  playerSearch: '',
  sortBy: INITIAL_SORT_BY,
}
