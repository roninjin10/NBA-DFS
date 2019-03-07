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
    <Game
      key={home + away}
      isHomeSelected={isSelected(home)}
      isAwaySelected={isSelected(away)}
      homeTeam={home}
      awayTeam={away}
      onClickHandler={onClickHandler}
    />
  ))

  return (
    <div className="GamesBar-container">
      <ul>
        {games}
      </ul>
    </div>
  )
}

export interface IGame {
  home: string
  away: string
}

export interface GameProps {
  isHomeSelected: boolean
  isAwaySelected: boolean
  homeTeam: string
  awayTeam: string
  onClickHandler: (teamName: string) => () => void
}

const Game: StatelessComponent<GameProps> = ({
  isHomeSelected,
  isAwaySelected,
  homeTeam,
  awayTeam,
  onClickHandler,
}) => {
  const getClassName = (selected: boolean) => selected ? 'selected' : ''

  const homeClass = getClassName(isHomeSelected)
  const awayClass = getClassName(isAwaySelected)

  return (
    <li className="GamesBar-tile">
      <div onClick={onClickHandler(awayTeam)} className={awayClass}>{awayTeam}</div>
      <div onClick={onClickHandler(homeTeam)} className={homeClass}>{`@${homeTeam}`}</div>
    </li>
  )
}
