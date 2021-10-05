const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    openid: String,
    session_key: String
})

mongoose.model('User', UserSchema)