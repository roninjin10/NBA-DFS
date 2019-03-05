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

  const _Game = ({ teamName, isHome = false }: { teamName: string, isHome?: boolean }) => (
    <Game
      selected={isSelected(teamName)}
      teamName={teamName}
      onClick={onClickHandler(teamName)}
      isHome={isHome}
      key={teamName}
    />
  )

  const games = props.games.map(game => {
    return (
      <React.Fragment>
        <_Game
          teamName={game.away}
        />
        <_Game
          teamName={game.home}
          isHome
        />
      </React.Fragment>
    )
  })

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

export interface GameProps {
  isHome?: boolean
  selected: boolean
  teamName: string
  onClick: ReduxDispatch
}

// TODO abstract this to share with pool filters
function Game(props: GameProps) {
  const { isHome, selected, teamName, onClick } = props

  const className = selected ? 'selected' : ''

  const buttonPrefix = isHome ? '@' : ''

  return (
    <button onClick={onClick} className={className}>
      {`${buttonPrefix}${teamName}`}
    </button>
  )
}
