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

  return (
    <table>
      <PlayerPoolHeadings />
      <tbody>
        {playerPool.map((player, i) => (
          <PlayerPoolRow player={player} playerIndex={i} reduxDispatch={reduxDispatch} key={i} />
        ))}
      </tbody>
    </table>
  )
}

interface PlayerPoolRowProps {
  player: Player
  playerIndex: number
  reduxDispatch: ReduxDispatch
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
  const { player, reduxDispatch, playerIndex } = props
  const { name, salary, gameInfo, position, fantasyPoints } = player
  // TODO figure out the game via what team the player is on

  function addToPool() {
    reduxDispatch(actions.addToLineup(playerIndex))
  }

  return (
    <tr>
      <td className="position">{position}</td>
      <td className="nickname">{name}</td>
      <td className="game">{`${gameInfo.away}@${gameInfo.home}`}</td>
      <td className="fantasy-points">{fantasyPoints}</td>
      <td className="salary">{salary}</td>
      <td><button onClick={addToPool}>x</button></td>
    </tr>
  )
}
