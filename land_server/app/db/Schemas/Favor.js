const mongoose = require('mongoose')
const { preSave, getMeta } = require('../helpers')

const FavorSchema = new mongoose.Schema({
    uid: String,
    art_id: Number,
    type: Number,
    meta: getMeta()
})

FavorSchema.pre('save',preSave);
mongoose.model('Favor',FavorSchema)