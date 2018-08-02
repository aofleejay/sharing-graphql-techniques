import { gql } from 'apollo-server-express'
import mongoose from 'mongoose'
import authorModel from '../models/author'
import bookModel from '../models/book'

const typeDefs = gql`
  extend type Query {
    authors: [Author]
    author(id: String): Author
  }

  extend type Mutation {
    createAuthor(author: AuthorInput!): Author
  }

  input AuthorInput {
    name: String!
    email: String @constraint(pattern: "email")
  }

  type Author @cacheControl(maxAge: 240) {
    id: String!
    name: String! @lowerCase
    email: String
    books: [Book]
  }
`

const resolvers = {
  Query: {
    authors: () => authorModel.find(),
    author: (root, args) => authorModel.findOne({ _id: args.id }),
  },
  Mutation: {
    createAuthor: (root, args) => authorModel.create(args.author),
  },
  Author: {
    id: (root) => root._id,
    books: (root) => bookModel.find({ authorId: root.id })
  },
}

export {
  typeDefs,
  resolvers,
}
