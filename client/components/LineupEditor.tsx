import React, { FunctionComponent } from "react";

export const LineupEditor: FunctionComponent = props => {
  const Children: FunctionComponent = () => (
    <div>
      {props.children}
    </div>
  )

  return (
    <div>
      <Children />
    </div>
  )
}
