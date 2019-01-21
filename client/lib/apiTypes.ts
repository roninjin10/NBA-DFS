const steps = []
const endpoints = []

steps[0] = 'Projection data is sent from backend'

endpoints[0] = '/api/v0/nba/projections/team'
endpoints[1] = '/api/v0/nba/projections/players'

export interface Team {
  id: number
  name: string
  teamAbbrev: string
}

export interface TeamWithProjection extends Team {
  lastupdated: string
  opponentAbbrev: string
  starttime: string
  projection: {
    pace: number
    teamScore: number
    opponentScore: number
    overtimeRate?: number
    blowoutRate?: number
  }
}

export interface Player {
  id: number
  name: string
  teamAbbrev: string
}

export interface PlayerWithProjection extends Player {
  projection: {
    points: number
    rebounds: number
    assists: number
    turnovers: number
    threes: number
    fouls: number
    minutes: number
    usage: number
    assistRate: number
    reboundRate: number
  }
}

steps[1] = 'site data is uploaded from user'

endpoints[2] = '/api/v0/nba/slate/:date/:site'

export enum SlateType {
  LATESWAP = 'LATESWAP',
  SHOWDOWN = 'SHOWDOWN',
}

export enum FantasySite {
  DK = 'DraftKings',
  FD = 'FanDuel',
}

export enum NBADraftKingsPosition {
  PG = 'PG',
  SG = 'SG',
  SF = 'SF',
  PF = 'PF',
  C = 'C',
  G = 'G',
  F = 'F',
  UTIL = 'UTIL',
}

export interface DraftKingsPlayer {
  id: number
  name: string
  position: NBADraftKingsPosition[]
  salary: number
  startTime: string
  team: string
  opponent: string
}

export interface SiteSlate {
  lastupdated: string
  site: FantasySite
  startTime: string
  type: SlateType
  salaryCap: number
  playerPool: DraftKingsPlayer[]
}
