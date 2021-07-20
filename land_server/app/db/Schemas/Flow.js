const mongoose = require('mongoose')
const BaseSchema = require('./Base')
const { preSave } = require('../helpers')

const FlowSchema = new mongoose.Schema(Object.assign(BaseSchema,{
    index: Number,
    art_id: Number,
}))
FlowSchema.pre('save',preSave)
mongoose.model('Flow',FlowSchema)