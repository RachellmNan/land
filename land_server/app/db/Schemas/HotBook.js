const mongoose = require('mongoose')
const BaseSchema = require('./Base')
const { preSave } = require('../helpers')

const HotBookSchema = new mongoose.Schema(Object.assign(BaseSchema,{
    index: Number,
    author: String
}))
HotBookSchema.pre('save',preSave)
mongoose.model('HotBook',HotBookSchema)