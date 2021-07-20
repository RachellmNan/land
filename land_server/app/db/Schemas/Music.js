const mongoose = require('mongoose')
const BaseSchema = require('./Base')
const { preSave } = require('../helpers')

const MusicSchema = new mongoose.Schema(Object.assign(BaseSchema,{
    url: String
}))
MusicSchema.pre('save',preSave)

mongoose.model('Music',MusicSchema)