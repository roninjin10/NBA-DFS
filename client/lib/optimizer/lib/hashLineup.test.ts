import { hashLineup, hashString } from './hashLineup'
import { IPlayer } from '../../lib/Player'
import { FantasyLineup } from '../../lib/FantasyLineup'
import { randomPlayerPool } from './randomPlayerPool'

type RosterIndexes = [number, number, number, number, number]

interface AreHashesEqual {
  roster1Indexes: RosterIndexes
  roster2Indexes: RosterIndexes
  playerPool: IPlayer[]
}

function areHashesEqual({ roster1Indexes, roster2Indexes, playerPool }: AreHashesEqual) {
  const SALARY_CAP = 50
  const ROSTER_SPOTS = 5

  const roster1: IPlayer[] = roster1Indexes.map((i) => ({ ...playerPool[i] }))
  const roster2: IPlayer[] = roster2Indexes.map((i) => ({ ...playerPool[i] }))

  const lu1 = new FantasyLineup(SALARY_CAP, ROSTER_SPOTS, roster1)
  const lu2 = new FantasyLineup(SALARY_CAP, ROSTER_SPOTS, roster2)

  return hashLineup(playerPool, lu1) === hashLineup(playerPool, lu2)
}

describe('hashLineup', () => {
  const playerPool: IPlayer[] = randomPlayerPool(60)

  test('should hash lineups with same players to same string value', () => {
    expect(
      areHashesEqual({
        roster1Indexes: [0, 1, 2, 3, 4],
        roster2Indexes: [4, 3, 2, 1, 0],
        playerPool,
      })
    ).toBe(true)
  })

  test('should hash different lineups to different string values', () => {
    expect(
      areHashesEqual({
        roster1Indexes: [0, 1, 2, 3, 4],
        roster2Indexes: [0, 1, 2, 3, 5],
        playerPool,
      })
    ).toBe(false)
  })
})

describe('hashString', () => {
  test('hashString should hash a string', () => {
    const str = 'I am a string'
    expect(typeof hashString(str)).toBe('string')

    expect(hashString(str) === str).toBe(false)
  })
})
