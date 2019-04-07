import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers/dist'
import * as actions from './actions'
import { IAppState } from './AppState'
import { INITIAL_STATE } from './initialState'

const workerReducersBuilder: ReducerBuilder<IAppState, IAppState> = reducerWithInitialState(
  INITIAL_STATE
)
  .case(actions.removeFromLineup, actions.removeFromLineupHandler)
  .case(actions.addToLineup, actions.addToLineupHandler)
  .case(actions.setPlayerSort, actions.setPlayerSortHandler)
  .case(actions.toggleTeamFilter, actions.toggleTeamFilterHandler)
  .case(actions.togglePositionFilter, actions.togglePositionFilterHandler)
  .case(actions.toggleAllGames, actions.toggleAllGamesHandler)
  .case(actions.setPickerSearch, actions.setPickerSearchHandler)

const proxyReducersBuilder: ReducerBuilder<IAppState, IAppState> = reducerWithInitialState(
  INITIAL_STATE
).case(actions.updateState, actions.updateStateHandler)

export const workerReducers = workerReducersBuilder.build()
export const proxyReducers = proxyReducersBuilder.build()
