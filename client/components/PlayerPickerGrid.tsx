import React, { FunctionComponent } from 'react'
import * as actions from '../redux/actions'
import { AnyAction } from 'redux'
import { Player, MapStateToProps, MapDispatchToProps } from '../lib/types'
import { connect } from 'react-redux'

interface StateProps {
  playerPool: Player[]
  isInLineup: (player: string) => boolean
  availableToAdd: (player: string) => boolean
}

interface DispatchProps {
  onClick: PlayerPoolHeadingsProps['onClick']
  addToPool: (playerId: string) => () => void
}

type PlayerPickerGridProps = StateProps & DispatchProps

const _PlayerPickerGrid: FunctionComponent<PlayerPickerGridProps> = props => {
  const { playerPool, addToPool, onClick } = props

  const renderedPool = playerPool.map(player => {
    return <PlayerPoolRow player={player} onClick={addToPool} key={player.id} />
  })

  return (
    <table className="player-pool">
      <PlayerPoolHeadings onClick={onClick} />
      <tbody>{renderedPool}</tbody>
    </table>
  )
}

const noop = () => {}

interface PlayerPoolHeadingsProps {
  onClick: (heading: keyof Player) => AnyAction
}

export const PlayerPoolHeadings: FunctionComponent<PlayerPoolHeadingsProps> = ({ onClick }) => {
  return (
    <thead>
      <tr>
        <th onClick={() => onClick('gameInfo')}>GAME</th>
        <th onClick={() => onClick('position')}>POS</th>
        <th onClick={() => onClick('name')}>PLAYER</th>
        <th onClick={() => onClick('salary')}>SALARY</th>
        <th onClick={() => onClick('fantasyPoints')}>POINTS</th>
        <th onClick={noop}>VALUE</th>
      </tr>
    </thead>
  )
}

interface PlayerPoolRowProps {
  player: Player
  onClick: Function
}

export const PlayerPoolRow: FunctionComponent<PlayerPoolRowProps> = ({
  player: { name, salary, gameInfo, position, fantasyPoints },
  onClick,
}) => {
  const value = (1000 * fantasyPoints) / salary
  const displayedValue = isNaN(value) ? '' : value.toFixed(1)

  const displayedGameInfo = gameInfo.home !== '' ? `${gameInfo.away}@${gameInfo.home}` : ''

  return (
    <tr onClick={() => onClick()}>
      <td className="game">{displayedGameInfo}</td>
      <td className="position">{position}</td>
      <td className="nickname">{name}</td>
      <td className="salary">{salary || ''}</td>
      <td className="fantasy-points">{fantasyPoints || ''}</td>
      <td className="value">{displayedValue}</td>
    </tr>
  )
}

const mapStateToProps: MapStateToProps<StateProps> = state => {
  const isInLineup = (playerId: string) =>
    state.lineup.filter(spot => spot && spot.id === playerId).length > 0
  const availableToAdd = () => true

  return { playerPool: state.playerPool, availableToAdd, isInLineup }
}

export const mapDispatchToProps: MapDispatchToProps<DispatchProps> = dispatch => {
  return {
    onClick: heading => dispatch(actions.setPlayerSort(heading)),
    addToPool: playerId => () => dispatch(actions.addToLineup(playerId)),
  }
}

export const PlayerPickerGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PlayerPickerGrid)
