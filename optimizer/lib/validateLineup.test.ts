import { InvalidLineup, FantasyLineup } from './FantasyLineup'
import { validateLineup } from './validateLineup'

const values = (obj: Object) => {
  return Object.keys(obj).map(key => obj[key])
}

describe('validateLineup', () => {
  test('should throw if a lineup is invalid', () => {
    const invalidLineups = values(InvalidLineup)
    invalidLineups.forEach(lu =>
      expect(() => validateLineup(lu)).toThrow('invalid lineup!')
    )
  })

  test('should not throw if a lineup is valid', () => {
    const validLineup = new FantasyLineup(50, 5, [])
    validateLineup(validLineup)
  })
})
