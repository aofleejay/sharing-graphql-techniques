import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
}, {
  versionKey: false,
})

const model = mongoose.model('authors', schema)

export default model
