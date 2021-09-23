const config = require("../config")
const { promisic } = require("./util")

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
}



module.exports = {
    Http
}