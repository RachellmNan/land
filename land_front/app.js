// app.js
App({
    async onLaunch() {
        let storage =  wx.getStorageSync('classic8')
        console.log('storage: ', storage)
        // let res = await wx.openSetting()
        
    },
    globalData: {
      userInfo: null
    }
  })
  