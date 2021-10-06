const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')
const { config } = require('../config/config')
const { ForbiddenError } = require('../core/exception')
class Auth{
    static USER = 8
    static ADMIN = 16
    constructor(level){
        this.level = level
    }

    get verify(){
        return async (ctx, next)=>{
            const AuthObj = basicAuth(ctx.req)
            let decode 
            let errMsg = 'token不合法'
            if(!AuthObj || !AuthObj.name){
                throw new ForbiddenError(errMsg)
            }
            try {
                decode = jwt.verify(AuthObj.name, config.security.jwt_key)
            } catch (error) {
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期'
                }
                throw new ForbiddenError(errMsg)
            }
            if(this.level > decode.scope){
                throw new ForbiddenError('权限不足')
            }
            ctx.auth = {
                uid: decode.id,
                scope: decode.scope 
            }
            await next()
        }
        
    }

    static verifyToken(token){
        let decode
        try {
            decode =  jwt.verify(token, config.security.jwt_key)
            return true
        } catch (error) {
            return false            
        }
    }
}

module.exports = {
    Auth
}