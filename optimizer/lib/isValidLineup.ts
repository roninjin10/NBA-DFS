import { FantasyLineup, InvalidLineup } from './FantasyLineup'

const values = (obj: Object) => {
  return Object.keys(obj).map(key => obj[key])
}

export const isValidLineup = (lineup: FantasyLineup | InvalidLineup) => {
  return !values(InvalidLineup).some(invalidLineup => lineup === invalidLineup)
}
