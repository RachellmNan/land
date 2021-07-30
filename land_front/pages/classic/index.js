// index.js
// 获取应用实例
const app = getApp()
let config = require('../../config')
const Http = require('../../utils/http')

Page({
    async onGetPaper(){
        let res
        try {
            res = await Http.request({
                url: '/classic/latest'
            })
            console.log('gg',res)
        } catch (error) {
            console.log('res: ',error)
        }
        
        // res = await Http.request({
        //         url: '/classic/latest'
        //     })

        // console.log('res: ',res)
    }
})
