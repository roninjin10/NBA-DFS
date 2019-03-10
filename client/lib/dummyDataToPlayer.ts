import { HomeAway, Player } from './types'

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

export const dummyDataToPlayer: DummyDataToPlayer = player => ({
  position: player.Position,
  namePlusId: player['Name + ID'],
  name: player.Name,
  id: player.ID,
  team: player.TeamAbbrev,
  rosterPosition: player['Roster Position'],
  salary: Number(player.Salary),
  gameInfo: getHomeAway(player['Game Info']),
  fantasyPoints: Number(player.AvgPointsPerGame),
})
