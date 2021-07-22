const basicAuth = require('basic-auth')
const config = require('../config/configs')
const jwt = require('jsonwebtoken')
const { Forbidden } = require('../core/http-exception')

class Auth {
    constructor(level){
        this.level = level || 1 // api 的访问level
    }
    static USER = 8  // 用户的级别
    static ADMIN = 16 // 管理员的级别
    static SUPER_ADMIN = 32 // 超级管理员的级别
    get verify(){
        return async (ctx,next)=>{
            // 获取到http中的Auth
            const AuthObj = basicAuth(ctx.req)
            let decode
            let errMsg = 'token不合法'
            if(!AuthObj || !AuthObj.name){
                throw new Forbidden(errMsg)
            }
            try {
                decode = jwt.verify(AuthObj.name, config.security.secretKey)
            } catch (error) {
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期'
                }
                throw new Forbidden(errMsg)
            }
            // 该用户的权限是否能访问该 api
            if(decode.scope < this.level){
                throw new Forbidden('权限不足')
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
    static verifyToken(token){
        try {
            jwt.verify(token, config.security.secretKey)
            return true
        } catch (error) {
            return false            
        }
    }
}

module.exports = Auth