const Router = require('koa-router')
const mongoose = require('mongoose')
const validator = require('validator')
const { ParameterException, likeError, DislikeError } = require('../../../core/http-exception')
const Auth = require('../../../middlewares/auth')
const { getData } = require('../../db')
const FavorModel = mongoose.model('Favor')

const router = new Router({
    prefix:'/v1'
})

router.post('/like', new Auth(Auth.USER).verify ,async (ctx,next)=>{
    let {type, art_id} = ctx.request.body
    let res = await FavorModel.findOne({
        uid: ctx.auth.uid,
        type,
        art_id
    })  
    if(!res){
        let res = await getData(art_id, type)
        if(!res){
            throw new ParameterException()
        }
        await FavorModel.create({
            uid:ctx.auth.uid,
            type,
            art_id
        })
        
        res.fav_nums++
        await res.save()

        ctx.body = {
            msg:'点赞成功',
            data:res
        }
        return 
    }
    throw new likeError()
})

router.post('/dislike', new Auth(Auth.USER).verify ,async (ctx,next)=>{
    let {type, art_id} = ctx.request.body
    let res = await FavorModel.findOne({
        uid: ctx.auth.uid,
        type,
        art_id
    })  
    if(res){
        let result = await getData(art_id, type)
        if(!result){
            throw new ParameterException()
        }
        await FavorModel.deleteOne({
            uid: ctx.auth.uid,
            type,
            art_id
        })
        result.fav_nums--
        await result.save()

        ctx.body = {
            msg:'取消成功',
            data:result
        }
        return 
    }
    throw new DislikeError('取消点赞参数错误') 
})

module.exports = router