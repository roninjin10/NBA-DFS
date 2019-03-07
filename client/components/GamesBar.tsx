import React, { StatelessComponent } from 'react'
import { ReduxDispatch } from './DispatchProvider'
import * as actions from '../redux/actions'

interface GamesBarProps {
  games: IGame[]
  reduxDispatch: ReduxDispatch
  selectedGames: Set<string>
}

export const GamesBar: StatelessComponent<GamesBarProps> = props => {
  const isSelected = (teamName: string) => props.selectedGames.has(teamName)

  const onClickHandler = (teamName: string) => () => props.reduxDispatch(actions.setTeamFilter(teamName))

  const games = props.games.map(({ home, away }) => (
    <React.Fragment>
      <Game
        selected={isSelected(away)}
        teamName={away}
        onClick={onClickHandler(away)}
        key={away}
      />
      <Game
        selected={isSelected(home)}
        teamName={home}
        onClick={onClickHandler(home)}
        key={home}
        isHome
      />
    </React.Fragment>
  ))

  return (
    <div className="games-bar-container">
      {games}
    </div>
  )
}

export interface IGame {
  home: string
  away: string
}

export interface GameProps {
  isHome?: boolean
  selected: boolean
  teamName: string
  onClick: ReduxDispatch
}

const Game: StatelessComponent<GameProps> = ({
  isHome,
  selected,
  teamName,
  onClick
}) => {
  const className = selected ? 'selected' : ''

  const prefix = isHome ? '@' : ''

  const buttonText = `${prefix}${teamName}`

  return (
    <button onClick={onClick} className={className}>
      {buttonText}
    </button>
  )
}
