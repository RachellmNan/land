const mongoose = require('mongoose')
const BaseSchema = require('./Base')

const MusicSchema = mongoose.Schema(Object.assign(BaseSchema,{
    url: String
}))

mongoose.model('Music', MusicSchema)