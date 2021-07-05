const config = require('../config/config')

class Http{
    static request({url, data={}, method="get"}){
        return new Promise((resolve,reject)=>{
            wx.request({
                url:config.api_base_url + url,
                data,
                method,
                header:{
                    "appkey": config.appkey,
                    "content-type": "application/json"
                },
                success(res){
                    resolve(res.data)
                },
                fail(err){
                    reject(err)
                }
            })
        })
    }
}

module.exports = Http