import React, { FunctionComponent } from 'react'
import { ReduxDispatch } from '../lib/types'

interface NavBarProps {
  reduxDispatch: ReduxDispatch
}

export const NavBar: FunctionComponent<NavBarProps> = () => <div>Nav bar fantasy stacks</div>
