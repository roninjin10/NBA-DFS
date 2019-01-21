import React from 'react'
import { Player } from './redux/AppState'

export interface PoolProps {
  playerPool: Player[]
}

export function PlayerPool(props: PoolProps) {
  const { playerPool } = props

  return (
    <table>
      <PlayerPoolHeadings />
      <tbody>
        {playerPool.map((player, i) => (
          <PlayerPoolRow player={player} key={i} />
        ))}
      </tbody>
    </table>
  )
}

interface PlayerPoolRowProps {
  player: Player
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

export function PlayerPoolRow(props: PlayerPoolRowProps) {
  const { player } = props
  const { name, salary, gameInfo, position, fantasyPoints } = player
  // TODO figure out the game via what team the player is on

  return (
    <tr>
      <td className="position">{position}</td>
      <td className="nickname">{name}</td>
      <td className="game">{`${gameInfo.away}@${gameInfo.home}`}</td>
      <td className="fantasy-points">{fantasyPoints}</td>
      <td className="salary">{salary}</td>
    </tr>
  )
}
