import React, { StatelessComponent } from 'react'
import * as actions from '../redux/actions'
import { ZeroThroughEight, Player, MapStateToProps, MapDispatchToProps } from '../lib/types'
import { connect } from 'react-redux'
import { PlayerPickerRow } from './PlayerPickerGrid';

interface AggregateStat {
  (lineup: (Player | null)[]): string
}

const positions = ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'UTIL']

const sum = (a: number, b: number) => a + b

const onlyPlayers = (players: (Player | null)[]) => players.filter(player => player) as Player[]

const getPoints: AggregateStat = lineup =>
  onlyPlayers(lineup)
    .map(({ fantasyPoints }) => fantasyPoints)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(1)

const getSalary: AggregateStat = lineup =>
  onlyPlayers(lineup)
    .map(({ salary }) => salary)
    .map(Number)
    .reduce(sum, 0)
    .toFixed(0)

const validateZeroThroughEight = (n: number): ZeroThroughEight => {
  if (!Number.isInteger(n) || n < 0 || n > 8)
    throw new Error(`${n} is not an integer between zero and eight`)
  return n as ZeroThroughEight
}

const makeNullPlayer = (position: string): Player => ({
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

interface StateProps {
  lineup: (Player | null)[]
}

interface DispatchProps {
  removeFromLineup: (i: ZeroThroughEight) => () => void
}

type LineupProps = StateProps & DispatchProps

const _Lineup: StatelessComponent<LineupProps> = ({ lineup, removeFromLineup }) => (
  <div className="Lineup">
    <table className="EditableLineup-container">
      <thead>
        <tr>
          <th>GAME</th>
          <th>POS</th>
          <th>PLAYER</th>
          <th>SALARY</th>
          <th>PROJECTION</th>
          <th>VALUE</th>
        </tr>
      </thead>
      <tbody>
        {lineup.map((player, i) => (
          <PlayerPickerRow
            player={player || makeNullPlayer(positions[i])}
            key={i}
            onClick={removeFromLineup(validateZeroThroughEight(i))}
          />
        ))}
      </tbody>
    </table>
    <div>FantasyPoints: {getPoints(lineup)}</div>
    <div>SalaryUsed: {getSalary(lineup)}</div>
  </div>
)

const mapStateToProps: MapStateToProps<StateProps> = state => ({ lineup: state.lineup })

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = dispatch => ({
  removeFromLineup: i => () => dispatch(actions.removeFromLineup(i)),
})

export const Lineup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Lineup)
