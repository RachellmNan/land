const Router = require('koa-router')
const {HttpException, ParameterException} = require('../../../core/http-exception')
const router = new Router()

router.post('/v1/:id/book',(ctx,next)=>{
    ctx.body = 'this is book'
    console.log('this is book')
    const params = ctx.params
    const query = ctx.query
    const header = ctx.header
    const body = ctx.request.body
    console.log('path: ',ctx.path)
    console.log('params: ',params)
    console.log('query: ',query)
    console.log('header: ',header)
    console.log('body: ',body)
    console.log('Http: ',ctx.status)
    if(true){
        console.log('进入了 ')
        const error = new ParameterException()
        throw error
    }
    ctx.body = {
        "success":200
    }
})


module.exports = router