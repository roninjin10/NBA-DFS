import './App.scss'
import React from 'react'
import { GamePicker } from './components/GamePicker'
import { PlayerPicker } from './components/PlayerPicker'
import { Optimizer } from './components/Optimizer'
import { LineupEditor } from './components/LineupEditor'
import { Heading } from './components/Heading'

import { Layout } from './components/Layout'

export const App = () => (
  <Layout>
    <Heading />
    <Optimizer>
      <GamePicker />
      <PlayerPicker />
      <LineupEditor />
    </Optimizer>
  </Layout>
)
