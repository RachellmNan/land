const Router = require('koa-router')
const mongoose = require('mongoose')
const validator = require('validator')
const { ParameterException } = require('../../../core/http-exception')
const Auth = require('../../../middlewares/auth')
const FavorModel = mongoose.model('Favor')

const router = new Router({
    prefix:'/v1/like'
})

router.post('/like', new Auth(Auth.USER).verify ,async (ctx,next)=>{
    let {type, art_id} = ctx.request.body
    let res = await FavorModel.findOne({
        uid: ctx.auth.uid
    })
    if(!res){
        res = await FavorModel.create({
            uid:ctx.auth.uid,
            type,
            art_id
        })
    }

})

module.exports = router