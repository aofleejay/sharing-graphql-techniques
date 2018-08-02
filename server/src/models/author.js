import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  email: String,
}, {
  versionKey: false,
})

const model = mongoose.model('authors', schema)

export default model
