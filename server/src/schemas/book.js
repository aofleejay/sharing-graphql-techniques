import mongoose from 'mongoose'
import bookModel from '../models/book'
import authorModel from '../models/author'

const typeDefs = `
  extend type Query {
    books: [Book]
    book(id: String): Book
  }

  extend type Mutation {
    createBook(title: String, authorId: String): Book
  }

  type Book @cacheControl(maxAge: 240) {
    id: String
    title: String
    author: Author
  }
`

const resolvers = {
  Query: {
    books: () => bookModel.find(),
    book: (root, args) => bookModel.findOne({ _id: args.id }),
  },
  Mutation: {
    createBook: (root, args) => bookModel.create(args),
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
