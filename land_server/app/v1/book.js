const Router = require('@koa/router')

const router = new Router({
    prefix: '/book'
})

router.get('/test',(ctx)=>{
    ctx.body = {
        info: 'this is bookpage'
    }
})

module.exports = router
