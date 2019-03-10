import React, { FunctionComponent, ChangeEvent } from 'react'
import { connect } from 'react-redux';
import { MapStateToProps, MapDispatchToProps } from '../lib/types';
import * as actions from '../redux/actions'

interface StateProps { value: string }
interface DispatchProps { onChange: (e: ChangeEvent<HTMLInputElement>) => void }

type PlayerPickerSearchProps = StateProps & DispatchProps

const _PlayerPickerSearch: FunctionComponent<PlayerPickerSearchProps> = ({ value, onChange }) => (
  <div >
    <input className="PlayerPickerSearch" type="text" value={value} onChange={onChange} />
  </div>
)

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = dispatch => ({ onChange: e => dispatch(actions.setPickerSearch(e.target.value)) })

const mapStateToProps: MapStateToProps<StateProps> = state => ({ value: state.playerSearch })

export const PlayerPickerSearch = connect(mapStateToProps, mapDispatchToProps)(_PlayerPickerSearch)
