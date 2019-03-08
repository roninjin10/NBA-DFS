import React, { StatelessComponent } from 'react'
import * as redux from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { reducers } from './redux/reducers'
import { AppState } from './redux/AppState'
import { INITIAL_STATE } from './redux/initialState';
import { getMiddleware } from './redux/getMiddleware';

export const ConnectedApp: StatelessComponent = () => {
  const middleware = getMiddleware()

  const store: redux.Store<AppState> = redux.createStore(reducers, INITIAL_STATE, middleware)

  const reduxDispatch = store.dispatch.bind(store)

  return (
    <Provider store={store}>
      <Router>
        <App reduxDispatch={reduxDispatch} />
      </Router>
    </Provider>
  )
}
