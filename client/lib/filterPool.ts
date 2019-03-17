import { Filters } from '../redux/AppState'
import { Player } from './types'
import { buildAutoCompleter } from './buildAutoCompleter'

export type FilterWithFilters = (filters: Filters) => (player: Player) => boolean
export type FilterByString = (
  playerFinder: ReturnType<typeof buildAutoCompleter>
) => (searchString: string) => Player[]

const filterTeam: FilterWithFilters = filters => player =>
  filters.team.size === 0 || filters.team.has(player.team)

const filterPosition: FilterWithFilters = filters => player => {
  const positionFilter = filters.position

  const [position1, position2 = 'NONE'] = player.position.split('/')

  return positionFilter.size === 0 || positionFilter.has(position1) || positionFilter.has(position2)
}

export type PoolFilter = (pool: Player[]) => (filters: Filters, searchString: string) => Player[]

const poolAsObject = (pool: Player[]): { [playerName in string]: Player } =>
  pool.reduce((a, player) => ({ ...a, [player.name]: player }), {})

export const filterPool: PoolFilter = pool => {
  const playerFinder = buildAutoCompleter(poolAsObject(pool))

  return (filters, searchString) =>
    playerFinder(searchString)
      .filter(filterTeam(filters))
      .filter(filterPosition(filters))
}
