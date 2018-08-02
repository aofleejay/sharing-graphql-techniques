import { makeExecutableSchema, gql } from 'apollo-server-express'
import ConstraintDirective from 'graphql-constraint-directive'
import merge from 'lodash.merge'
import {
  typeDefs as bookTypeDefs,
  resolvers as bookResolvers,
} from './book'
import {
  typeDefs as authorTypeDefs,
  resolvers as authorResolvers,
} from './author'

const query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [query, bookTypeDefs, authorTypeDefs],
  resolvers: merge(bookResolvers, authorResolvers),
  schemaDirectives: { constraint: ConstraintDirective },
})

export default schema
