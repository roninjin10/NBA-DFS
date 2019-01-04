import React from 'react';
import PoolRow from './PoolRow.jsx';

const Lineup = ({isEditable, lineup, points, salary, addRemove}) => {
  const renderLineup = lineupToArray(lineup, isEditable)
    .map((player) => 
      <PoolRow 
        addRemove={addRemove}
        player={Object.assign(player, {inLineup: true})}
      />);

  return (
    <div>
      <table>
        <thead>
          <tr>
          <th>POS</th>
          <th>PLAYER</th>
          <th>GAME</th>
          <th>Points</th>
          <th>SALARY</th>
          </tr>
        </thead>
        <tbody>{renderLineup}</tbody>
      </table>
      <div>FantasyPoints: {points}</div>
      <div>SalaryUsed: {salary}</div>
    </div>
  )
};

const positionStrings = [
  'pg1',
  'pg2',
  'sg1',
  'sg2',
  'sf1',
  'sf2',
  'pf1',
  'pf2',
  'c1'
];

const lineupToArray = (lineup, isEditable) => {
  let out = [];
  for (let i = 0; i < positionStrings.length; i++) {
    let position = positionStrings[i];
    let player = lineup[position];

    if (player != null) {
      player = Object.assign(player, {position: position});
      if (player !== null) {
        player.isEditable = isEditable;
      }
    } else {
      player = {
        FPPG: '', 
        inLineup: false, 
        isEditable: false, 
        Position: position, 
        Nickname: '', 
        Game: '', 
        Salary: ''
      };
    }
    out.push(player);
  }
  return out;
}

export default Lineup;
