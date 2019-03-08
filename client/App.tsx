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

const Optimizer: StatelessComponent = props => {
  const Children: StatelessComponent = props => (
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

const GamePicker: StatelessComponent = props => {
  const Children: StatelessComponent = props => (
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
  const Children: StatelessComponent = props => (
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
  const Children: StatelessComponent = props => (
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

const AllGames = () => <React.Fragment></React.Fragment>

interface GameProps {
  game: IGame
}

const Game: StatelessComponent<GameProps> = ({ game }) => <React.Fragment></React.Fragment>

const Search = () => <React.Fragment></React.Fragment>
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

const _App: StatelessComponent<AppProps> = props => {
  const { playerPool, games, lineup, selectedGames, selectedPositions } = props

  return (
    <div className="App">
      {/* <Heading />*/}
      <Optimizer>
        <GamePicker>
          <AllGames />
          {games.map(game => <Game game={game} />)}
        </GamePicker>
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