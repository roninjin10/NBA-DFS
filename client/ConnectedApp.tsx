import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { createProxyStore } from './redux/store'

export const ConnectedApp = () => (
  <Provider store={createProxyStore(navigator)}>
    <Router>
      <App />
    </Router>
  </Provider>
)
