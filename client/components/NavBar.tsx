import React, { StatelessComponent } from 'react'
import { ReduxDispatch } from './DispatchProvider';

interface NavBarProps {
  reduxDispatch: ReduxDispatch
}

export const NavBar: StatelessComponent<NavBarProps> = ({ reduxDispatch }) => {
  return (
    <div>Nav bar fantasy stacks</div>
  )
}
