import { Player, Filters } from "../redux/AppState";

export type SubFilter = (filters: Filters) => (player: Player) => boolean

const filterTeam: SubFilter = filters => player =>
  filters.team.size === 0 || filters.team.has(player.team)

const filterPosition: SubFilter = filters => player => {
  const positionFilter = filters.position

  const [position1, position2 = 'NONE'] = player.position.split('/')

  return positionFilter.size === 0 || positionFilter.has(position1) || positionFilter.has(position2)
}

export interface PoolFilter {
  (pool: Player[], filters: Filters): Player[]
}

export const filterPool: PoolFilter = (pool, filters) => pool
  .filter(filterTeam(filters))
  .filter(filterPosition(filters))
