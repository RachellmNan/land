const Router = require('koa-router')
const mongoose = require('mongoose')
const axios = require('axios')
const util = require('util')
const { Auth } = require('../../../middlewares/auth')
const { config } = require('../../../config/config')
const { AuthFailed } = require('../../../core/exception')
const { generateToken } = require('../../../core/util')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx)=>{
    const { code } = ctx.request.body
    const url = util.format(config.WX.url, config.WX.appId, config.WX.appSecret, code)
    const res = await axios.get(url)
    console.log(res)
    if(res.status !== 200){
        throw new AuthFailed('openid获取失败')
    }
    let errCode = res.data.errcode
    let errMsg = res.data.errmsg
    if(errCode == 40029){
        throw new AuthFailed('code 无效:'+ errMsg)
    }

    const UserModel = mongoose.model('User')
    let user = await UserModel.findOne({
        openid: res.data.openid
    })
    if(!user){
        user = await UserModel.create({
            openid: res.data.openid
        })
    }
    let token = generateToken(user._id, Auth.USER)
    ctx.body = {
        token
    }
})

router.post('/verify', async (ctx)=>{
    const { token } = ctx.request.body
    let isValid = Auth.verifyToken(token)
    ctx.body = {
        isValid
    }
})

module.exports = router