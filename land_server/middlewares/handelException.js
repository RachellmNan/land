const { config } = require("../config/config")
const { HttpException } = require("../core/exception")

async function handleException(ctx, next){
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = config.enviroment == 'dev'
        if(isDev && !isHttpException){
            throw error
        }
        if(isHttpException){
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.status
        }else{
            ctx.body = {
                msg: '糟糕出了个问题 O(n_n)O~~',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = {
    handleException
}