import React, { FunctionComponent } from 'react'
import * as actions from '../redux/actions'
import { AnyAction } from 'redux'
import { Player, MapStateToProps, MapDispatchToProps } from '../lib/types'
import { connect } from 'react-redux'
import { filterPool } from '../lib/filterPool'

interface StateProps {
  playerPool: Player[]
  isInLineup: (player: string) => boolean
  availableToAdd: (player: string) => boolean
}

interface DispatchProps {
  onClick: PlayerPickerHeadingsProps['onClick']
  addToPool: (playerId: string) => () => void
}

type PlayerPickerGridProps = StateProps & DispatchProps

const _PlayerPickerGrid: FunctionComponent<PlayerPickerGridProps> = ({
  playerPool,
  addToPool,
  onClick,
}) => (
    <table className="player-pool">
      <PlayerPickerHeadings onClick={onClick} />
      <tbody>
        {playerPool.map(player => (
          <PlayerPickerRow player={player} onClick={addToPool(player.id)} key={player.id} />
        ))}
      </tbody>
    </table>
  )

interface PlayerPickerHeadingsProps {
  onClick: (heading: keyof Player) => AnyAction
}

export const PlayerPickerHeadings: FunctionComponent<PlayerPickerHeadingsProps> = ({ onClick }) => (
  <thead>
    <tr>
      <th onClick={() => onClick('gameInfo')}>GAME</th>
      <th onClick={() => onClick('position')}>POS</th>
      <th onClick={() => onClick('name')}>PLAYER</th>
      <th onClick={() => onClick('salary')}>SALARY</th>
      <th onClick={() => onClick('fantasyPoints')}>POINTS</th>
      <th onClick={() => { }}>VALUE</th>
    </tr>
  </thead>
)

interface PlayerPickerRowProps {
  player: Player
  onClick: () => void
}

export const PlayerPickerRow: FunctionComponent<PlayerPickerRowProps> = ({
  player: { name, salary, gameInfo, position, fantasyPoints },
  onClick,
}) => {
  const value = (1000 * fantasyPoints) / salary
  const displayedValue = isNaN(value) ? '' : value.toFixed(1)

  const displayedGameInfo = gameInfo.home !== '' ? `${gameInfo.away}@${gameInfo.home}` : ''

  return (
    <tr onClick={onClick}>
      <td className="game">{displayedGameInfo}</td>
      <td className="position">{position}</td>
      <td className="nickname">{name}</td>
      <td className="salary">{salary || ''}</td>
      <td className="fantasy-points">{fantasyPoints || ''}</td>
      <td className="value">{displayedValue}</td>
    </tr>
  )
}


const getMapStateToProps: () => MapStateToProps<StateProps> = (() => {
  let _filterPool: ReturnType<typeof filterPool>

  return state => {
    _filterPool = _filterPool || filterPool(state.playerPool)
    return {
      playerPool: _filterPool(state.filters, state.playerSearch),
      availableToAdd: () => true,
      isInLineup: playerId => !!state.lineup.find(rosterSpot => !!rosterSpot && rosterSpot.id === playerId),
    }
  }
})

export const mapDispatchToProps: MapDispatchToProps<DispatchProps> = dispatch => ({
  onClick: heading => dispatch(actions.setPlayerSort(heading)),
  addToPool: playerId => () => dispatch(actions.addToLineup(playerId)),
})

export const PlayerPickerGrid = connect(getMapStateToProps(), mapDispatchToProps)(_PlayerPickerGrid)
