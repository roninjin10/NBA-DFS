import React, { Component } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState, Player } from './redux/AppState'
import { GamesBar, GameProps } from './GamesBar'
import { PoolFilters } from './PoolFilters'
import { PlayerPool } from './PlayerPool'
import './App.scss'
import { EditableLineup } from './EditableLineup'

const NavBar = () => <div>Nav bar fantasy stacks</div>

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
    <React.Fragment>
      <NavBar />
      <div className="App">
        <GamesBar games={games} />
        <PoolFilters />
        <PlayerPool playerPool={playerPool} />
        <EditableLineup lineup={lineup} />
      </div>
    </React.Fragment>
  )
}

function mapStateToProps(state: AppState): StateProps {
  const { playerPool } = state

  // TODO make this readable
  const games: any[] = unique(
    playerPool.map(player => player.gameInfo).map(gameInfo => JSON.stringify(gameInfo))
  ).map(item => JSON.parse(item))

  const lineup = []

  return { playerPool, games, lineup }
}

export const App = connect(mapStateToProps)(_App)
