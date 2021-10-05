const mongoose = require('mongoose')

const HotBookSchema = mongoose.Schema({
    status: Number,
    id: Number,
    index: Number,
    image: String,
    author: String,
    title: String,
})

mongoose.model('HootBook', HotBookSchema)