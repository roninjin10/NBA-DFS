import * as actions from './actions'
import { AppState } from './AppState'
import { reducerWithInitialState, ReducerBuilder } from 'typescript-fsa-reducers/dist'
import { INITIAL_STATE } from './initialState'

export const reducers: ReducerBuilder<AppState, AppState> = reducerWithInitialState(INITIAL_STATE)
  .case(actions.removeFromLineup, actions.removeFromLineupHandler)
  .case(actions.addToLineup, actions.addToLineupHandler)
  .case(actions.setPlayerSort, actions.setPlayerSortHandler)
  .case(actions.toggleTeamFilter, actions.toggleTeamFilterHandler)
  .case(actions.togglePositionFilter, actions.togglePositionFilterHandler)
  .case(actions.toggleAllGames, actions.toggleAllGamesHandler)
