const Router = require('koa-router')
const {HttpException, ParameterException} = require('../../../core/http-exception')
const validator = require('validator'); 
const Auth = require('../../../middlewares/auth');
const router = new Router()

router.post('/v1/book',new Auth(Auth.ADMIN).verify, (ctx,next)=>{

    // console.log('this is book')
    // const params = ctx.params
    // const query = ctx.query
    // const header = ctx.header
    // const body = ctx.request.body
    // if(!validator.isInt(params.id, {min:1})){
    //     throw new ParameterException()
    // }
    ctx.body = ctx.auth
})


module.exports = router