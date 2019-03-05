import React, { StatelessComponent } from 'react'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'

export interface PoolFilterProps {
  reduxDispatch: ReduxDispatch
  selectedPositions: Set<string>
}



export const PoolFilters: StatelessComponent<PoolFilterProps> = ({ reduxDispatch, selectedPositions }) => {
  const filterPosition = (position: string) => reduxDispatch(actions.setPositionFilter(position))

  const getClassName = (position: string) => selectedPositions.has(position) ? 'selected' : ''

  return (
    <div>
      <button className={getClassName('PG')} onClick={() => filterPosition('PG')}>PG</button>
      <button className={getClassName('SG')} onClick={() => filterPosition('SG')}>SG</button>
      <button className={getClassName('SF')} onClick={() => filterPosition('SF')}>SF</button>
      <button className={getClassName('PF')} onClick={() => filterPosition('PF')}>PF</button>
      <button className={getClassName('C')} onClick={() => filterPosition('C')}>C</button>
    </div>
  )
}
