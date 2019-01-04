import React from 'react';
import { connect } from 'react-redux';

const PoolRow = ({player, addRemove}) => {
  const fp = player.FPPG === '' ? '' : Math.round(player.FPPG);
  let button = 'o';
  let inLineupClass = '';
  if (player.inLineup) {
    button = 'x';
    inLineupClass = 'in-lineup';
  }
  
  let toggle = '';
  if (player.isEditable) {
    toggle = <button onClick={() => addRemove(player)} className={"add-remove " + inLineupClass}>{button}</button>;
  }

  return (
    <tr>
      <td className="position">{player.Position}</td>
      <td className="nickname"><a onClick={() => addRemove(player)}href="#">{player.Nickname}</a></td>
      <td className="game">{player.Game}</td>
      <td className="fp">{fp}</td>
      <td className="salary">{player.Salary}</td>
      {toggle}
    </tr>
  );
};

export default PoolRow;
