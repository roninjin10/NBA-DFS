import rawPlayerPool from '../dummyData/pool.json'
import { Filters, SortBy, AppState } from './AppState';
import { dummyDataToPlayer } from '../lib/dummyDataToPlayer'
import { Player, HomeAway, INBALineup } from '../lib/types';

const freeze = Object.freeze.bind(Object) as <T>(obj: T) => T

interface Unique {
  <T extends any[]>(arr: T): T
}

const unique: Unique = arr => [...new Set(arr)] as typeof arr

interface GetGames {
  (playerPool: Player[]): HomeAway[]
}

const getGames: GetGames = playerPool => {
  return freeze(unique(
    playerPool
      .map(player => player.gameInfo)
      .map(info => JSON.stringify(info))
  ).map(jsonString => JSON.parse(jsonString)))
}

const INITIAL_POOL: Player[] = freeze(rawPlayerPool.map(dummyDataToPlayer))

const INITIAL_LINEUP = freeze([null, null, null, null, null, null, null, null] as INBALineup)

const INITIAL_FILTERS: Filters = freeze({
  team: new Set(),
  position: new Set(),
})

const INITIAL_SORT_BY: SortBy = 'salary'

const INITIAL_GAMES: HomeAway[] = getGames(INITIAL_POOL)

export const INITIAL_STATE: AppState = freeze({
  initialPool: INITIAL_POOL,
  isSortByReversed: false,
  playerPool: INITIAL_POOL,
  lineup: INITIAL_LINEUP,
  filters: INITIAL_FILTERS,
  sortBy: INITIAL_SORT_BY,
  games: INITIAL_GAMES,
})
