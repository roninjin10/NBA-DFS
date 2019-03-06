import React, { StatelessComponent } from 'react'
import { PlayerPoolRow } from './PlayerPool'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'
import { Player } from '../redux/AppState';
import { ZeroThroughEight } from '../lib/NBALineup';

const sum = (a: number, b: number) => a + b

interface AggregateStat {
  (lineup: (Player | null)[]): string
}

const onlyPlayers = (players: (Player | null)[]) => players.filter(player => player) as Player[]

const getPoints: AggregateStat = lineup => {
  return onlyPlayers(lineup)
    .map(({ fantasyPoints }) => fantasyPoints)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(1)
}

const getSalary: AggregateStat = lineup => {
  return onlyPlayers(lineup)
    .map(({ salary }) => salary)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(0)
}

export interface EditableLineupProps {
  lineup: (Player | null)[]
  reduxDispatch: ReduxDispatch
}

export const EditableLineup: StatelessComponent<EditableLineupProps> = ({
  lineup,
  reduxDispatch
}) => {
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
      <div>FantasyPoints: {getPoints(lineup)}</div>
      <div>SalaryUsed: {getSalary(lineup)}</div>
    </div>
  )
}

interface LineupProps {
  lineup: (Player | null)[]
  reduxDispatch: ReduxDispatch
}

const NullPlayer = (position: string): Player => {
  return ({
    position: position,
    namePlusId: '',
    name: '',
    id: '',
    rosterPosition: '',
    salary: 0,
    gameInfo: { home: '', away: '' },
    fantasyPoints: 0,
    team: '',
  })
}

const positions = [
  'PG',
  'SG',
  'SF',
  'PF',
  'C',
  'G',
  'F',
  'UTIL',
]

const Lineup: StatelessComponent<LineupProps> = ({
  lineup,
  reduxDispatch
}) => {
  return (
    <React.Fragment>
      {
        lineup
          .map((player, i) => player === null ? NullPlayer(positions[i]) : player)
          .map((player, i) => {
            const removeFromPool = () => reduxDispatch(actions.removeFromLineup(i as ZeroThroughEight))

            return <PlayerPoolRow player={player!} key={i} onClick={removeFromPool} />
          })
      }
    </React.Fragment>
  )
}
