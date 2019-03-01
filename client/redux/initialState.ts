import rawPlayerPool from '../dummyData/pool.json'
import { Player, Filters, SortBy, AppState } from './AppState';
import { dummyDataToPlayer } from '../lib/dummyDataToPlayer'
import { resortPool } from './actions'

const INITIAL_POOL: Player[] = rawPlayerPool.map(dummyDataToPlayer)

const INITIAL_LINEUP: Player[] = []

const INITIAL_FILTERS: Filters = {
  team: null,
  position: null,
}

const INITIAL_SORT_BY: SortBy = 'salary'

export const INITIAL_STATE: AppState = resortPool({
  initialPool: INITIAL_POOL,
  playerPool: INITIAL_POOL,
  lineup: INITIAL_LINEUP,
  filters: INITIAL_FILTERS,
  sortBy: INITIAL_SORT_BY,
})
