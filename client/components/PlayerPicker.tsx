import React, { FunctionComponent } from 'react'
import { PlayerPickerSearch } from './PlayerPickerSearch'
import { PositionFilters } from './PositionFilters'
import { PlayerPickerGrid } from './PlayerPickerGrid'

export const PlayerPicker: FunctionComponent = () => (
  <div className="PlayerPicker">
    <PlayerPickerSearch />
    <PositionFilters />
    <PlayerPickerGrid />
  </div>
)
