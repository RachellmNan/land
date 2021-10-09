const config = require("../config")
const { _promisic } = require("./util")
import { Base64 } from 'js-base64'
const { Storage } = require('../models/storage')

function _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
}

class Http{
    async _request({url, data = {}, method = 'GET', refetch = true}){
        let res
        try {
            res = await _promisic(wx.request)({
                header:{
                    'content-type': 'application/json',
                    Authorization: _encode()
                },
                url: config.m_api_base_url + url,
                method,
                data
            })
        } catch (err) {
            _showErr(1)
            throw new Error(err.errMsg)
        }
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
            return res.data
        }else if(code == '403' && res.data.msg == 'token已过期'){
            if(refetch){
                
                return await Http._refetch({
                    url,
                    data,
                    method,
                    refetch:false
                })
            }
        }
        _showErr(1)
        throw new Error(res.data.msg)
    }

    static async _refetch(param) {
        let wx_code = await _promisic(wx.login)({})
        let tokenObj =  await getApp().globalData.http._request({
            url: '/token',
            method:'POST',
            data:{
                code: wx_code.code
            },
            refetch: false
        })
        let token = tokenObj.token
        Storage.setItem('token',token)
        return await getApp().globalData.http._request(param)
    }
}



const tips = {
    '1' : '抱歉出现了一个错误',
    '1005': 'appkey无效',
    '3000': '期刊不存在'
}

function _showErr(code = 1){
    const tip = tips[code]
    wx.showToast({
        title: tip?tip:tips[1],
        duration:2000,
        icon:"none"
    })
}

module.exports = {
    Http
}