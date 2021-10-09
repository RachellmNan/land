// 处理和服务器的网络请求
function _promisic(fn) {
    return function (params) {
        return new Promise((resolve, reject)=>{
            Object.assign(params, {
                success: res =>{
                    resolve(res)
                },
                fail: err=>{
                    reject(err)
                }
            })
            fn(params)
        })
    }
}


function getHeight(height = 0){
    let res = wx.getSystemInfoSync()
    return px2rpx(res.windowWidth, res.windowHeight) - height
}

function px2rpx(scrrenWidth, scrrenHeight){
    return 750 * scrrenHeight / scrrenWidth
}


module.exports = {
    _promisic,
    getHeight
}
