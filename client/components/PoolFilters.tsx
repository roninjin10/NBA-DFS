import React, { StatelessComponent } from 'react'
import { ReduxDispatch } from './DispatchProvider';
import * as actions from '../redux/actions'

export interface PoolFilterProps {
  reduxDispatch: ReduxDispatch
}



export const PoolFilters: StatelessComponent<PoolFilterProps> = ({ reduxDispatch }) => {
  const filterPosition = (position: string) => reduxDispatch(actions.setPositionFilter(position))

  return (
    <div>
      <button onClick={() => filterPosition('PG')}>PG</button>
      <button onClick={() => filterPosition('SG')}>SG</button>
      <button onClick={() => filterPosition('SF')}>SF</button>
      <button onClick={() => filterPosition('PF')}>PF</button>
      <button onClick={() => filterPosition('C')}>C</button>
    </div>
  )
}
