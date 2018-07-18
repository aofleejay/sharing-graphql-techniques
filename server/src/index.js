import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloEngine } from 'apollo-engine'
import express from 'express'
import mongoose from 'mongoose'
import schema from './schemas'
import {
  DATABASE_URL,
  APOLLO_ENGINE_API_KEY,
} from './config'

mongoose.connect(DATABASE_URL).then(
  () => console.log('Connected to database.'),
  err => console.error('Failed to connect database', err),
)

const app = express()
const server = new ApolloServer({
  schema,
  tracing: true,
  cacheControl: true,
  engine: false,
})

server.applyMiddleware({ app })

const engine = new ApolloEngine({
  apiKey: APOLLO_ENGINE_API_KEY,
})

engine.listen({
  port: 4000,
  expressApp: app,
}, () => {
  console.log('🚀  Server ready at http://localhost:4000')
})
