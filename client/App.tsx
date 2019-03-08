import React, { StatelessComponent, Fragment } from 'react'
// import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState, Player, Filters } from './redux/AppState'
// import { PoolFilters } from './components/PoolFilters'
// import { PlayerPool } from './components/PlayerPool'
import './App.scss'
// import { EditableLineup } from './components/EditableLineup'
import { ReduxDispatch } from './components/DispatchProvider';
import { sortPool } from './lib/sortPool';
import { filterPool } from './lib/filterPool';
// import { NavBar } from './components/NavBar';
import * as actions from './redux/actions'
import classNames from 'classnames'
import { GamePickerProps, GamePicker, IGame } from './components/GamePicker';
import { PositionFilters, PositionFiltersProps } from './components/PositionFilters';

const Optimizer: StatelessComponent = props => {
  const Children: StatelessComponent = () => (
    <div>
      {props.children}
    </div>
  )

  return (
    <div>
      <Children />
    </div>
  )
}

const LineupEditor: StatelessComponent = props => {
  const Children: StatelessComponent = () => (
    <div>
      {props.children}
    </div>
  )

  return (
    <div>
      <Children />
    </div>
  )
}

interface SearchProps { }

const Search: StatelessComponent<SearchProps> = () => {
  return (
    <div className="search">
      <input type="text" />
    </div>
  )
}

const Heading = () => <React.Fragment></React.Fragment>



const Lineup = () => <React.Fragment></React.Fragment>
const PlayerPickerGrid = () => <React.Fragment></React.Fragment>
const LineupButtons = () => <React.Fragment></React.Fragment>


export interface StateProps {
  playerPool: Player[]
  games: IGame[]
  lineup: (Player | null)[]
  selectedGames: Set<string>
  selectedPositions: Set<string>
}

export interface AppProps extends StateProps {
  reduxDispatch: ReduxDispatch
}

const PlayerPicker: StatelessComponent = props => {
  return (
    <div className="GamePicker">
      {props.children}
    </div>
  )
}


const _App: StatelessComponent<AppProps> = props => {
  // TODO connect components seperately
  const { reduxDispatch, playerPool, games, lineup, selectedGames, selectedPositions } = props

  const getTeamClassName: GamePickerProps["getClassName"] = team => classNames({ selected: selectedGames.has(team) })

  const getPositionClassName: PositionFiltersProps["getClassName"] = (position: string) => '' // TODO

  const toggleTeamFilter: GamePickerProps["toggleTeamFilter"] = team => reduxDispatch(actions.toggleTeamFilter(team))

  const toggleAllGames: GamePickerProps["toggleAllGames"] = () => reduxDispatch(actions.toggleAllGames())

  const togglePositionFilter = (position: string) => () => reduxDispatch(actions.togglePositionFilter(position))

  const positions = ['PG', 'SG', 'SF', 'PF', 'C']

  return (
    <div className="App">
      <Heading />
      <Optimizer>
        <GamePicker
          games={games}
          toggleTeamFilter={toggleTeamFilter}
          toggleAllGames={toggleAllGames}
          getClassName={getTeamClassName}
        />
        <PlayerPicker>
          <Search />
          <PositionFilters
            getClassName={getPositionClassName}
            positions={positions}
            onClickHandler={togglePositionFilter}
          />
          <PlayerPickerGrid />
        </PlayerPicker>
        <LineupEditor>
          <Lineup />
          <LineupButtons />
        </LineupEditor>
      </Optimizer>
    </div>
  )
}

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

/*


export interface AppProps extends StateProps {
  reduxDispatch: (action: AnyAction) => AnyAction
}
const _App: StatelessComponent<AppProps> = ({
            playerPool,
            games,
            lineup,
            selectedGames,
            selectedPositions
}) => {
  return (
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
          }

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

*/