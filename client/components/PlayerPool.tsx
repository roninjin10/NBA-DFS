import React, { StatelessComponent } from 'react'
import { Player } from '../redux/AppState'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'
import { AnyAction } from 'redux';

// interface PlayerProperty {
//   (player: Player): boolean
// }

export interface PoolProps {
  playerPool: Player[]
  // isInLineup: PlayerProperty
  // availableToAdd: PlayerProperty
  reduxDispatch: ReduxDispatch
}

export const PlayerPool: StatelessComponent<PoolProps> = props => {
  const { playerPool, reduxDispatch } = props

  const onClick = (heading: keyof Player) => reduxDispatch(actions.setPlayerSort(heading))

  const renderedPool = playerPool.map((player) => {
    const addToPool = () => reduxDispatch(actions.addToLineup(player.id))

    return <PlayerPoolRow player={player} onClick={addToPool} key={player.id} />
  })

  return (
    <table>
      <PlayerPoolHeadings onClick={onClick} />
      <tbody>
        {renderedPool}
      </tbody>
    </table>
  )
}

interface PlayerPoolHeadingsProps {
  onClick: (heading: keyof Player) => AnyAction
}

export const PlayerPoolHeadings: StatelessComponent<PlayerPoolHeadingsProps> = ({ onClick }) => {
  return (
    <thead>
      <tr>
        <th onClick={() => onClick('position')}>POS</th>
        <th onClick={() => onClick('name')}>PLAYER</th>
        <th onClick={() => onClick('gameInfo')}>GAME</th>
        <th onClick={() => onClick('fantasyPoints')}>POINTS</th>
        <th onClick={() => onClick('salary')}>SALARY</th>
      </tr>
    </thead>
  )
}

interface PlayerPoolRowProps {
  player: Player
  onClick: Function
}

export const PlayerPoolRow: StatelessComponent<PlayerPoolRowProps> = ({
  player: {
    name,
    salary,
    gameInfo,
    position,
    fantasyPoints
  },
  onClick,
}) => {
  return (
    <tr onClick={() => onClick()}>
      <td className="position">{position}</td>
      <td className="nickname">{name}</td>
      <td className="game">{`${gameInfo.away}@${gameInfo.home}`}</td>
      <td className="fantasy-points">{fantasyPoints}</td>
      <td className="salary">{salary}</td>
    </tr>
  )
}
