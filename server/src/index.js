import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloEngine } from 'apollo-engine'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import depthLimit from 'graphql-depth-limit'
import schema from './schemas'
import loaders from './loaders'
import {
  DATABASE_URL,
  APOLLO_ENGINE_API_KEY,
} from './config'

mongoose.connect(DATABASE_URL).then(
  () => console.log('Connected to database.'),
  err => console.error('Failed to connect database', err),
)

const app = express()
app.use(cors())
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))
const server = new ApolloServer({
  schema,
  tracing: true,
  cacheControl: true,
  engine: false,
  context: { loaders },
  validationRules: [depthLimit(5)]
})

server.applyMiddleware({ app })

const engine = new ApolloEngine({
  apiKey: APOLLO_ENGINE_API_KEY,
  frontends: [{
    overrideGraphqlResponseHeaders: {
      'Access-Control-Allow-Origin': '*',
    },
  }],
})

engine.listen({
  port: 4000,
  expressApp: app,
}, () => {
  console.log('🚀  Server ready at http://localhost:4000/graphql')
})
