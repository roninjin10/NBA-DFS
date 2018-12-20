import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { Store } from 'redux'
import * as redux from 'redux'
import { AppState, INITIAL_STATE } from './redux/AppState'
import { reducers } from './redux/reducers'
import { Provider } from 'react-redux'

const MOUNT_POINT_ID = 'root'

function renderApp(mountPointId: string) {
  const mountElement: HTMLElement|null = document.getElementById(MOUNT_POINT_ID)

  if (!mountElement) {
    console.error('Id of mount point not found', {MOUNT_POINT_ID})
    return
  }

  const store: Store<AppState> = redux.createStore(reducers, INITIAL_STATE)

  const reduxDispatch = store.dispatch.bind(store)

  const connectedApp = (
    <Provider store={store}>
      <App reduxDispatch={reduxDispatch}/>
    </Provider>
  )

  ReactDOM.render(connectedApp, document.getElementById('root'))
}

renderApp(MOUNT_POINT_ID)
