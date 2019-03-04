import React, { createContext, StatelessComponent } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState, Player, Filters } from './redux/AppState'
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
          <PoolFilters reduxDispatch={reduxDispatch} />
          <PlayerPool playerPool={playerPool} reduxDispatch={reduxDispatch} />
          <EditableLineup lineup={lineup} reduxDispatch={reduxDispatch} />
        </div>
      )}
    </DispatchContext.Consumer>
  )
}

function filterPool(pool: Player[], filters: Filters): Player[] {
  return pool
    .filter(({ team }) => filters.team.size === 0 || filters.team.has(team))
    .filter(({ position }) => {
      const [position1, position2 = 'NONE'] = position.split('/')
      return filters.position.size === 0 || filters.position.has(position1) || filters.position.has(position2)
    })
}

function mapStateToProps(state: AppState): StateProps {
  const { playerPool, lineup, games, sortBy, isSortByReversed, filters } = state

  const filteredPool = filterPool(playerPool, filters)
  const sortedFilteredPool = sortPool(sortBy, filteredPool, isSortByReversed)

  return { playerPool: sortPool(sortBy, sortedFilteredPool, isSortByReversed), games, lineup }
}

export const App = connect(mapStateToProps)(_App)
