// app.js
const { Http } = require('./utils/http')
App({
    async onLaunch() {
        // let storage =  wx.getStorageSync('classic8')
        // console.log('storage: ', storage)
        // let res = await wx.openSetting()
        
    },

    onError(err){
        console.log('错误: ', err)
    },


    globalData: {
      userInfo: null,
      http: new Http()
    }
  })
  