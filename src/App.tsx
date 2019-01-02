import React, { Component } from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import * as actions from './redux/actions'
import { AppState } from './redux/AppState'

export interface StateProps {
  title: string
}

export interface AppProps extends StateProps {
  reduxDispatch: (action: AnyAction) => AnyAction
}

class _App extends Component<AppProps> {
  changeTitle = () => this.props.reduxDispatch(actions.setTitle('I got clicked'))

  render() {
    return (
      <div className='App'>
        <div>Nav bar fantasy stacks</div>
      </div>
    )
  }
}

function mapStateToProps(state: AppState): StateProps {
  return {
    title: state.title,
  }
}

export const App = connect(mapStateToProps)(_App)
