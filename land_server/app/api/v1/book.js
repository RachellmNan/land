const Router = require('koa-router')
const {HttpException, ParameterException} = require('../../../core/http-exception')
const validator = require('validator'); 
const mongoose = require('mongoose')
const Auth = require('../../../middlewares/auth');
const HotBookModel = mongoose.model('HotBook')
const router = new Router({
    prefix:'/v1/book'
})

router.post('/hot_list',new Auth(Auth.USER).verify, async (ctx,next)=>{
    let res =  await HotBookModel.create({
        index:999
    })
    ctx.body = res
})


module.exports = router