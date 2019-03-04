import { Player, Filters } from "../redux/AppState";


export type PoolFilter = (pool: Player[], filters: Filters) => Player[]

export type SubFilter = (filters: Filters) => (player: Player) => boolean

const filterTeam: SubFilter = filters => player => {
  return filters.team.size === 0 || filters.team.has(player.team)
}

const filterPosition: SubFilter = filters => player => {
  const positionFilter = filters.position

  const [position1, position2 = 'NONE'] = player.position.split('/')

  return positionFilter.size === 0 || positionFilter.has(position1) || positionFilter.has(position2)
}


export const filterPool: PoolFilter = (pool, filters) => {
  return pool
    .filter(filterTeam(filters))
    .filter(filterPosition(filters))
}
