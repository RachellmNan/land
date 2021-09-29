const { ClassicModel } = require("../../models/classic")
const { Like } = require("../../models/like")
const { getHeight } = require("../../utils/util")

// pages/my/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const scrollHeight =  getHeight(560)
        this.authorizeCheck()
        this.setData({
            scrollHeight
        })
    },
    async onShow(){
        const classic = new ClassicModel()
        const favor = await classic.getFavor()
        console.log('favor: ', favor)
        let res = await wx.getUserProfile()
        let res1 = await wx.getUserInfo()
        console.log('用户信息getUserProfile', res)
        console.log('用户信息getUserInfo', res1)
        this.authorizeCheck()
        this.setData({
            favor
        })
    },

    async authorizeCheck(){
        let settings =  await wx.getSetting()
        console.log('用户授权的权限: ', settings)
    },

    async likeStatus(event){
        let type = event.detail.info.type
        let id = event.detail.info.id
        const likeModel = new Like()
        let res = await likeModel.cancelLike(type,id)
        console.log('取消点赞',res)
        this.onShow()
    },
    async login(){
        let res = await wx.getUserProfile({
            desc:'ss'
        })
        let res1 = await wx.getUserInfo()
        console.log('用户信息getUserProfile', res)
        console.log('用户信息getUserInfo', res1)
    },
    async getuserinfo(event){
        console.log(event.detail)
    }
})