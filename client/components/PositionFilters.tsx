import React, { FunctionComponent } from 'react'
import * as actions from '../redux/actions'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { MapStateToProps, MapDispatchToProps } from '../lib/types'

const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C']

interface StateProps {
  getClassName: (position: string) => string
  positions: string[]
}

interface DispatchProps {
  onClickHandler: (position: string) => () => void
}

type AllProps = StateProps & DispatchProps

const _PositionFilters: FunctionComponent<AllProps> = ({
  getClassName,
  onClickHandler,
  positions,
}) => {
  const createButton = (position: string) => (
    <button className={getClassName(position)} onClick={onClickHandler(position)} key={position}>
      {position}
    </button>
  )

  const buttons = positions.map(createButton)

  return <div className="pool-filters">{buttons}</div>
}

const mapStateToProps: MapStateToProps<StateProps> = ({
  playerPool,
  lineup,
  games,
  sortBy,
  isSortByReversed,
  filters,
}) => {
  const getClassName: StateProps['getClassName'] = () => classNames({ selected: false })

  return {
    positions: POSITIONS,
    getClassName,
  }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = dispatch => {
  const onClickHandler: DispatchProps['onClickHandler'] = (position: string) => () =>
    dispatch(actions.togglePositionFilter(position))
  return { onClickHandler }
}

export const PositionFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PositionFilters)
