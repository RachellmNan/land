const jwt = require('jsonwebtoken')
const { config } = require('../config/config')

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
    generateToken
}