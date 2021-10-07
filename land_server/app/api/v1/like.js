const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const mongoose = require('mongoose')
const { getData } = require('../../../core/util')
const FavorModel = mongoose.model('Favor')
const MovieModel = mongoose.model('Movie')
const MusicModel = mongoose.model('Music')
const SentenceModel = mongoose.model('Sentence')
const router = new Router({
    prefix: '/v1/like'
})

router.post('/', (new Auth(Auth.USER)).verify ,async (ctx)=>{
    let { art_id, type } = ctx.request.body
    let uid = ctx.auth.uid
    await FavorModel.create({
        uid,
        art_id,
        type
    })
    let res = await getData(art_id, type)
    res.fav_nums += 1
    console.log(res)
    switch (type) {
        case 100:
            await res.save()
            break;
        case 200:
            await res.save()
            break;
        case 300:
            await res.save()
            break;
        default:
            break;
    }
    ctx.body = {
        error_code: 0,
        msg: "ok",
        request: `${ctx.method}  ${ctx.path}`
    }
})

router.post('/cancel', (new Auth(Auth.USER)).verify, async (ctx)=>{
    let { art_id, type } = ctx.request.body
    let uid = ctx.auth.uid
    await FavorModel.deleteOne({
        uid,
        art_id,
        type
    })
    let res = await getData(art_id, type)
    res.fav_nums -= 1
    console.log(res)
    switch (type) {
        case 100:
            await res.save()
            break;
        case 200:
            await res.save()
            break;
        case 300:
            await res.save()
            break;
        default:
            break;
    }
    ctx.body = {
        error_code: 0,
        msg: "ok",
        request: `${ctx.method}  ${ctx.path}`
    }
})

module.exports = router