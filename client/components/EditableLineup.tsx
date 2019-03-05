import React, { StatelessComponent } from 'react'
import { PlayerPoolRow } from './PlayerPool'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'

type Player = any

export interface EditableLineupProps {
  lineup: Player[]
  reduxDispatch: ReduxDispatch
}

function sum(a: number, b: number) {
  return a + b
}

function getPoints(lineup: Player[]) {
  return lineup
    .map(({ fantasyPoints }) => fantasyPoints)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(1)
}

function getSalary(lineup: Player[]) {
  return lineup
    .map(({ salary }) => salary)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(0)
}

export const EditableLineup: StatelessComponent<EditableLineupProps> = ({
  lineup,
  reduxDispatch
}) => {
  const points = getPoints(lineup)
  const salary = getSalary(lineup)

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
        <tbody><Lineup lineup={lineup} reduxDispatch={reduxDispatch} /></tbody>
      </table>
      <div>FantasyPoints: {points}</div>
      <div>SalaryUsed: {salary}</div>
    </div>
  )
}

interface LineupProps {
  lineup: Player[]
  reduxDispatch: ReduxDispatch
}

const Lineup: StatelessComponent<LineupProps> = ({ lineup, reduxDispatch }) => (
  <React.Fragment>
    {
      lineup.map((player, i) => {
        const removeFromPool = () => reduxDispatch(actions.removeFromLineup(i))

        return <PlayerPoolRow player={player} key={i} onClick={removeFromPool} />
      })
    }
  </React.Fragment>
)
