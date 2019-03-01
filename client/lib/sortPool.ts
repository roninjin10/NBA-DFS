import { Player, HomeAway } from "../redux/AppState";

function maybeAsNumber(x: string | HomeAway): Number | string | HomeAway {
  const isHomeAway = (x: string | HomeAway) => !['string', 'number'].includes(typeof x)

  if (isHomeAway(x)) {
    return (x as HomeAway).home
  }

  if (isNaN(x as any)) {
    return x
  }

  return Number(x)
}
export function sortPool(field: keyof Player, playerPool: Player[], isReversed: boolean): Player[] {
  const sortStrategy = (playerA: Player, playerB: Player) => {
    const [a, b] = [playerA, playerB].map(player => player[field])

    const [firstItem, secondItem] = (!isReversed
      ? [b, a]
      : [a, b]
    ).map(maybeAsNumber)

    return firstItem >= secondItem ? 1 : -1
  }

  return [...playerPool].sort(sortStrategy) as Player[] as Player[]
}
