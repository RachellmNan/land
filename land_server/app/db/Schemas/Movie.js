const mongoose = require('mongoose')
const BaseSchema = require('./Base')
const { preSave } = require('../helpers')

const MoviesSchema = new mongoose.Schema(BaseSchema)

MoviesSchema.pre('save',preSave);
mongoose.model('Movie',MoviesSchema)