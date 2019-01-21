const rawPlayerPool = require('../dummyData/pool.json') as _Player[]

export interface _Player {
  Position: string
  'Name + ID': string
  Name: string
  ID: string
  'Roster Position': string
  Salary: string
  'Game Info': string
  AvgPointsPerGame: string
}

export interface Player {
  position: string
  namePlusId: string
  name: string
  id: string
  rosterPosition: string
  salary: string
  gameInfo: string
  avgPointsPerGame: string
}

function dummyDataToPlayer(player: _Player): Player {
  return {
    position: player.Position,
    namePlusId: player['Name + ID'],
    name: player.Name,
    id: player.ID,
    rosterPosition: player['Roster Position'],
    salary: player.Salary,
    gameInfo: player['Game Info'],
    avgPointsPerGame: player.AvgPointsPerGame,
  }
}

export interface AppState {
  playerPool: Player[]
}

export const INITIAL_STATE: AppState = {
  playerPool: rawPlayerPool.map(player => dummyDataToPlayer(player)),
}
