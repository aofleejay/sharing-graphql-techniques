import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { ApolloProvider } from 'react-apollo'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const link = createPersistedQueryLink().concat(createHttpLink({ uri: 'http://localhost:4000/graphql' }))

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
, document.getElementById('root'))
registerServiceWorker()
