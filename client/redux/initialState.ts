import rawPlayerPool from '../dummyData/pool.json'
import { Player, Filters, SortBy, AppState, HomeAway } from './AppState';
import { dummyDataToPlayer } from '../lib/dummyDataToPlayer'

const freeze = Object.freeze.bind(Object) as typeof Object.freeze

function unique<T extends any[]>(arr: T): T {
  return Array.from(new Set(arr)) as T
}

function getGames(playerPool: Player[]): HomeAway[] {
  return freeze(unique(
    playerPool
      .map(player => player.gameInfo)
      .map(info => JSON.stringify(info))
  ).map(jsonString => JSON.parse(jsonString))) as HomeAway[]
}

const INITIAL_POOL: Player[] = freeze(rawPlayerPool.map(dummyDataToPlayer)) as Player[]

const INITIAL_LINEUP: Player[] = freeze([] as Player[]) as Player[]

const INITIAL_FILTERS: Filters = freeze({
  team: null,
  position: null,
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
