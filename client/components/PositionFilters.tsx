import React, { StatelessComponent } from 'react'

export interface PositionFiltersProps {
  getClassName: (position: string) => string
  onClickHandler: (position: string) => () => void
  positions: string[]
}


export const PositionFilters: StatelessComponent<PositionFiltersProps> = ({ getClassName, onClickHandler, positions }) => {
  const createButton = (position: string) => (
    <button
      className={getClassName(position)}
      onClick={onClickHandler(position)}>
      {position}
    </button>
  )

  const buttons = positions.map(createButton)

  return <div className="pool-filters">{buttons}</div>
}
