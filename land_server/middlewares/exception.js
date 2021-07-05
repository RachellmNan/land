const { HttpException } = require("../core/http-exception")

const catchError = async (ctx,next)=>{
    try {
        await next()
    } catch (error) {
        if(error instanceof HttpException){
            ctx.body = {
                msg: error.msg,
                errorCode: error.errorCode,
                requestUrl: `${ctx.method} ${ctx.path}`,
                status: error.status          
            }
        }
    }
}

module.exports = catchError