import { createStore } from 'redux'
import { reducers } from '../redux/reducers'
import { INITIAL_STATE } from '../redux/initialState'
import { getMiddleware } from '../redux/getMiddleware'

export const wrappedCreateStore = () => createStore(reducers, INITIAL_STATE, getMiddleware())
