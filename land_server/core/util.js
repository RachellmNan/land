const jwt = require('jsonwebtoken')
const { config } = require('../config/config')

const mongoose = require('mongoose')
const MovieModel = mongoose.model('Movie')
const MusicModel = mongoose.model('Music')
const SentenceModel = mongoose.model('Sentence')

async function getData(art_id, type){
    let art
    const finder = {
        id: art_id
    }
    switch (type) {
        case 100:
            art = await MovieModel.findOne(finder)
            break;
        case 200:
            art = await MusicModel.findOne(finder)
            break;
        case 300:
            art = await SentenceModel.findOne(finder)
            break;
        default:
            break;
    }
    return art
}

const generateToken = (id, scope)=>{
    const token = jwt.sign({
        id,
        scope
    }, config.security.jwt_key, {
        expiresIn: config.security.expiresIn
    })
    return token
}

module.exports = {
    generateToken,
    getData
}