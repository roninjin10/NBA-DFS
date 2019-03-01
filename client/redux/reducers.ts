import * as actions from './actions'
import { INITIAL_STATE, AppState } from './AppState'
import { reducerWithInitialState, ReducerBuilder } from 'typescript-fsa-reducers/dist'

export const reducers: ReducerBuilder<AppState, AppState> = reducerWithInitialState(INITIAL_STATE)
  .case(actions.removeFromLineup, actions.removeFromLineupHandler)
  .case(actions.addToLineup, actions.addToLineupHandler)
