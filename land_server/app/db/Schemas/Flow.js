const mongoose = require('mongoose')

const FlowSchema = mongoose.Schema({
    status: Number,
    id: Number,
    index : Number,
    type: Number,
    art_id: Number
})

mongoose.model('Flow', FlowSchema)