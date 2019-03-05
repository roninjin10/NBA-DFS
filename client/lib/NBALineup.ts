import { Player } from "../redux/AppState";

type LineupShape = Set<NBAPosition>[]

type PlayerRoster = (Player | null)[]

const range = (start: number, stop: number): number[] => {
  const out: number[] = []

  let current = start

  while (current < stop) {
    out.push(current)
    current += 1
  }

  return out
}

const getEmptyLineup = (lineupShape: LineupShape): PlayerRoster => lineupShape.map(() => null)

const currentSalary = (lineup: (Player | null)[]) =>
  lineup
    .map(spot => spot === null ? 0 : Number(spot.fantasyPoints))
    .reduce((total, points) => total + points, 0)

const sportSpecificLineup = (lineupShape: LineupShape, salaryCap: number) => {
  const _addPlayersToLineup = (playersToAdd: Player[], currentLineup = getEmptyLineup(lineupShape)): PlayerRoster | null => {
    const [nextPlayer, ...restOfPlayers] = playersToAdd

    if (!nextPlayer) {
      return currentLineup
    }

    for (const position of nextPlayer.position.split('/')) {
      for (const i of range(0, lineupShape.length)) {
        if (!lineupShape[i].has(position as any)) continue
        if (currentLineup[i]) continue
        if (currentSalary(currentLineup) > salaryCap) continue


        const luWithPlayer = currentLineup.map((spot, j) => {
          if (i !== j) return spot
          return nextPlayer
        })

        const luFilledOut = _addPlayersToLineup(restOfPlayers, luWithPlayer)

        if (!luFilledOut) {
          continue
        }

        return luFilledOut
      }
    }

    return null
  }

  const addPlayersToLineup = (playersToAdd: Player[], currentLineup = getEmptyLineup(lineupShape)): PlayerRoster => {
    const out = _addPlayersToLineup(playersToAdd, currentLineup)
    if (!out) throw new Error('Cannot add players to roster')
    return out
  }

  return addPlayersToLineup
}

enum NBAPosition {
  PG = 'PG',
  SG = 'SG',
  SF = 'SF',
  PF = 'PF',
  C = 'C',
}

const nbaDkShape: LineupShape = [
  new Set([NBAPosition.PG]),
  new Set([NBAPosition.SG]),
  new Set([NBAPosition.SF]),
  new Set([NBAPosition.PF]),
  new Set([NBAPosition.C]),
  new Set([NBAPosition.PG, NBAPosition.SG]),
  new Set([NBAPosition.SF, NBAPosition.PF]),
  new Set([NBAPosition.PG, NBAPosition.SG, NBAPosition.SF, NBAPosition.PF, NBAPosition.C]),
]

const FIFTY_THOUSAND = 50000
const SALARY_CAP_NBA_DK = FIFTY_THOUSAND

export const addPlayersToNbaLineup = sportSpecificLineup(nbaDkShape, SALARY_CAP_NBA_DK)
