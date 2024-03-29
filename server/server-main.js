const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const PORT = process.env.PORT || 3001
const app = express()
const db = require('./config/connection')
const { authMiddleware } = require('./utils/auth')
const path = require('path')
const { typeDefs, resolvers } = require('./schemas')
const { createServer } = require('http')
const WebSocket = require('ws')
const httpServer = createServer(app)
const wsServer = new WebSocket.Server({
  server: httpServer,
  path: '/graphql',
})
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  subscriptions: {
    path: '/graphql',
  },
})

const startApolloServer = async () => {
  await server.start()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  )
  wsServer.on('connection', (ws) => {
    console.log('connected')
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message)

      if (parsedMessage.type === 'connection_init') {
        ws.send(JSON.stringify({ type: 'connection_ack' }))
      }
    })
  })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
      console.log(`Use GraphQL WebSocket at ws://localhost:${PORT}/graphql`)
    })
  })
}

startApolloServer()
