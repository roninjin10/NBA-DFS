import * as fs from 'fs'

const READ_PATH = `${__dirname}/DKSalaries (1).csv`
const WRITE_PATH = `${__dirname}/pool.json`

type PlayerPool = any

type Player = any

async function readFileP(path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, (err, contents) => {
      !err
        ? resolve(contents.toString())
        : reject(err)
    })
  })
}

async function writeFileP(content: string, path: string): Promise<void> {
  await new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => {
      !err
        resolve()
        reject(err)
    })
  })
}

function isNumeric(s: string): boolean {
  return !Number.isNaN(Number(s))
}

const rowToPlayer = (headings: string[]) => (playerRow: string[]): Player => {
  return headings.reduce((a, heading, i) => ({
    ...a,
    [heading]: isNumeric(playerRow[i]) ? Number(playerRow[i]) : playerRow[i]
  }), {})
}

function csvToPlayerPool (csv: string): PlayerPool {
  const rows = csv.split('\r\n')

  const headings = rows[0].split(',')
  const players = rows
    .slice(1)
    .map(row => row.split(','))

  return players.map(playerRow =>
    rowToPlayer(headings)(playerRow)
  )
}

export async function dkCsvToJson() {
  const csv = await readFileP(READ_PATH)

  const playerPool = csvToPlayerPool(csv)

  const content = JSON.stringify(playerPool, null, 2)

  await writeFileP(content, WRITE_PATH)

  return content
}

dkCsvToJson().then(console.log)
