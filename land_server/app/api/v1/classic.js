const Router = require('@koa/router')
const mongoose = require('mongoose')
const FlowModel = mongoose.model('Flow')
const FavorModel = mongoose.model('Favor')
const UserModel = mongoose.model('User')
const validator = require('validator');
const { Auth } = require('../../../middlewares/auth')
const { config } = require('../../../config/config');
const { ParameterException } = require('../../../core/exception');
const { getData } = require('../../../core/util')
const router = new Router({
    prefix: '/v1/classic'
})

router.get('/latest', async (ctx)=>{
    const flow = await FlowModel.findOne().sort({index:'desc'}).limit(1)
    let res = await getData(flow.art_id, flow.type)
    res = JSON.parse(JSON.stringify(res))
    res.index = flow.index
    res.image = config.imagHost + res.image
    ctx.body = res
})

router.get('/:index/next', async (ctx)=>{
    let { index } = ctx.params
    if(!validator.isInt(index, {min:1,max:20})){
        throw new ParameterException()
    }
    index = parseInt(index) + 1
    const flow = await FlowModel.findOne({
        index
    })
    let res = await getData(flow.art_id, flow.type)
    res = JSON.parse(JSON.stringify(res))
    res.index = flow.index
    res.image = config.imagHost + res.image
    ctx.body =  res
})

router.get('/:index/previous', async (ctx)=>{
    let { index } = ctx.params
    if(!validator.isInt(index, {min:1,max:20})){
        throw new ParameterException()
    }
    index = parseInt(index) - 1
    const flow = await FlowModel.findOne({
        index
    })
    let res = await getData(flow.art_id, flow.type)
    res = JSON.parse(JSON.stringify(res))
    res.index = flow.index
    res.image = config.imagHost + res.image
    ctx.body =  res
})

router.get('/:type/:id', async (ctx)=>{
    let { type, id } = ctx.params
    type = parseInt(type)
    id = parseInt(id)
    const res = await getData(id, type)
    ctx.body = res
})

router.get('/:type/:art_id/favor', (new Auth(Auth.USER)).verify, async (ctx)=>{
    let { type, art_id } = ctx.params
    const favor = await FavorModel.where({
        type,
        art_id
    }).count()
    let uid = ctx.auth.uid
    const favor1 = await FavorModel.where({
        type,
        art_id,
        uid
    })
    ctx.body = {
        fav_nums: favor,
        id: art_id,
        like_status: favor1.length ? 1 : 0
    }
})

router.get('/favor', (new Auth(Auth.USER)).verify, async (ctx)=>{
    let { start, count } = ctx.query
    let uid = ctx.auth.uid
    const favor = await FavorModel.find({
        uid
    })
    let result = []
    for(let i = 0; i < favor.length; i++){
        let item = favor[i]
        let art_id = item.art_id
        let type = item.type
        let res = await getData(art_id, type)
        res = JSON.parse(JSON.stringify(res))
        res.image = config.imagHost + res.image
        result.push(res)
    }
    ctx.body = result

})




module.exports = router
