import { randomInt } from './randomInt'
import { IPlayer } from './Player';


export function randomPlayerPool(n: number): IPlayer[] {
  const out: IPlayer[] = []

  for (let i = 0; i < n; i++) {
    const name = `player${i}`
    const salary = randomInt(1, 51)
    const projection = randomInt(-3, 3) + (salary * 5)
    const team = ['ATLANTA_HAWKS', 'BOSTON_CELTICS', 'BROOKLYN_NETS', 'CLEVELAND_CAVALIERS'][i % 4]

    out.push({
      name,
      salary,
      projection,
      team,
    })
  }

  return out
}
