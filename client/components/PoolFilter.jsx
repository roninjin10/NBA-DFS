import React from 'react';

const PoolFilters = ({filters, filterPosition}) => {
  const filterClasses = 
    ['PG', 'SG', 'SF', 'PF', 'C']
    .map((pos) => filters.includes(pos) ? 'filter-button filtered' : 'filter-button');

  return (
    <div>
      <ul>
        <li>
          <button 
            className={filterClasses[0]} 
            onClick={() => filterPosition('PG')}
          >
            PG
          </button>
          <button className={filterClasses[1]} onClick={() => filterPosition('SG')}>SG</button>
          <button className={filterClasses[2]} onClick={() => filterPosition('SF')}>SF</button>
          <button className={filterClasses[3]} onClick={() => filterPosition('PF')}>PF</button>
          <button className={filterClasses[4]} onClick={() => filterPosition('C')}>C</button>
        </li>
      </ul>
    </div>
  );
};

export default PoolFilters;