import React, { Component } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import * as actions from './redux/actions'
import { AppState } from './redux/AppState'
import { GamesBar } from './GamesBar'
import { PoolFilters } from './PoolFilters'
import { PlayerPool } from './PlayerPool'

export interface StateProps {
  title: string
}

export interface AppProps extends StateProps {
  reduxDispatch: (action: AnyAction) => AnyAction
}

const EditableLineup = () => <div />

class _App extends Component<AppProps> {
  changeTitle = () => this.props.reduxDispatch(actions.setTitle('I got clicked'))

  render() {
    const games: any[] = []
    const pool: any[] = []

    return (
      <div className="App">
        <div>Nav bar fantasy stacks</div>
        <GamesBar games={games} />
        <PoolFilters />
        <PlayerPool pool={pool} />
        <EditableLineup />
      </div>
    )
  }
}

function mapStateToProps(state: AppState): StateProps {
  return {
    title: state.title,
  }
}

export const App = connect(mapStateToProps)(_App)
