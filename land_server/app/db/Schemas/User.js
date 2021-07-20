const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
const { getMeta, preSave } = require('../helpers')

const UserSchama = new mongoose.Schema({
    nickname: String,
    password: {
        type: String,
        set: val=>{
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(val, salt)
            return hash
        }
    },
    email: String,
    openid: String,
    session_key:String,
    meta: getMeta()
})
UserSchama.pre('save',preSave)
mongoose.model('User',UserSchama)