import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = { hello: () => 'Hello World!' }

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

const PORT = 4000

app.listen(PORT, () => console.log(`Graphql server started.   Browse to localhost:${PORT}/graphql`))
