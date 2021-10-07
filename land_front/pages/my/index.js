const { ClassicModel } = require("../../models/classic")
const { Like } = require("../../models/like")
const { Storage } = require("../../models/storage")
const { Http } = require("../../utils/http")
const { getHeight, promisic } = require("../../utils/util")

// pages/my/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight: 0,
        loginStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const scrollHeight =  getHeight(560)
        // this.authorizeCheck()
        this.setData({
            scrollHeight
        })
        let loginStatus =  Storage.getItem('token')
        if(loginStatus){
            this.setData({
                loginStatus
            })
        }
    },
    async onShow(){
        const classic = new ClassicModel()
        if(!this.data.loginStatus){
            return 
        }
        const favor = await classic.getFavor()
        this.setData({
            favor
        })
    },

    async likeStatus(event){
        let type = event.detail.info.type
        let id = event.detail.info.id
        const likeModel = new Like()
        let res = await likeModel.cancelLike(type,id)
        console.log('取消点赞',res)
        this.onShow()
    },

    async onLogin(){
        await wx.getUserProfile({
            desc: '授权登录'
        })
        wx.login({
            success:async (res)=>{
                let tokenObj =  await (new Http())._request({
                    url:'/token',
                    method:'POST',
                    data:{
                        code: res.code
                    }
                })
                let token = tokenObj.token
                Storage.setItem('token',token)
            }
        })
        this.setData({
            loginStatus: true
        })
    },
    goDetail(event){
        console.log(2)
    }
})