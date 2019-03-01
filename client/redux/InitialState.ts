import rawPlayerPool from '../dummyData/pool.json'
import { Player, Filters, SortBy, AppState } from './AppState';
import { dummyDataToPlayer } from '../lib/dummyDataToPlayer'

const INITIAL_POOL: Player[] = Object.freeze(rawPlayerPool.map(player => dummyDataToPlayer(player))) as Player[]

const INITIAL_LINEUP: Player[] = []

const INITIAL_FILTERS: Filters = new class InitialFilters implements Filters {
  readonly team = null
  readonly position = null
}()

const INITIAL_SORT_BY: SortBy = 'salary'

export const INITIAL_STATE: AppState = new class InitialState implements AppState {
  readonly initialPool = INITIAL_POOL
  readonly playerPool = INITIAL_POOL
  readonly lineup = INITIAL_LINEUP
  readonly filters = INITIAL_FILTERS
  readonly sortBy = INITIAL_SORT_BY
}()
