const mongoose = require('mongoose')
const BaseSchema = require('./Base')
const { preSave } = require('../helpers')

const SenetnceSchema = new mongoose.Schema(BaseSchema)

SenetnceSchema.pre('save',preSave)
mongoose.model('Sentence',SenetnceSchema)