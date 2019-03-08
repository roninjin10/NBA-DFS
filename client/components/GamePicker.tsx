import React, { StatelessComponent } from 'react'

export interface IGame {
  home: string,
  away: string,
}

export interface GamePickerProps {
  games: IGame[]
  toggleTeamSelect: (team: string) => void
  getTeamClassName: (team: string) => string
}

export const GamePicker: StatelessComponent<GamePickerProps> = props => {
  const { games, toggleTeamSelect, getTeamClassName } = props

  const AllGamesPicker = () => <React.Fragment />

  const GameCells: StatelessComponent = () => {
    return (
      <React.Fragment>
        {
          games.map(({ home, away }) => (
            <li>
              <div onClick={() => toggleTeamSelect(away)} className={getTeamClassName(away)}>{away}</div>
              <div onClick={() => toggleTeamSelect(home)} className={getTeamClassName(home)}>{'@' + home}</div>
            </li>))
        }
      </React.Fragment>
    )
  }

  return (
    <ul className="GamePicker">
      <AllGamesPicker />
      <GameCells />
    </ul>
  )
}