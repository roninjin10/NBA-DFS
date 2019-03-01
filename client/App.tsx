import React, { createContext, StatelessComponent } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState, Player } from './redux/AppState'
import { GamesBar, GameProps } from './components/GamesBar'
import { PoolFilters } from './components/PoolFilters'
import { PlayerPool } from './components/PlayerPool'
import './App.scss'
import { EditableLineup } from './components/EditableLineup'
import { DispatchContext, ReduxDispatch } from './components/DispatchProvider';
import { sortPool } from './lib/sortPool';
// import { NavBar } from './components/NavBar';

export interface StateProps {
  playerPool: Player[]
  games: GameProps[]
  lineup: Player[]
}

export interface AppProps extends StateProps {
  reduxDispatch: (action: AnyAction) => AnyAction
}


function _App(props: AppProps) {
  const { playerPool, games, lineup } = props

  console.log('rerender')
  return (
    <DispatchContext.Consumer>
      {(reduxDispatch) => (
        <div className="App">
          {//          <NavBar reduxDispatch={reduxDispatch} />
          }
          <GamesBar games={games} reduxDispatch={reduxDispatch} />
          <PoolFilters />
          <PlayerPool playerPool={playerPool} reduxDispatch={reduxDispatch} />
          <EditableLineup lineup={lineup} reduxDispatch={reduxDispatch} />
        </div>
      )}
    </DispatchContext.Consumer>
  )
}

function mapStateToProps(state: AppState): StateProps {
  const { playerPool, lineup, games, sortBy, isSortByReversed } = state

  return { playerPool: sortPool(sortBy, playerPool, isSortByReversed), games, lineup }
}

export const App = connect(mapStateToProps)(_App)
