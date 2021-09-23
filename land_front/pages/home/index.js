const { ClassicModel } = require("../../models/classic")

// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classicModel : null,
        isLike: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this._init()
    },
    
    async _init(){
        const classicModel = new ClassicModel()
        this.setData({
            classicModel
        })
        const res = await classicModel.getLatest()
        console.log('res:', res)
    },
    
    changeLike(event){
        console.log('event', event.detail.isLike)
    },

    onShareAppMessage: function () {
    }
})