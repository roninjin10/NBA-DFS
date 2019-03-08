import React, { StatelessComponent } from 'react'

export interface IGame {
  home: string,
  away: string,
}

export interface GamePickerProps {
  games: IGame[]
  toggleTeamSelect: (team: string) => void
  toggleAllGames: () => void
  getTeamClassName: (team: string) => string
}

export const GamePicker: StatelessComponent<GamePickerProps> = props => {
  const { games, toggleTeamSelect, toggleAllGames, getTeamClassName } = props

  const allGamesPicker = (
    <li onClick={toggleAllGames} >
      <div>{`All Games (${games.length})`}</div>
    </li>
  )

  const gameCells = games.map(({ home, away }) => (
    <li>
      <div onClick={() => toggleTeamSelect(away)} className={getTeamClassName(away)}>{away}</div>
      <div onClick={() => toggleTeamSelect(home)} className={getTeamClassName(home)}>{'@' + home}</div>
    </li>)
  )

  return (
    <ul className="GamePicker">
      {allGamesPicker}
      {gameCells}
    </ul>
  )
}