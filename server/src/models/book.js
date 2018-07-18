import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: String,
  authorId: String,
}, {
  versionKey: false,
})

const model = mongoose.model('books', schema)

export default model
