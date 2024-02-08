import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/index.css'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split, useMutation } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { QueryClientProvider, QueryClient } from 'react-query'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import Auth from "./utlis/auth";
import { onlineStatus } from './utlis/mutation.js'



const queryClient = new QueryClient()
// Construct our main GraphQL API endpoint
let httpLink = createHttpLink({
  uri: '/graphql',
})

// Request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3001/graphql',
  options: {
    reconnect: true,
  }
})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: splitLink,
  cache: new InMemoryCache(),
})
const auth = Auth.loggedIn()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
