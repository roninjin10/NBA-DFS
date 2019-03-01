import React, { StatelessComponent } from 'react'
import { Player } from '../redux/AppState'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'

export interface PoolProps {
  playerPool: Player[]
  reduxDispatch: ReduxDispatch
}

export function PlayerPool(props: PoolProps) {
  const { playerPool, reduxDispatch } = props

  const renderedPool = playerPool.map((player, i) => {
    const addToPool = () => reduxDispatch(actions.addToLineup(i))

    return <PlayerPoolRow player={player} onClick={addToPool} key={i} />
  })

  return (
    <table>
      <PlayerPoolHeadings />
      <tbody>
        {renderedPool}
      </tbody>
    </table>
  )
}

interface PlayerPoolRowProps {
  player: Player
  onClick: Function
}

// TODO generate these dynamically
export function PlayerPoolHeadings() {
  return (
    <thead>
      <tr>
        <th>POS</th>
        <th>PLAYER</th>
        <th>GAME</th>
        <th>POINTS</th>
        <th>SALARY</th>
      </tr>
    </thead>
  )
}

export const PlayerPoolRow: StatelessComponent<PlayerPoolRowProps> = props => {
  const { player, onClick } = props
  const { name, salary, gameInfo, position, fantasyPoints } = player
  // TODO figure out the game via what team the player is on

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
