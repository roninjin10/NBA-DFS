import React from 'react'
import { PlayerPoolRow } from './PlayerPool'
type Player = any

const TODO = 90

export interface EditableLineupProps {
  lineup: Player[]
}

export function EditableLineup(props: EditableLineupProps) {
  const { lineup } = props

  const points = TODO
  const salary = TODO

  return (
    <div>
      <table>
        <thead>
          <th>POS</th>
          <th>PLAYER</th>
          <th>GAME</th>
          <th>POINTS</th>
          <th>SALARY</th>
        </thead>
        <tbody>{renderLineup(lineup)}</tbody>
        <div>FantasyPoints: {points}</div>
        <div>SalaryUsed: {salary}</div>
      </table>
    </div>
  )
}

function renderLineup(lineup: Player[]) {
  return lineup.map(player => {
    return <PlayerPoolRow player={player} />
  })
}
