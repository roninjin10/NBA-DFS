import React from 'react'
import { PlayerPoolRow } from './PlayerPool'
import { ReduxDispatch } from './DispatchProvider';
type Player = any

const TODO = 90

export interface EditableLineupProps {
  lineup: Player[]
  reduxDispatch: ReduxDispatch
}

export function EditableLineup(props: EditableLineupProps) {
  const { lineup, reduxDispatch } = props

  const points = TODO
  const salary = TODO

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>POS</th>
            <th>PLAYER</th>
            <th>GAME</th>
            <th>POINTS</th>
            <th>SALARY</th>
          </tr>
        </thead>
        <tbody>{renderLineup(lineup, reduxDispatch)}</tbody>
      </table>
      <div>FantasyPoints: {points}</div>
      <div>SalaryUsed: {salary}</div>
    </div>
  )
}

function renderLineup(lineup: Player[], reduxDispatch: ReduxDispatch) {
  return lineup.map((player, i) => {
    return <PlayerPoolRow player={player} reduxDispatch={reduxDispatch} playerIndex={i} key={i} />
  })
}
