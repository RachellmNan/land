const Router = require('@koa/router')

const router = new Router({
    prefix: '/classic'
})

router.get('/test',(ctx)=>{
    ctx.body = {
        info: 'this is classicpage'
    }
})

module.exports = router
