import React, { StatelessComponent } from 'react'
import { Player } from '../redux/AppState'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'

export interface PoolProps {
  playerPool: Player[]
  reduxDispatch: ReduxDispatch
}

export const PlayerPool: StatelessComponent<PoolProps> = props => {
  const { playerPool, reduxDispatch } = props

  console.log('newPlayerPool', playerPool)

  const renderedPool = playerPool.map((player, i) => {
    const addToPool = () => reduxDispatch(actions.addToLineup(i))

    return <PlayerPoolRow player={player} onClick={addToPool} key={i} />
  })

  return (
    <table>
      <PlayerPoolHeadings reduxDispatch={reduxDispatch} />
      <tbody>
        {renderedPool}
      </tbody>
    </table>
  )
}

interface PlayerPoolHeadingsProps {
  reduxDispatch: ReduxDispatch
}

export const PlayerPoolHeadings: StatelessComponent<PlayerPoolHeadingsProps> = ({ reduxDispatch }) => {
  const onClick = (heading: keyof Player) => reduxDispatch(actions.setPlayerSort(heading))

  return (
    <thead>
      <tr>
        <th onClick={() => onClick('position')}>POS</th>
        <th onClick={() => onClick('name')}>PLAYER</th>
        <th onClick={() => onClick('gameInfo')}>GAME</th>
        <th onClick={() => onClick('fantasyPoints')}>POINTS</th>
        <th onClick={() => onClick('salary')}>SALARY</th>
      </tr>
    </thead>
  )
}

interface PlayerPoolRowProps {
  player: Player
  onClick: Function
}

export const PlayerPoolRow: StatelessComponent<PlayerPoolRowProps> = props => {
  const { player, onClick } = props
  const { name, salary, gameInfo, position, fantasyPoints } = player

  return (
    <tr onClick={() => onClick()}>
      <td className="position">{position}</td>
      <td className="nickname">{name}</td>
      <td className="game">{`${gameInfo.away}@${gameInfo.home}`}</td>
      <td className="fantasy-points">{fantasyPoints}</td>
      <td className="salary">{salary}</td>
    </tr>
  )
}
