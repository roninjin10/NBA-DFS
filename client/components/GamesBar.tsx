import React from 'react'
import { ReduxDispatch } from './DispatchProvider'

export interface GameProps {
  home: string
  away: string
}

interface GamesBarProps {
  games: GameProps[]
  reduxDispatch: ReduxDispatch
}

export function GamesBar(props: GamesBarProps) {
  const games = props.games.map(({ home, away }, i) => {
    return <Game key={i} home={home} away={away} />
  })

  return <div className="gamesbar">{games}</div>
}

const noop = () => { }

function Game(props: GameProps) {
  const { away, home } = props

  return (
    <div className="games-bar">
      <button onClick={noop}>{away}</button>
      <button onClick={noop}>{'@' + home}</button>
    </div>
  )
}
