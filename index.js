import { ApolloServer } from 'apollo-server-lambda'

import { getDynamoClient } from './utils/db'
import typeDefs from "./schema"
import resolvers from "./resolvers"

const getUserId = ({ headers }) => {
  console.log(headers)
  const userId = headers['X-User-Id']
  return userId || ''
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event }) => ({
    userId: getUserId(event),
    db: getDynamoClient(event)
  })
})

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
