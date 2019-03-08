import React, { StatelessComponent } from 'react'
// import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AppState, Player, Filters } from './redux/AppState'
import { /*GamesBar, GameProps, */IGame } from './components/GamesBar'
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
import { GamePickerProps, GamePicker } from './components/GamePicker';

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

const PlayerPicker: StatelessComponent = props => {
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



const Search = () => <React.Fragment></React.Fragment>
const Heading = () => <React.Fragment></React.Fragment>
const PositionFilters = () => <React.Fragment></React.Fragment>
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

const fragment = (jsxElements: JSX.Element[]) => <React.Fragment>{jsxElements}</React.Fragment>

const _App: StatelessComponent<AppProps> = props => {
  const { reduxDispatch, playerPool, games, lineup, selectedGames, selectedPositions } = props

  const getTeamClassName: GamePickerProps["getTeamClassName"] = team => classNames({ selected: selectedGames.has(team) })

  const toggleTeamSelect: GamePickerProps["toggleTeamSelect"] = team => reduxDispatch(actions.setTeamFilter(team))

  const toggleAllGames: GamePickerProps["toggleAllGames"] = () => reduxDispatch(actions.toggleAllGames())

  return (
    <div className="App">
      <Heading />
      <Optimizer>
        <GamePicker
          games={games}
          toggleTeamSelect={toggleTeamSelect}
          toggleAllGames={toggleAllGames}
          getTeamClassName={getTeamClassName}
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