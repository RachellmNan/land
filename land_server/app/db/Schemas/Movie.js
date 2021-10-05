const mongoose = require('mongoose')
const BaseSchema = require('./Base')

const MovieSchema = mongoose.Schema(BaseSchema)

mongoose.model('Movie', MovieSchema)