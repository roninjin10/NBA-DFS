import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { wrappedCreateStore } from './redux/createStore';

export const ConnectedApp: FunctionComponent = () => {
  return (
    <Provider store={wrappedCreateStore()}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}
