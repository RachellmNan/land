const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const FlowModel = mongoose.model('Flow')
const Auth = require('../../../middlewares/auth');
const { getData } = require('../../db');

router.get('/classic',(ctx,next)=>{
    ctx.body = 'this is classic'
    console.log('this is classic')
})

router.get('/latest',new Auth(Auth.USER).verify,async (ctx)=>{
    let flow =  await FlowModel.find().sort({index: 'desc'}).limit(1)
    let art = await getData(flow[0].art_id, flow[0].type)
    art.index = flow[0].index
    ctx.body = art
})

module.exports = router  