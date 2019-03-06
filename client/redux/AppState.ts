import { INBALineup } from "../lib/NBALineup";

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

export type HomeAway = { home: string; away: string }

export interface Player {
  position: string
  namePlusId: string
  name: string
  id: string
  rosterPosition: string
  salary: number
  gameInfo: HomeAway
  fantasyPoints: number
  team: string
}

export interface Filters {
  team: Team
  position: Team
}

export type SortBy = keyof Player
