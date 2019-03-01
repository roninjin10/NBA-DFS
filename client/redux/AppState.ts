export interface AppState {
  readonly filters: Filters
  readonly initialPool: Player[]
  readonly playerPool: Player[]
  readonly lineup: Player[]
  readonly sortBy: SortBy
}

export type Team = string

export type HomeAway = { home: Team; away: Team }

export interface Player {
  position: string
  namePlusId: string
  name: string
  id: string
  rosterPosition: string
  salary: string
  gameInfo: HomeAway
  fantasyPoints: string
}

export interface Filters {
  team: Team | null
  position: Team | null
}

export type SortBy = keyof Player



