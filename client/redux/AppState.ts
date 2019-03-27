import { HomeAway, INBALineup, Player } from '../lib/types'

export interface AppState {
  readonly games: HomeAway[]
  readonly playerPool: Player[]
  readonly lineup: INBALineup
  readonly playerSearch: string
  readonly filters: Filters
  readonly sortBy: SortBy
  readonly isSortByReversed: boolean
  readonly initialPool: Player[]
}

export type Team = Set<string>
export type Position = Set<string>

export interface Filters {
  readonly team: Team
  readonly position: Team
}

export type SortBy = keyof Player
