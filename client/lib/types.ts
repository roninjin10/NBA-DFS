import { AnyAction } from "typescript-fsa"
import { AppState } from "../redux/AppState"
import { Dispatch } from "redux"

export type ReduxDispatch = (anyAction: AnyAction) => AnyAction

export type SecondArg<F extends Function> = F extends (firstArg: any, secondArg: infer A, ...args: any[]) => any ? A : never
export interface MapStateToProps<T extends Object> {
  (appState: AppState): T
}

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
  home: string
  away: string
}

export interface Player {
  position: string
  namePlusId: string
  name: string
  id: string
  rosterPosition: string
  salary: number
  gameInfo: HomeAway
  fantasyPoints: number
  team: string
}