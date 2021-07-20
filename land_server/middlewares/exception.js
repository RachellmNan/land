const { HttpException } = require("../core/http-exception")

const catchError = async (ctx,next)=>{
    try {
        await next()
    } catch (error) {
        const isDev = global.config.enviroment == 'dev'
        const isHttpException = error instanceof HttpException
        // 在开发环境 or 自定义错误 可以在编译器中显示错误
        if(isDev && !isHttpException){
            throw error
        } 
        if(isHttpException){
            ctx.body = { 
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`,        
            } 
            ctx.status= error.status  
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

module.exports = catchError