import * as actions from './actions'
import { AppState } from './AppState'
import { reducerWithInitialState, ReducerBuilder } from 'typescript-fsa-reducers/dist'
import { INITIAL_STATE } from './InitialState';

export const reducers: ReducerBuilder<AppState, AppState> = reducerWithInitialState(INITIAL_STATE)
  .case(actions.removeFromLineup, actions.removeFromLineupHandler)
  .case(actions.addToLineup, actions.addToLineupHandler)
