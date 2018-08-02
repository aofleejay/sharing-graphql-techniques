import { makeExecutableSchema, gql } from 'apollo-server-express'
import merge from 'lodash.merge'
import {
  typeDefs as bookTypeDefs,
  resolvers as bookResolvers,
} from './book'
import {
  typeDefs as authorTypeDefs,
  resolvers as authorResolvers,
} from './author'
import directives from '../directives'

const query = gql`
  type Query {
    _empty: String @deprecated(reason: "Root query for extend")
  }

  type Mutation {
    _empty: String @deprecated(reason: "Root mutation for extend")
  }
`

const schema = makeExecutableSchema({
  typeDefs: [query, bookTypeDefs, authorTypeDefs],
  resolvers: merge(bookResolvers, authorResolvers),
  schemaDirectives: directives,
})

export default schema
