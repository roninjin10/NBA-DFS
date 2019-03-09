import { HomeAway, Player } from './types'

interface MaybeAsNumber {
  (field: string): string | number
  (field: HomeAway): string
}

const maybeAsNumber: MaybeAsNumber = (field: HomeAway | string): any => {
  if (typeof field === 'object') return field.home

  if (isNaN(Number(field))) return field

  return Number(field)
}

interface SortPool {
  (field: keyof Player, playerPool: Player[], isReversed: boolean): Player[]
}

export const sortPool: SortPool = (field, playerPool, isReversed) =>
  [...playerPool].sort((playerA: Player, playerB: Player) => {
    const [a, b] = [playerA, playerB].map(player => player[field])

    const [firstItem, secondItem] = (!isReversed ? [b, a] : [a, b]).map(item =>
      maybeAsNumber(item as any)
    )

    return firstItem >= secondItem ? 1 : -1
  })
