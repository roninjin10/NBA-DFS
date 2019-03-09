import { Player, INBALineup, HomeAway } from '../lib/types'

export interface AppState {
  readonly filters: Filters
  readonly playerPool: Player[]
  readonly lineup: INBALineup
  readonly sortBy: SortBy
  readonly games: HomeAway[]
  readonly isSortByReversed: boolean
  readonly initialPool: Player[]
}

export type Team = Set<string>
export type Position = Set<string>

export interface Filters {
  team: Team
  position: Team
}

export type SortBy = keyof Player
