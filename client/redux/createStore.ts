import { createStore } from 'redux'
import { reducers } from '../redux/reducers'
import { INITIAL_STATE } from '../redux/initialState'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { IS_PROD } from '../lib/isProd'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from 'redux'

export const getMiddleware = () => {
  const middleware = applyMiddleware(routerMiddleware(createBrowserHistory()))

  return IS_PROD ? middleware : composeWithDevTools(middleware)
}

export const wrappedCreateStore = () => createStore(reducers, INITIAL_STATE, getMiddleware())
