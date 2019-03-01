import { Memoizer } from './lib/Memoizer'
import { FantasyLineup } from './lib/FantasyLineup'
import { InvalidLineup } from './lib/FantasyLineup'
import { IPlayer } from './lib/Player'
import { IsValidFunction } from './lib/IsValidFunction'
import { isValidLineup } from './lib/isValidLineup'

interface LineupsIfTakeAndPass {
  lineupIfTake: FantasyLineup | InvalidLineup
  lineupIfPass: FantasyLineup | InvalidLineup
}

export class SingleLineupOptimizer {
  private _playerPool: IPlayer[]
  private _salaryCap: number
  private _rosterSpots: number
  private _memoizer: Memoizer = new Memoizer()
  private _isValid: IsValidFunction

  constructor(playerPool: IPlayer[], salaryCap: number, rosterSpots: number, isValid: IsValidFunction = () => true) {
    this._playerPool = playerPool
    this._salaryCap = salaryCap
    this._rosterSpots = rosterSpots
    this._isValid = isValid
  }

  public findOptimal = (): FantasyLineup | InvalidLineup => {
    const optimal = this._findOptimal(0, new FantasyLineup(
      this._salaryCap,
      this._rosterSpots,
      [],
    ))

    if (!optimal) throw new Error('unable to find lineup')
    return optimal
  }

  private _findOptimal = (currentPoolIndex: number, currentLineup: FantasyLineup): FantasyLineup | InvalidLineup => {
    if (currentLineup.isComplete) {
      if (!this._isValid(currentLineup)) return InvalidLineup.FAILED_IS_VALID
      return currentLineup
    }

    const playersLeft = this._playerPool.length - currentPoolIndex
    const salaryLeft = this._salaryCap - currentLineup.salary
    const rosterSpotsLeft = this._rosterSpots - currentLineup.roster.length

    const isMemoized = this._memoizer.isMemoized(playersLeft, salaryLeft, rosterSpotsLeft)
    if (isMemoized) {
      return this._completeMemoizedLineup(currentLineup, playersLeft, salaryLeft, rosterSpotsLeft)
    }

    return this._bestLineup(
      this._calculateLineupsIfTakeAndPass(currentPoolIndex, currentLineup)
    )
  }

  private _completeMemoizedLineup(currentLineup: FantasyLineup, playersLeft: number, salaryLeft: number, rosterSpotsLeft: number) {
    const memoizedLineup = this._memoizer.getLineup(playersLeft, salaryLeft, rosterSpotsLeft)

    if (!isValidLineup(memoizedLineup)) return memoizedLineup
    return currentLineup.combine(memoizedLineup)
  }

  private _bestLineup = ({ lineupIfTake, lineupIfPass }: LineupsIfTakeAndPass): FantasyLineup | InvalidLineup => {
    if (!isValidLineup(lineupIfPass)) return lineupIfTake
    if (!isValidLineup(lineupIfTake)) return lineupIfPass

    return (lineupIfTake as FantasyLineup).projection > (lineupIfPass as FantasyLineup).projection
      ? lineupIfTake
      : lineupIfPass
  }

  private _calculateLineupsIfTakeAndPass = (currentPoolIndex: number, currentLineup: FantasyLineup): LineupsIfTakeAndPass => {
    return {
      lineupIfTake: this._calculateLineupIfTake(currentPoolIndex, currentLineup),
      lineupIfPass: this._calculateLineupIfPass(currentPoolIndex, currentLineup),
    }
  }

  private _calculateLineupIfPass = (currentPoolIndex: number, currentLineup: FantasyLineup): FantasyLineup | InvalidLineup => {
    return this._findOptimal(currentPoolIndex + 1, currentLineup)
  }

  private _calculateLineupIfTake = (currentPoolIndex: number, currentLineup: FantasyLineup): FantasyLineup | InvalidLineup => {
    const currentPlayer = this._playerPool[currentPoolIndex]
    const luWithCurrentPlayer = currentLineup.add(currentPlayer)

    if (!isValidLineup(luWithCurrentPlayer)) {
      return luWithCurrentPlayer
    }
    return this._findOptimal(currentPoolIndex + 1, luWithCurrentPlayer as FantasyLineup)
  }
}
