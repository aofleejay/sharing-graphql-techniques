import { gql } from 'apollo-server-express'
import mongoose from 'mongoose'
import bookModel from '../models/book'

const typeDefs = gql`
  extend type Query {
    books: [Book]
    book(id: String): Book
  }

  extend type Mutation {
    createBook(book: BookInput!): Book
  }

  input BookInput {
    title: String!
    authorId: String!
  }

  type Book @cacheControl(maxAge: 240) {
    id: String!
    title: String!
    author: Author!
  }
`

const resolvers = {
  Query: {
    books: () => bookModel.find(),
    book: (root, args) => bookModel.findOne({ _id: args.id }),
  },
  Mutation: {
    createBook: (root, args) => bookModel.create(args.book),
  },
  Book: {
    id: (root) => root._id,
    author: (root, args, context) => context.loaders.authorLoader.load(root.authorId),
  }
}

export {
  typeDefs,
  resolvers,
}
