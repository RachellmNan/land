const Router = require('koa-router')
const validator = require('validator')
const { ParameterException } = require('../../../core/http-exception')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async (ctx)=>{
    const {email, password1, password2,nickname} = ctx.request.body
    const err_msgs = []
    if(!validator.isEmail(email)){
        err_msgs.push('电子邮箱不符合规范，请输入正确的邮箱')
    }
    if(!validator.isByteLength(password2,{min: 6,max: 22})){
        err_msgs.push('密码至少6个字符，最多22个字符')
    }
    if(!validator.matches(password2,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/)){
        err_msgs.push('密码长度必须在6~22位之间，包含字符、数字和 _')
    }
    if(!validator.isByteLength(nickname,{min: 4,max: 32})){
        err_msgs.push('长度不够')
    }
    if(password1 != password2){
        err_msgs.push('两次输入的密码不一致，请重新输入')
    }
    if(err_msgs.length>0){
        throw new ParameterException(err_msgs)
    }
    const isRepeat =  await UserModel.findOne({
        email
    })
    if(isRepeat){
        err_msgs.push('该邮箱已被组册')
        throw new ParameterException(err_msgs)
    }
    const user = new UserModel({
        nickname,
        password:password2,
        email,
        openid:''
    })
    const res = await user.save()
    ctx.body = {
        code:1,
        data:res,
        msg:'添加成功'
    }
})

module.exports = router