import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloEngine } from 'apollo-engine'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import Dataloader from 'dataloader'
import schema from './schemas'
import authorModel from './models/author'
import {
  DATABASE_URL,
  APOLLO_ENGINE_API_KEY,
} from './config'

mongoose.connect(DATABASE_URL).then(
  () => console.log('Connected to database.'),
  err => console.error('Failed to connect database', err),
)

const getAuthorsByIds = (ids) => Promise.all(ids.map(id => authorModel.findOne({ _id: id })))

const authorLoader = new Dataloader(keys => getAuthorsByIds(keys))

const app = express()
app.use(cors())
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))
const server = new ApolloServer({
  schema,
  tracing: true,
  cacheControl: true,
  engine: false,
  context: {
    loaders: { authorLoader },
  },
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
