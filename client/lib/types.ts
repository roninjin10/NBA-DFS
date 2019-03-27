import { Dispatch } from 'redux'
import { AnyAction } from 'typescript-fsa'
import { AppState } from '../redux/AppState'

export type ObjectWithValues<T> = { [key in string]: T }

export type ReduxDispatch = (anyAction: AnyAction) => AnyAction

export type Args<F extends Function> = F extends (...args: infer A) => any ? A : never

export type SecondArg<F extends Function> = F extends (
  firstArg: any,
  secondArg: infer A,
  ...args: any[]
) => any
  ? A
  : never

export type MapStateToProps<T extends Object> = (appState: AppState) => T

export type MapDispatchToProps<T extends Object> = (dispatch: Dispatch) => T

export type INBALineup = [
  Player | null,
  Player | null,
  Player | null,
  Player | null,
  Player | null,
  Player | null,
  Player | null,
  Player | null
]

export type ZeroThroughEight = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface HomeAway {
  readonly home: string
  readonly away: string
}

export interface Player {
  readonly position: string
  readonly namePlusId: string
  readonly name: string
  readonly id: string
  readonly rosterPosition: string
  readonly salary: number
  readonly gameInfo: HomeAway
  readonly fantasyPoints: number
  readonly team: string
}
