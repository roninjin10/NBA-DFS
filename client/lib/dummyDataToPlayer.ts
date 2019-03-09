import { HomeAway, Player } from "./types";

interface DummyDataPlayer {
  AvgPointsPerGame: string
  Salary: string
  Position: string
  Name: string
  ID: string
  TeamAbbrev: string
  'Roster Position': string
  'Name + ID': string
  'Game Info': string
}

interface GetHomeAway {
  (gameInfo: string): HomeAway
}

const getHomeAway: GetHomeAway = gameInfo => {
  const [away, home] = gameInfo.split(' ')[0].split('@')
  return { away, home }
}

interface DummyDataToPlayer {
  (player: DummyDataPlayer): Player
}

export const dummyDataToPlayer: DummyDataToPlayer = player => {
  const gameInfo = player['Game Info']

  const { home, away } = getHomeAway(gameInfo)

  return {
    position: player.Position,
    namePlusId: player['Name + ID'],
    name: player.Name,
    id: player.ID,
    team: player.TeamAbbrev,
    rosterPosition: player['Roster Position'],
    salary: Number(player.Salary),
    gameInfo: { home, away },
    fantasyPoints: Number(player.AvgPointsPerGame),
  }
}