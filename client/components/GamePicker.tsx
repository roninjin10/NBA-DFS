import React, { FunctionComponent } from 'react'
import { HomeAway, MapStateToProps, MapDispatchToProps } from '../lib/types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import * as actions from '../redux/actions'

export interface StateProps {
  games: HomeAway[]
  getClassName: GameCellProps['getClassName']
}

export interface DispatchProps {
  toggleTeamFilter: GameCellProps['toggleTeamSelect']
  toggleAllGames: AllGamesPickerProps['toggleAllGames']
}

export type GamePickerProps = StateProps & DispatchProps

const _GamePicker: FunctionComponent<GamePickerProps> = ({
  games,
  toggleTeamFilter,
  toggleAllGames,
  getClassName,
}) => (
  <ul className="GamePicker">
    <AllGamesPicker gameCount={games.length} toggleAllGames={toggleAllGames} />
    {games.map(({ home, away }) => (
      <GameCell
        home={home}
        away={away}
        toggleTeamSelect={toggleTeamFilter}
        getClassName={getClassName}
        key={home}
      />
    ))}
  </ul>
)

interface GameCellProps {
  home: string
  away: string
  toggleTeamSelect: (team: string) => void
  getClassName: (team: string) => string
}

const GameCell: FunctionComponent<GameCellProps> = ({
  toggleTeamSelect,
  getClassName,
  home,
  away,
}) => (
  <li>
    <div onClick={() => toggleTeamSelect(away)} className={getClassName(away)}>
      {away}
    </div>
    <div onClick={() => toggleTeamSelect(home)} className={getClassName(home)}>
      {'@' + home}
    </div>
  </li>
)

interface AllGamesPickerProps {
  gameCount: number
  toggleAllGames: () => void
}

const AllGamesPicker: FunctionComponent<AllGamesPickerProps> = ({ toggleAllGames, gameCount }) => (
  <li onClick={toggleAllGames}>
    <div>{`All Games (${gameCount})`}</div>
  </li>
)

const mapStateToProps: MapStateToProps<StateProps> = ({ games, filters }) => ({
  games: games,
  getClassName: team => classNames({ selected: filters.team.has(team) }),
})

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = dispatch => ({
  toggleAllGames: () => dispatch(actions.toggleAllGames()),
  toggleTeamFilter: team => dispatch(actions.toggleTeamFilter(team)),
})

export const GamePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GamePicker)
