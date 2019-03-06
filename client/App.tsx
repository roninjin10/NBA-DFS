import React, { createContext, StatelessComponent } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState, Player, Filters } from './redux/AppState'
import { GamesBar, GameProps, IGame } from './components/GamesBar'
import { PoolFilters } from './components/PoolFilters'
import { PlayerPool } from './components/PlayerPool'
import './App.scss'
import { EditableLineup } from './components/EditableLineup'
import { DispatchContext, ReduxDispatch } from './components/DispatchProvider';
import { sortPool } from './lib/sortPool';
import { filterPool } from './lib/filterPool';
// import { NavBar } from './components/NavBar';

export interface StateProps {
  playerPool: Player[]
  games: IGame[]
  lineup: (Player | null)[]
  selectedGames: Set<string>
  selectedPositions: Set<string>
}

export interface AppProps extends StateProps {
  reduxDispatch: (action: AnyAction) => AnyAction
}

const _App: StatelessComponent<AppProps> = ({
  playerPool,
  games,
  lineup,
  selectedGames,
  selectedPositions
}) => (
    <DispatchContext.Consumer>
      {
        (reduxDispatch) => (
          <div className="App">
            {//          <NavBar reduxDispatch={reduxDispatch} />
            }
            <GamesBar games={games} reduxDispatch={reduxDispatch} selectedGames={selectedGames} />
            <PoolFilters reduxDispatch={reduxDispatch} selectedPositions={selectedPositions} />
            <PlayerPool playerPool={playerPool} reduxDispatch={reduxDispatch} />
            <EditableLineup lineup={lineup} reduxDispatch={reduxDispatch} />
          </div>
        )
      }
    </DispatchContext.Consumer>
  )

interface MapStateToProps {
  (state: AppState): StateProps
}

const mapStateToProps: MapStateToProps = ({
  playerPool,
  lineup,
  games,
  sortBy,
  isSortByReversed,
  filters
}) => {
  const filteredPool = filterPool(playerPool, filters)
  const sortedFilteredPool = sortPool(sortBy, filteredPool, isSortByReversed)

  return {
    playerPool: sortedFilteredPool,
    games,
    lineup,
    selectedGames: filters.team,
    selectedPositions: filters.position,
  }
}

export const App = connect(mapStateToProps)(_App)
