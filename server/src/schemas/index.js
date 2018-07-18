import { gql, makeExecutableSchema } from 'apollo-server-express'
import mongoose from 'mongoose'
import bookModel from '../models/book'
import authorModel from '../models/author'

const typeDefs = gql`
  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String, authorId: String): Book
    createAuthor(name: String): Author
  }

  type Book @cacheControl(maxAge: 240) {
    _id: String
    title: String
    author: Author
  }

  type Author @cacheControl(maxAge: 240) {
    _id: String
    name: String
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => bookModel.find(),
  },
  Mutation: {
    createBook: (root, args) => bookModel.create(args),
    createAuthor: (root, args) => authorModel.create(args),
  },
  Book: {
    author: (root) => authorModel.findOne({ _id: root.authorId }),
  },
  Author: {
    books: (root) => bookModel.find({ authorId: root._id })
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
