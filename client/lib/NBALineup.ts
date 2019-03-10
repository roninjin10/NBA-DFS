import { INBALineup, ZeroThroughEight, Player } from './types'

type LineupShape = Set<NBAPosition>[]

export type PlayerRoster = (Player | null)[]

const getEmptyLineup = (lineupShape: LineupShape): PlayerRoster => lineupShape.map(() => null)

const sumField = (field: 'fantasyPoints' | 'salary') => (lineup: (Player | null)[]) => {
  return lineup
    .map(spot => (spot === null ? 0 : Number(spot[field])))
    .reduce((total, points) => total + points, 0)
}

const currentSalary = sumField('salary')
const currentFantasyPoints = sumField('fantasyPoints')

const getValidPositions = (lineupShape: LineupShape, position: string) => [...lineupShape]
  .reduce(
    (a, positionShape, i) => {
      return positionShape.has(position as any) ? [...a, i] : a
    },
    [] as number[]
  )

const getFilledSpots = (lineup: PlayerRoster): number[] => [...lineup]
  .reduce(
    (a, spot, i) => {
      return spot !== null ? [...a, i] : a
    },
    [] as number[]
  )

const sportSpecificLineup = (lineupShape: LineupShape, salaryCap: number) => {
  const _addPlayersToLineup = (
    playersToAdd: Player[],
    currentLineup = getEmptyLineup(lineupShape)
  ): PlayerRoster | null => {
    const [nextPlayer, ...restOfPlayers] = playersToAdd

    if (!nextPlayer) return currentLineup

    if (currentSalary(currentLineup) + Number(nextPlayer.fantasyPoints) > salaryCap) return null

    for (const position of nextPlayer.position.split('/')) {
      const filledSpots = new Set(getFilledSpots(currentLineup))
      const validPositions = getValidPositions(lineupShape, position)

      const availablePositions = validPositions.filter(i => !filledSpots.has(i))

      for (const i of availablePositions) {
        const luWithPlayer = currentLineup.map((currentPlayer, j) => {
          return i === j ? nextPlayer : currentPlayer
        })

        const luFilledOut = _addPlayersToLineup(restOfPlayers, luWithPlayer)

        if (luFilledOut) return luFilledOut
      }
    }

    return null
  }

  const addPlayersToLineup = (
    playersToAdd: Player[],
    currentLineup = getEmptyLineup(lineupShape)
  ): PlayerRoster => {
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

const addPlayersToNbaLineup = sportSpecificLineup(nbaDkShape, SALARY_CAP_NBA_DK)

export class NBALineup extends Array<Player | null> {
  toArray = () => [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7]] as INBALineup

  constructor(lineup: (Player | null)[] = []) {
    super(...(addPlayersToNbaLineup(lineup.filter(spot => spot !== null) as Player[]) as any[]))
  }

  public readonly addPlayers = (...players: Player[]) => new NBALineup([...this, ...players])

  public readonly removePlayer = (index: ZeroThroughEight) => new NBALineup(this.map((spot, i) => (i === index ? null : spot)))

  public readonly salary = () => currentSalary(this)
  public readonly fantasyPoints = () => currentFantasyPoints(this)
}
