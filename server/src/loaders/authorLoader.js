import Dataloader from 'dataloader'
import authorModel from '../models/author'

const getAuthorsByIds = (ids) => Promise.all(ids.map(id => authorModel.findOne({ _id: id })))

const authorLoader = new Dataloader(ids => getAuthorsByIds(ids))

export default authorLoader
