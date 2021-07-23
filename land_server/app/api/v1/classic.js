const Router = require('koa-router')
const mongoose = require('mongoose')
const FlowModel = mongoose.model('Flow')
const FavorModel = mongoose.model('Favor')
const Auth = require('../../../middlewares/auth');
const { getData } = require('../../db');
const { routes } = require('./insert');

const router = new Router({
    prefix:'/v1/classic'
})

router.get('/',(ctx,next)=>{
    ctx.body = 'this is classic'
    console.log('this is classic')
})

router.get('/latest',new Auth(Auth.USER).verify,async (ctx)=>{
    let flow =  await FlowModel.find().sort({index: 'desc'}).limit(1)
    let art = await getData(flow[0].art_id, flow[0].type)
    let favor = await FavorModel.findOne({
        uid: ctx.auth.uid,
        type: art.type,
        art_id: art.art_id
    })
    
    art = JSON.parse(JSON.stringify(art))
    art.index = flow[0].index
    art.like_status = favor ? 1 : 0
    ctx.body = art
})

router.post('/:index/next', new Auth(Auth.USER).verify,async (ctx)=>{
    const { index }  = ctx.params
    let res = await FlowModel.findOne({
        index
    })
    let result = await getData(res.art_id, res.type)
    let favor = await FavorModel.findOne({
        uid: ctx.auth.uid,
        type: res.type,
        art_id: res.art_id
    })
    result = JSON.parse(JSON.stringify(result))
    result.index = res.index
    result.like_status = favor ? 1 : 0
    ctx.body = result
})

router.post('/:index/previous', new Auth(Auth.USER).verify,async (ctx)=>{
    const { index }  = ctx.params
    let res = await FlowModel.findOne({
        index
    })
    let result = await getData(res.art_id, res.type)
    let favor = await FavorModel.findOne({
        uid: ctx.auth.uid,
        type: res.type,
        art_id: res.art_id
    })
    result = JSON.parse(JSON.stringify(result))
    result.index = res.index
    result.like_status = favor ? 1 : 0
    ctx.body = result
})

router.post('/:type/:id/favor', new Auth(Auth.USER).verify, async (ctx)=>{
    const {type, id} = ctx.params
    let favor = await FavorModel.findOne({
        uid: ctx.auth.uid,
        art_id: id,
        type
    })
    let res = await getData(id, parseInt(type))
    ctx.body = {
        id,
        fav_nums: res.fav_nums,
        like_status: favor ? 1 : 0
    }
})

router.get('/favor', new Auth(Auth.USER).verify, async (ctx,next)=>{
    let favor = await FavorModel.find({
        uid: ctx.auth.uid,
        type:{
            $ne: 400
        }
    })
    let result = []
    for(let i of favor) {
        let res = await getData(i.art_id, i.type);
        result.push(res)
    }
    ctx.body = result
})

router.get('/:type/:id', async (ctx, next)=>{
    const {type, id} = ctx.params
    let res = await getData(id, parseInt(type))
    console.log('res: ',res)
    ctx.body = res
})

module.exports = router  