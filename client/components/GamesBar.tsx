import React, { StatelessComponent } from 'react'
import { ReduxDispatch } from './DispatchProvider'
import * as actions from '../redux/actions'

interface GamesBarProps {
  games: IGame[]
  reduxDispatch: ReduxDispatch
}

export const GamesBar: StatelessComponent<GamesBarProps> = props => {
  const games = props.games.map((game, i) => (
    <Game
      key={i}
      home={game.home}
      away={game.away}
      reduxDispatch={props.reduxDispatch}
    />
  ))

  return (
    <div className="gamesbar">
      {games}
    </div>
  )
}

export interface IGame {
  home: string
  away: string
}

export interface GameProps extends IGame {
  reduxDispatch: ReduxDispatch
}

function Game(props: GameProps) {
  const { away, home, reduxDispatch } = props

  const filterTeam = (team: string) => reduxDispatch(actions.setTeamFilter(team))

  return (
    <React.Fragment>
      <button onClick={() => filterTeam(away)}>{away}</button>
      <button onClick={() => filterTeam(home)}>{'@' + home}</button>
    </React.Fragment>
  )
}
