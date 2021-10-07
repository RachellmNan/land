const config = require("../config")
const { promisic } = require("./util")
import { Base64 } from 'js-base64'

function _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return 'Basic ' + base64
}

class Http{
    async request({url, data = {}, method = 'GET'}){
        return await promisic(wx.request)({
            header:{
                appkey: config.appkey
            },
            url: config.api_base_url + url,
            method,
            data
        })
    }
    async _request({url, data = {}, method = 'GET'}){
        console.log('此次请求的url: ',config.m_api_base_url + url)
            return await promisic(wx.request)({
                header:{
                    'content-type': 'application/json',
                    Authorization: _encode()
                },
                url: config.m_api_base_url + url,
                method,
                data
            })
        
    }
}

module.exports = {
    Http
}