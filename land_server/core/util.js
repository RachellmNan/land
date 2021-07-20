const jwt = require('jsonwebtoken')
const { security } = require('../config/configs')
/***
 * 
 */

// 颁发令牌
const  generateToken = function (uid, scope) {
    const secrectKey = security.secretKey
    const expiresIn = security.expiresIn
    const token = jwt.sign({
        uid,
        scope
    },secrectKey,{
        expiresIn
    })
    return token
}

module.exports = {
    generateToken
}