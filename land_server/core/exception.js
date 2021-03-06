class HttpException extends Error{
    constructor(msg = '服务器异常', errorCode = 10000, status = 400){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.status = status
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
        this.status = 400
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}

class ForbiddenError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}

class ExceedError extends HttpException{
    constructor(msg, errorCode){
        super()
        this.status = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10007
    }
}

class likeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 400
        this.msg = msg || '你已经点赞过'
        this.errorCode = errorCode || 60001
    }
}

class DislikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '你已取消点赞'
        this.errorCode = errorCode || 60002
    }
}

module.exports = {
    HttpException,
    ParameterException,
    NotFound,
    AuthFailed,
    ForbiddenError,
    ExceedError,
    likeError,
    DislikeError
}