import './App.scss'
import React, { FunctionComponent } from 'react'
import { GamePicker } from './components/GamePicker';
import { PositionFilters } from './components/PositionFilters';
import { PlayerPicker } from './components/PlayerPicker';
import { Optimizer } from './components/Optimizer';
import { LineupEditor } from './components/LineupEditor';
import { Search } from './components/Search';
import { Heading } from './components/Heading';
import { PlayerPickerGrid } from './components/PlayerPickerGrid';
import { Lineup } from './components/Lineup';
import { LineupButtons } from './components/LineupButtons';

export const App: FunctionComponent<{}> = () => {
  return (
    <div className="App">
      <Heading />
      <Optimizer>
        <GamePicker />
        <PlayerPicker>
          <Search />
          <PositionFilters />
          <PlayerPickerGrid />
        </PlayerPicker>
        <LineupEditor>
          <Lineup />
          <LineupButtons />
        </LineupEditor>
      </Optimizer>
    </div>
  )
}
