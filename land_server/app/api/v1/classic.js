const Router = require('koa-router')
const router = new Router()

router.get('/classic',(ctx,next)=>{
    ctx.body = 'this is classic'
    console.log('this is classic')
})


module.exports = router