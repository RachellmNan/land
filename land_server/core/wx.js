const util = require('util')
const config = require('../config/configs')
const axios = require('axios')
const { AuthFailed } = require('./http-exception')
const mongoose = require('mongoose')
const { generateToken } = require('./util')
const Auth = require('../middlewares/auth')
const UserModel = mongoose.model('User')

class WXManager{ 
    static async codeToToken(code){
        const url = await util.format(config.WX.url, config.WX.appId, config.WX.appSecret, code)
        const result = await axios.get(url)
        if(result.status !== 200){
            throw new AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if(errcode == 40029){
            throw new AuthFailed('code 无效: ' + errcode)
        } 
        let user = await UserModel.findOne({
            openid: result.data.openid
        })
        if(!user){
            user = await UserModel.create({
                openid: result.data.openid,
            })
        }
        return generateToken(user._id, Auth.USER)
    }
}

module.exports = WXManager