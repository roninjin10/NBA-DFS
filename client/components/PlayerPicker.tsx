import React, { FunctionComponent } from 'react'

export const PlayerPicker: FunctionComponent = props => {
  return (
    <div className="GamePicker" >
      {props.children}
    </div>
  )
}
