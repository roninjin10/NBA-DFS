import rawPlayerPool from '../dummyData/pool.json'

interface _Player {
  AvgPointsPerGame: string
  Salary: string
  Position: string
  Name: string
  ID: string
  'Roster Position': string
  'Name + ID': string
  'Game Info': string
}

type Team = string

type HomeAway = { home: Team; away: Team }

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

function getHomeAway(gameInfo: string): HomeAway {
  const [away, home] = gameInfo.split(' ')[0].split('@')
  return { away, home }
}

function dummyDataToPlayer(player: _Player): Player {
  const gameInfo = player['Game Info']

  const { home, away } = getHomeAway(gameInfo)

  return {
    position: player.Position,
    namePlusId: player['Name + ID'],
    name: player.Name,
    id: player.ID,
    rosterPosition: player['Roster Position'],
    salary: player.Salary,
    gameInfo: { home, away },
    fantasyPoints: player.AvgPointsPerGame,
  }
}

export interface AppState {
  playerPool: Player[]
}

export const INITIAL_STATE: AppState = {
  playerPool: rawPlayerPool.map(player => dummyDataToPlayer(player)),
}
