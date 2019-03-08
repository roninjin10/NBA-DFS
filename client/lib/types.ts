import { AnyAction } from "typescript-fsa"
import { AppState } from "../redux/AppState"
import { Dispatch } from "redux"

export type ReduxDispatch = (anyAction: AnyAction) => AnyAction

export type SecondArg<F extends Function> = F extends (firstArg: any, secondArg: infer A, ...args: any[]) => any ? A : never
export interface MapStateToProps<T extends Object> {
  (appState: AppState): T
}

export type MapDispatchToProps<T extends Object> = (dispatch: Dispatch) => T