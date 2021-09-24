const { ClassicModel } = require("../../models/classic")
const { Like } = require("../../models/like")
const { Storage } = require("../../models/storage")

// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classicModel:null,
        classic : null,
        isLike: true,
        maxIndex: null,
        likeCount:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this._init()
    },
    
    async _init(){
        const classicModel = new ClassicModel()
        const res = await classicModel.getLatest()
        Storage.setItem('classic'+res.index, res)
        
        this.setData({
            classic: res,
            classicModel,
            maxIndex: res.index,
        })
        this._getLikeDetail()
        console.log('res:', res)
    },

    async _getLikeDetail(){
        const LikeModel = new Like()
        let like_res = await LikeModel.getLikeCount(this.data.classic.type, this.data.classic.id)
        let isLike = like_res.like_status
        let likeCount = like_res.fav_nums
        let storage = Storage.getItem('classic'+this.data.classic.index)
        storage.fav_nums = likeCount
        storage.like_status = isLike
        Storage.setItem('classic'+this.data.classic.index, storage)
        this.setData({
            isLike,
            likeCount
        })
    },
    
    async changeLike(event){
        let likeStatus  = event.detail.isLike
        let likeModel = new Like()
        if(!likeStatus){
            await likeModel.dolike(this.data.classic.type, this.data.classic.id)
        }else{
            await likeModel.cancelLike(this.data.classic.type, this.data.classic.id)
        }
        await this._getLikeDetail()
    },

    async changeClassic(event){
        const tip = event.detail.tip
        let res
        
        if(tip == 'next'){
            let index = this.data.classic.index + 1
            let storageItem = Storage.getItem('classic'+index)
            if(storageItem){
                res = storageItem
            }else{
                res = await this.data.classicModel.getNext(this.data.classic.index)
                Storage.setItem('classic'+res.index, res)
            }
        }else{
            let index = this.data.classic.index - 1
            let storageItem = Storage.getItem('classic'+index)
            if(storageItem){
                res = storageItem
            }else{
                res = await this.data.classicModel.getPrevious(this.data.classic.index)
                Storage.setItem('classic'+res.index, res)
            }
        }
        this.setData({
            classic: res
        })
        this._getLikeDetail()
        console.log('res:', res)
    },

    getDatafromStroge(){

    },

    onShareAppMessage: function () {
    }
})