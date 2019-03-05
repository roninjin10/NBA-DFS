import React, { StatelessComponent } from 'react'
import { PlayerPoolRow } from './PlayerPool'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'

type Player = any

const sum = (a: number, b: number) => a + b

interface AggregateStat {
  (lineup: Player[]): string
}

const getPoints: AggregateStat = lineup => lineup
  .map(({ fantasyPoints }) => fantasyPoints)
  .map(Number)
  .reduce(sum, 0)
  .toFixed(1)

const getSalary: AggregateStat = lineup => lineup
  .map(({ salary }) => salary)
  .map(Number)
  .reduce(sum, 0)
  .toFixed(0)

export interface EditableLineupProps {
  lineup: Player[]
  reduxDispatch: ReduxDispatch
}

export const EditableLineup: StatelessComponent<EditableLineupProps> = ({
  lineup,
  reduxDispatch
}) => (
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
      <div>FantasyPoints: {getPoints(lineup)}</div>
      <div>SalaryUsed: {getSalary(lineup)}</div>
    </div>
  )

interface LineupProps {
  lineup: Player[]
  reduxDispatch: ReduxDispatch
}

const Lineup: StatelessComponent<LineupProps> = ({
  lineup,
  reduxDispatch
}) => (
    <React.Fragment>
      {
        lineup.map((player, i) => {
          const removeFromPool = () => reduxDispatch(actions.removeFromLineup(i))

          return <PlayerPoolRow player={player} key={i} onClick={removeFromPool} />
        })
      }
    </React.Fragment>
  )
