const Router = require('koa-router')
const validator = require('validator')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const bcrypt = require('bcryptjs');
const { ParameterException, NotFound, AuthFailed } = require('../../../core/http-exception')
const { LoginType } = require('../../lib/enum');
const { generateToken } = require('../../../core/util');
const Auth = require('../../../middlewares/auth');
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx)=>{
    const {account, password, type } = ctx.request.body
    const err_msgs = []
    
    if(!validator.isByteLength(account,{min: 6,max: 22})){
        err_msgs.push('账号不符合规则')
    }
    if(password && !validator.isByteLength(password, {min: 6, max: 128})){
        err_msgs.push('最少6个字符')
    }
    if(!type){
        err_msgs.push('type是必须参数')
    }
    if(type && !LoginType.isThisType(type)){
        err_msgs.push('type参数不合法')
    }
    if(err_msgs.length){
        throw new ParameterException(err_msgs)
    }
    console.log(123)
    let token
    switch (parseInt(type)) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(account, password)
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new ParameterException('没有对应的处理函数')
    }

    ctx.body = {
        msg: 'this is tooken',
        code: 20,
        token
    }
 })

async function emailLogin(email, password){
    const user = await UserModel.findOne({
        email
    })
    if(!user){
        throw new NotFound('该用户不存在')
    }
    const correct = bcrypt.compareSync(password, user.password)
    if(!correct){
        throw new AuthFailed('密码不正确')
    }
    // 返回 token
    return generateToken(user._id, Auth.USER)
}

module.exports = router
