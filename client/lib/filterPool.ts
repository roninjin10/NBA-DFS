import { Filters } from '../redux/AppState'
import { Player } from './types'

export type FilterWithFilters = (filters: Filters) => (player: Player) => boolean
export type FilterByString = (searchString: string) => (player: Player) => boolean

const filterTeam: FilterWithFilters = filters => player =>
  filters.team.size === 0 || filters.team.has(player.team)

const filterPosition: FilterWithFilters = filters => player => {
  const positionFilter = filters.position

  const [position1, position2 = 'NONE'] = player.position.split('/')

  return positionFilter.size === 0 || positionFilter.has(position1) || positionFilter.has(position2)
}

// TODO use a trie to do this
const stringIncludes = (str: string, subStr: string) => str.toLowerCase().includes(subStr.toLowerCase())

const filterSearchString: FilterByString = searchString => ({ name }) => searchString === '' || stringIncludes(name, searchString.toLowerCase())

export interface PoolFilter {
  (pool: Player[], filters: Filters, searchString: string): Player[]
}

export const filterPool: PoolFilter = (pool, filters, searchString) =>
  pool
    .filter(filterTeam(filters))
    .filter(filterPosition(filters))
    .filter(filterSearchString(searchString))
