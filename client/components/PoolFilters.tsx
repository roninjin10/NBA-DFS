import React from 'react'

export interface PoolFilterProps {}

export function PoolFilters(props: PoolFilterProps) {
  return (
    <div>
      <button>PG</button>
      <button>SG</button>
      <button>SF</button>
      <button>PF</button>
      <button>C</button>
    </div>
  )
}
