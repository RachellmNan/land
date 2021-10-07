// 处理和服务器的网络请求
const config = require('../config')
// const { Http } = require('./http')
// const { test } = require('./test')
const { Storage } = require('../models/storage')

function promisic(fn){
    return  function(params){
        return new Promise((reslve, reject)=>{
            Object.assign(params,{
                success:res=> {
                    let code = res.statusCode.toString()
                    console.log('返回结果: ',res)
                    if(code.startsWith('2')){
                        reslve(res.data)
                    }else{
                        if(res.data.msg == 'token已过期' && res.statusCode == '403'){
                            console.log(3)
                            wx.login({
                                success:async (res)=>{
                                    console.log(res)
                                    let tokenObj =  await getApp().globalData.http._request({
                                        url: '/token',
                                        method:'POST',
                                        data:{
                                            code: res.code
                                        }
                                    })
                                    console.log('令牌刷新', tokenObj)
                                    let token = tokenObj.token
                                    Storage.setItem('token',token)
                                }
                            })
                            return
                        }
                        reject()
                        let err_code = res.data.error_code
                        _showErr(err_code)
                    }
                },
                fail(err){
                    console.log(22)
                    reject(err)
                    _showErr(1)
                }
            })
            fn(params)
        })
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

function getHeight(height = 0){
    let res = wx.getSystemInfoSync()
    return px2rpx(res.windowWidth, res.windowHeight) - height
}

function px2rpx(scrrenWidth, scrrenHeight){
    return 750 * scrrenHeight / scrrenWidth
}


module.exports = {
    promisic,
    getHeight
}
