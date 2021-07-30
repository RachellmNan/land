const config = require('../config')

const tips ={
    1:'抱歉出现了一个错误',
    1005:'appkey无效',
    3000:'期刊不存在'
  }

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
                success: res=>{
                    console.log('rr',res)
                    let code = res.statusCode.toString()
                    if(code.startsWith('2')){
                        resolve(res.data)
                    }else{
                        // reject(res.data)
                        resolve({m:3})
                        this._show_error(res.data.error_code)
                    }
                    console.log(3)
                },
                fail(err){
                    reject(err)
                    this._show_error(1)
                }
            })
        })
    }
    static _show_error(error_code){
        if(!error_code){
          error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
          title:tip?tip:tips[1],
          duration:2000,
          icon:'none'
        })
      }
}

module.exports = Http