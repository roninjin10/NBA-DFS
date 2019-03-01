import { FantasyLineup } from './lib/FantasyLineup'
import { IPlayer } from './lib/Player'
import { IsValidFunction } from './lib/IsValidFunction'
import { SingleLineupOptimizer } from './SingleLineupOptimizer'
import { OnNewLineupHandler } from './lib/OnNewLineupHandler'
import { hashLineup } from './lib/hashLineup'
import { validateLineup } from './lib/validateLineup'

function getObjectValues(obj: Object) {
  return Object.keys(obj)
    .map(key => obj[key])
}

function createRandomString(): string {
  const randomNumber = () => String(Math.random())

  return Array(30)
    .map(randomNumber)
    .join('BURRR')
}

export class MultiLineupOptimizer {
  private _playerPool: IPlayer[]
  private _salaryCap: number
  private _rosterSpots: number
  private _isValid: IsValidFunction
  private _isRunning: boolean = false
  private _lineupHashes = new Set<string>()
  private _optimizer: SingleLineupOptimizer
  private _onNewLineupHandlers: { [handlerId: string]: OnNewLineupHandler } = {}

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

  public getOptimals = (/*maybe something like sortby*/): FantasyLineup[] => {
    return this._optimals
  }

  public subscribe = (onNewLineup: OnNewLineupHandler): string => {
    const handlerId = createRandomString()
    this._onNewLineupHandlers[handlerId] = onNewLineup
    return handlerId
  }

  public unsubscribe = (handlerId: string): void => {
    delete this._onNewLineupHandlers[handlerId]
  }

  public start = async (n: number): Promise<FantasyLineup[]> => {
    if (this._isRunning) throw new Error('cannot start twice')
    return await this._findOptimals(n)
  }

  public stop = (): void => {
    if (!this._isRunning) console.warn('Lineup optimizer is already stopped')
    this._isRunning = false
  }

  private _findOptimals = async (n: number): Promise<FantasyLineup[]> => {
    try {
      this._findNextLineup()
      this._emitNewLineup() // don't await
    } catch (e) {
      this._logError(e)
      this._isRunning = false
    }

    if (this._optimals.length === n) this._isRunning = false

    if (!this._isRunning) return this._optimals

    return this._findOptimals(n)
  }

  private _emitNewLineup = async (): Promise<void> => {
    const handlers = getObjectValues(this._onNewLineupHandlers)
    await Promise.all(handlers.map(async handler => handler(this._optimals))).catch(console.error.bind(console))
  }

  private _findNextLineup = () => {
    const nextOptimal = this._optimizer.findOptimal()
    this._optimals.push(validateLineup(nextOptimal))
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
