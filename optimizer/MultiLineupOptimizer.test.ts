import { IsValidFunction } from "./lib/IsValidFunction";
import { FantasyLineup } from "./lib/FantasyLineup";
import { IPlayer } from "./lib/Player";
import { MultiLineupOptimizer } from "./MultiLineupOptimizer";
import { expect } from 'chai'

interface TestData {
  playerPool: IPlayer[]
  salaryCap: number
  rosterSpots: number
  isValid: IsValidFunction
  optimalLineups: FantasyLineup[]
}

const testData: TestData[] = []

describe('MultiLineupOptimizler', () => {

  it('should find the optimal lineups', async () => {
    for (const testCase of testData) {
      const {
        playerPool,
        salaryCap,
        rosterSpots,
        isValid,
        optimalLineups,
      } = testCase

      const slo = new MultiLineupOptimizer(playerPool, salaryCap, rosterSpots, isValid)

      expect(
        await slo.start(optimalLineups.length)
      ).to.deep.equal(optimalLineups)
    }
  })
})
