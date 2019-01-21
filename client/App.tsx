import React, { Component } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState, Player } from './redux/AppState'
import { GamesBar } from './GamesBar'
import { PoolFilters } from './PoolFilters'
import { PlayerPool } from './PlayerPool'

const NavBar = () => <div>Nav bar fantasy stacks</div>

export interface StateProps {
  playerPool: Player[]
}

export interface AppProps extends StateProps {
  reduxDispatch: (action: AnyAction) => AnyAction
}

const EditableLineup = () => <div />

class _App extends Component<AppProps> {
  render() {
    const games: any[] = []
    const { playerPool } = this.props

    return (
      <div className="App">
        <NavBar />
        <GamesBar games={games} />
        <PoolFilters />
        <PlayerPool playerPool={playerPool} />
        <EditableLineup />
      </div>
    )
  }
}

function mapStateToProps(state: AppState): StateProps {
  return { playerPool: state.playerPool }
}

export const App = connect(mapStateToProps)(_App)
