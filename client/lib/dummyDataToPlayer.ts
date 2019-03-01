import { HomeAway, Player } from "../redux/AppState";

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

function getHomeAway(gameInfo: string): HomeAway {
  const [away, home] = gameInfo.split(' ')[0].split('@')
  return { away, home }
}

export function dummyDataToPlayer(player: DummyDataPlayer): Player {
  const gameInfo = player['Game Info']

  const { home, away } = getHomeAway(gameInfo)

  return {
    position: player.Position,
    namePlusId: player['Name + ID'],
    name: player.Name,
    id: player.ID,
    team: player.TeamAbbrev,
    rosterPosition: player['Roster Position'],
    salary: player.Salary,
    gameInfo: { home, away },
    fantasyPoints: player.AvgPointsPerGame,
  }
}