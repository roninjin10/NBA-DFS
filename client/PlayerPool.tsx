import React from 'react'
type Player = any

export interface PoolProps {
  pool: Player[]
}

export function PlayerPool(props: PoolProps) {
  const { pool } = props

  return (
    <table>
      <PlayerPoolHeadings />
      <tbody>
        {pool.map(player => (
          <PlayerPoolRow player={player} />
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
  const { position, nickname, game, fantasyPoints, salary } = player

  return (
    <tr>
      <td className="position">{position}</td>
      <td className="nickname">{nickname}</td>
      <td className="game">{game}</td>
      <td className="fantasy-points">{fantasyPoints}</td>
      <td className="salary">{salary}</td>
    </tr>
  )
}
