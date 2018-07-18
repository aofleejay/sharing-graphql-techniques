import { gql, makeExecutableSchema } from 'apollo-server-express'
import mongoose from 'mongoose'
import bookModel from '../models/book'
import authorModel from '../models/author'

const typeDefs = gql`
  type Query {
    books: [Book]
    book(id: String): Book
    authors: [Author]
    author(id: String): Author
  }

  type Mutation {
    createBook(title: String, authorId: String): Book
    createAuthor(name: String): Author
  }

  type Book @cacheControl(maxAge: 240) {
    id: String
    title: String
    author: Author
  }

  type Author @cacheControl(maxAge: 240) {
    id: String
    name: String
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => bookModel.find(),
    book: (root, args) => bookModel.findOne({ _id: args.id }),
    authors: () => authorModel.find(),
    author: (root, args) => authorModel.findOne({ _id: args.id }),
  },
  Mutation: {
    createBook: (root, args) => bookModel.create(args),
    createAuthor: (root, args) => authorModel.create(args),
  },
  Book: {
    id: (root) => root._id,
    author: (root) => authorModel.findOne({ _id: root.authorId }),
  },
  Author: {
    id: (root) => root._id,
    books: (root) => bookModel.find({ authorId: root.id })
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
