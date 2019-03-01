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
// import { NavBar } from './components/NavBar';

export interface StateProps {
  playerPool: Player[]
  games: GameProps[]
  lineup: Player[]
}

export interface AppProps extends StateProps {
  reduxDispatch: (action: AnyAction) => AnyAction
}

function unique<T extends any[]>(arr: T): T {
  return Array.from(new Set(arr)) as T
}

function _App(props: AppProps) {
  const { playerPool, games, lineup } = props

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
  const { playerPool, lineup } = state

  const games: any[] = unique(
    playerPool.map(player => player.gameInfo).map(gameInfo => JSON.stringify(gameInfo))
  ).map(item => JSON.parse(item))

  return { playerPool, games, lineup }
}

export const App = connect(mapStateToProps)(_App)
