import './index.scss'
import * as worker from './serviceWorker'
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedApp } from './ConnectedApp';

const MOUNT_POINT_ID = 'root'

function start() {
  const mountElement = document.getElementById(MOUNT_POINT_ID)

  if (!mountElement) return console.error('Id of mount point not found', { mountPointId: MOUNT_POINT_ID })

  ReactDOM.render(<ConnectedApp />, mountElement)

  // TODO make this works
  // worker.register()
}

start()
