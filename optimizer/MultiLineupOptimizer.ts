import { FantasyLineup } from './lib/FantasyLineup'
import { IPlayer } from './lib/Player'
import { IsValidFunction } from './lib/IsValidFunction'
import { SingleLineupOptimizer } from './SingleLineupOptimizer'
import { hashLineup } from './lib/hashLineup'
import { validateLineup } from './lib/validateLineup'

export class MultiLineupOptimizer {
  private _playerPool: IPlayer[]
  private _salaryCap: number
  private _rosterSpots: number
  private _isValid: IsValidFunction
  private _lineupHashes = new Set<string>()
  private _optimizer: SingleLineupOptimizer

  private _optimals: FantasyLineup[] = []

  constructor(
    playerPool: IPlayer[],
    salaryCap: number,
    rosterSpots: number,
    isValid: IsValidFunction = () => true,
  ) {
    this._playerPool = playerPool
    this._salaryCap = salaryCap
    this._rosterSpots = rosterSpots
    this._isValid = isValid

    this._optimizer = new SingleLineupOptimizer(
      this._playerPool,
      this._salaryCap,
      this._rosterSpots,
      this._isUniqueAndValid,
    )
  }

  public findOptimals = (n: number): FantasyLineup[] => {
    try {
      this._optimals.push(validateLineup(
        this._optimizer.findOptimal()
      ))
    } catch (e) {
      this._logError(e)
      return this._optimals
    }

    if (this._optimals.length === n) {
      return this._optimals
    }
    return this.findOptimals(n)
  }

  private _isUniqueAndValid: IsValidFunction = (lineup: FantasyLineup) => {
    return this._isValid(lineup) && this._isUnique(lineup)
  }

  private _isUnique: IsValidFunction = (lineup: FantasyLineup): boolean => {
    const hash = hashLineup(this._playerPool, lineup)
    return !this._lineupHashes.has(hash)
  }

  private _logError = (e: Error) => {
    console.error('Unable to find lineups', {
      e,
      lineupsFound: this._optimals.length,
      playerPool: this._playerPool,
      salaryCap: this._salaryCap,
      rosterSpots: this._rosterSpots,
      optimals: this._optimals,
    })
  }
}
