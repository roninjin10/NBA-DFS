import playerPool from '../dummyData/pool.json'

export interface AppState {
  title: string
  playerPool: any[]
}

export const INITIAL_STATE: AppState = {
  title: 'ClickMe',
  playerPool,
}
