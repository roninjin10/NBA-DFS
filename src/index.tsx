import './index.scss'
import { renderApp } from './renderApp'
import * as worker from './serviceWorker'

const MOUNT_POINT_ID = 'root'

function start() {
  renderApp(MOUNT_POINT_ID)
  worker.register()
}

start()
