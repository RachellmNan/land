const Router = require('@koa/router')
const mongoose = require('mongoose')
const FlowModel = mongoose.model('Flow')
const FavorModel = mongoose.model('Favor')
const validator = require('validator');
const { ParameterException } = require('../../../core/exception');
const { getData } = require('../../../core/util')
const router = new Router({
    prefix: '/v1/classic'
})

router.get('/latest', async (ctx)=>{
    const flow = await FlowModel.findOne().sort({index:'desc'}).limit(1)
    const res = await getData(flow.art_id, flow.type)
    ctx.body = {
        res
    }
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
    const res = await getData(flow.art_id, flow.type)
    ctx.body = {
        res
    }
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
    const res = await getData(flow.art_id, flow.type)
    ctx.body = {
        res
    }
})

router.get('/:type/:id', async (ctx)=>{
    let { type, id } = ctx.params
    type = parseInt(type)
    id = parseInt(id)
    const res = await getData(id, type)
    ctx.body = {
        res
    }
})

router.get('/:type/:id/favor', async (ctx)=>{
    let { type, art_id } = ctx.params
    const favor = await FavorModel.where({
        type,
        art_id
    }).count()
    ctx.body = {
        fav_nums: favor,
        id: art_id,
        like_status: 1
    }
})

router.get('/favor', async (ctx)=>{
    
})




module.exports = router
