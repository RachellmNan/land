const Router = require('@koa/router')
const axios = require('axios')
const { config } = require('../../../config/config')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/book'
})

 
async function getfromThrid({url,data = {},method = 'get'}){
    return (await axios({
        method,
        url: config.land.api_base_url + url,
        data,
        headers: {
            appkey: config.land.appkey
        }
    })).data
}

router.get('/hot_list', async (ctx)=>{
    let res = await getfromThrid({
        url: ctx.path.slice(3)
    })
    ctx.body = res
})

router.get('/:book_id/short_comment', (new Auth(Auth.USER)).verify ,async (ctx)=>{
    let res = await getfromThrid({
        url: ctx.path.slice(3)
    })
    ctx.body = res
})

router.get('/favor/count', (new Auth(Auth.USER)).verify  ,async (ctx)=>{
    let res = await getfromThrid({
        url: ctx.path.slice(3)
    })
    ctx.body = res
})

router.get('/:book_id/favor', (new Auth(Auth.USER)).verify  ,async (ctx)=>{
    let res = await getfromThrid({
        url:ctx.path.slice(3)
    })
    ctx.body = res
})

router.post('/add/short_comment', (new Auth(Auth.USER)).verify  ,async (ctx)=>{
    let res = await getfromThrid({
        url: ctx.path.slice(3),
        method: 'POST',
        data: ctx.request.body
    })
    ctx.body = res
})

router.get('/hot_keyword', async (ctx)=>{
    let res = await getfromThrid({
        url: ctx.path.slice(3)
    })
    ctx.body = res
})

router.get('/search', async (ctx)=>{
    let res = await getfromThrid({
        url: ctx.path.slice(3),
        data: ctx.query
    })
    ctx.body = res
})

router.get('/:id/detail', (new Auth(Auth.USER)).verify  , async (ctx)=>{
    let res = await getfromThrid({
        url: ctx.path.slice(3)
    })
    ctx.body = res
})

module.exports = router