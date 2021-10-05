const mongoose = require('mongoose')

const FavorSchema = mongoose.Schema({
    uid: String,
    art_id: String,
    type: Number
})

mongoose.model('favor', FavorSchema)