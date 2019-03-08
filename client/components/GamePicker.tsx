import React, { StatelessComponent } from 'react'

export interface IGame {
  home: string,
  away: string,
}

export interface GamePickerProps {
  games: IGame[]
  toggleTeamFilter: GameCellProps['toggleTeamSelect']
  toggleAllGames: AllGamesPickerProps['toggleAllGames']
  getClassName: GameCellProps['getClassName']
}

interface GameCellProps {
  home: string
  away: string
  toggleTeamSelect: (team: string) => void
  getClassName: (team: string) => string
}

const GameCell: StatelessComponent<GameCellProps> = props => {
  const { toggleTeamSelect, getClassName, home, away } = props

  return (
    <li>
      <div onClick={() => toggleTeamSelect(away)} className={getClassName(away)}>{away}</div>
      <div onClick={() => toggleTeamSelect(home)} className={getClassName(home)}>{'@' + home}</div>
    </li>

  )
}

interface AllGamesPickerProps {
  gameCount: number
  toggleAllGames: () => void
}

const AllGamesPicker: StatelessComponent<AllGamesPickerProps> = props => {
  const { toggleAllGames, gameCount } = props

  return (
    <li onClick={toggleAllGames} >
      <div>{`All Games (${gameCount})`}</div>
    </li>
  )
}

export const GamePicker: StatelessComponent<GamePickerProps> = ({
  games,
  toggleTeamFilter,
  toggleAllGames,
  getClassName
}) => {
  const gameCells = games.map(({ home, away }) => (
    <GameCell
      home={home}
      away={away}
      toggleTeamSelect={toggleTeamFilter}
      getClassName={getClassName}
    />
  ))

  return (
    <ul className="GamePicker">
      <AllGamesPicker
        gameCount={games.length}
        toggleAllGames={toggleAllGames}
      />
      {gameCells}
    </ul>
  )
}