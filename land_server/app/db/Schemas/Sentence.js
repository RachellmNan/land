const mongoose = require('mongoose')
const BaseSchema = require('./Base')

const SentenceSchema = mongoose.Schema(Object.assign(BaseSchema))

mongoose.model('Sentence', SentenceSchema)

