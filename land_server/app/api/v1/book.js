const Router = require('@koa/router')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/book'
})

router.get('/', new Auth(Auth.USER).verify ,(ctx)=>{
    ctx.body = {
        info: 'this is bookpage'
    }
    // throw new Error('这就是爱')
})

module.exports = router
