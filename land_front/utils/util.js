function promisic(fn){
    return  function(params){
        return new Promise((reslve, reject)=>{
            Object.assign(params,{
                success:res=> {
                    let code = res.statusCode.toString()
                    if(code.startsWith('2')){
                        reslve(res.data)
                    }else{
                        reject()
                        let err_code = res.data.error_code
                        _showErr(err_code)
                    }
                },
                fail(err){
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



module.exports = {
    promisic
}
