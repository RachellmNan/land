const mongoose = require('mongoose')
const { preSave } = require('../helpers')

const FavorSchema = new mongoose.Schema({
    uid: String ,
    art_id: String,
    type: Number
})

FavorSchema.pre('save',preSave);
mongoose.model('Favor',FavorSchema)