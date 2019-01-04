import React from 'react'
import { connect } from 'react-redux'

import PoolRow from './PoolRow.jsx'

const Pool = ({ pool, addRemove }) => {
  const renderPool = pool.map((player) => <PoolRow player={player} addRemove={addRemove} />)
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
        <tbody>{renderPool}</tbody>
      </table>
    </div>
  )
}

export default Pool
