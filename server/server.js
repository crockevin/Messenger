const express = require('express')
const { createServer } = require('http')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { ApolloServer } = require('@apollo/server')
const { authMiddleware } = require('./utils/auth')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { expressMiddleware } = require('@apollo/server/express4')
const { PORT = 3001 } = process.env
const app = express()
const db = require('./config/connection')
const path = require('path')
const cors = require('cors')
const { typeDefs, resolvers } = require('./schemas')
const httpServer = createServer(app)
const routes = require('./controller/')
const startApolloServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ req }),
    uploads: false,
  })
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  app.use(routes)
  await server.start()
  app.use('/graphql', express.json(), expressMiddleware(server, { context: authMiddleware }))

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
  }

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
      console.log(`Use GraphQL WebSocket at ws://localhost:${PORT}/graphql`)
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
        },
        {
          server: httpServer,
          path: '/graphql',
        }
      )
    })
  })
}

startApolloServer()
