import React, { FunctionComponent } from 'react'
import { AppState } from './redux/AppState'
import './App.scss'
import { sortPool } from './lib/sortPool';
import { filterPool } from './lib/filterPool';
import * as actions from './redux/actions'
import classNames from 'classnames'
import { GamePickerProps, GamePicker, IGame } from './components/GamePicker';
import { PositionFilters } from './components/PositionFilters';
import { ReduxDispatch, Player } from './lib/types';
import { connect } from 'react-redux';

const Optimizer: FunctionComponent = props => {
  const Children: FunctionComponent = () => (
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

const LineupEditor: FunctionComponent = props => {
  const Children: FunctionComponent = () => (
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

const Search: FunctionComponent<SearchProps> = () => {
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
  dispatch: ReduxDispatch
}

const PlayerPicker: FunctionComponent = props => {
  return (
    <div className="GamePicker">
      {props.children}
    </div>
  )
}


const _App: FunctionComponent<AppProps> = props => {
  // TODO connect components seperately
  const { dispatch, playerPool, games, lineup, selectedGames, selectedPositions } = props

  const getTeamClassName: GamePickerProps["getClassName"] = team => classNames({ selected: selectedGames.has(team) })

  const toggleTeamFilter: GamePickerProps["toggleTeamFilter"] = team => dispatch(actions.toggleTeamFilter(team))

  const toggleAllGames: GamePickerProps["toggleAllGames"] = () => dispatch(actions.toggleAllGames())

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
          <PositionFilters />
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

export const App = connect(mapStateToProps, dispatch => ({ dispatch }))(_App)
