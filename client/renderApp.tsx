import React from 'react'
import ReactDOM from 'react-dom'
import * as redux from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { App } from './App'
import { reducers } from './redux/reducers'
import { AppState, INITIAL_STATE } from './redux/AppState'
import { isProd } from './lib/isProd'
import { composeWithDevTools } from 'redux-devtools-extension'

function identity<T extends any>(x: T): T {
  return x
}

function getMiddleware() {
  const history = createBrowserHistory()

  let middleware = redux.applyMiddleware(routerMiddleware(history))

  if (!isProd()) {
    middleware = composeWithDevTools(middleware)
  }

  return middleware
}

export function renderApp(mountPointId: string) {
  const mountElement: HTMLElement | null = document.getElementById(mountPointId)

  if (!mountElement) {
    console.error('Id of mount point not found', { mountPointId })
    return
  }

  const middleware = getMiddleware()

  const store: redux.Store<AppState> = redux.createStore(reducers, INITIAL_STATE, middleware)

  const reduxDispatch = store.dispatch.bind(store)

  const connectedApp = (
    <Provider store={store}>
      <Router>
        <App reduxDispatch={reduxDispatch} />
      </Router>
    </Provider>
  )

  ReactDOM.render(connectedApp, document.getElementById('root'))
}
