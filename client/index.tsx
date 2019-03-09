import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedApp } from './ConnectedApp';

const MOUNT_POINT_ID = 'root'

const mountElement = document.getElementById(MOUNT_POINT_ID)

ReactDOM.render(<ConnectedApp />, mountElement)
