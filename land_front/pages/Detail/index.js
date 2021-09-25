const { BookModel } = require("../../models/book")
const { Like } = require("../../models/like")
const { getHeight } = require("../../utils/util")

// pages/detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        BookDetail: {},
        comments:[],
        scrollHeight: 0,
        maskStatus: false,
        inputValue: '',
        likeCount: 1,
        likeStatus: false,
        showAll: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.showLoading({
            title:'加载中',
            mask:true,
        })
        let id = options.id
        let bookModel = new BookModel()
        let BookDetail = await bookModel.getDetail(id)
        let comments = (await bookModel.getComment(id)).comments
        let scrollHeight = getHeight(88)
        let likeObj = await this._getLikeStatusObj(id)
        console.log('likeObj:', likeObj)
        console.log(comments)
        this.setData({
            BookDetail,
            comments,
            scrollHeight,
            likeCount: likeObj.fav_nums,
            likeStatus: likeObj.like_status
        })
        wx.hideLoading()
        this.setData({
            showAll: true
        })
    },

    toComment(){
        this.setData({
            maskStatus: true
        })
    },

    cancelMask(){
        this.setData({
            maskStatus: false
        })
    },

    async inputConfirm(event){
        let value = event.detail.value
        if(value.length > 12){
            wx.showToast({
                title: '评论字数需小于12',
                icon: 'error'
            })
            return 
        }
        wx.showLoading({
            title:'评论发布中',
            mask:true,

        })
        let bookModel = new BookModel()
        let book_id = this.data.BookDetail.id
        let res = await bookModel.addComment(book_id, value)
        console.log('评论', res)
        let comments = (await bookModel.getComment(book_id)).comments
        console.log('comments',comments)
        this.setData({
            inputValue: '',
            comments
        })
        wx.hideLoading()
        wx.showToast({
            title: '评论成功',
            icon: 'success'
        })
    },

    async likeStatus(event){
        let isLike = event.detail.isLike
        const likeModel = new Like()
        if(isLike){
            await likeModel.cancelLike(400, this.data.BookDetail.id)
        }else{
            await likeModel.dolike(400, this.data.BookDetail.id)
        }
        let likeObj = await this._getLikeStatusObj(this.data.BookDetail.id)
        console.log('点赞的likeObj',likeObj)
        this.setData({
            likeCount: likeObj.fav_nums,
            likeStatus: likeObj.like_status
        })
    },

    async _getLikeStatusObj(id){
        const likeModel = new Like()

        return await likeModel.getBookLikeCount(id)  
    },

    async tagContent(event){
        wx.showLoading({
            title:'评论发布中',
            mask:true,
        })
        let value = event.currentTarget.dataset.content.content
        let bookModel = new BookModel()
        let book_id = this.data.BookDetail.id
        let res = await bookModel.addComment(book_id, value)
        console.log('评论', res)
        let comments = (await bookModel.getComment(book_id)).comments
        console.log('comments',comments)
        this.setData({
            inputValue: '',
            comments
        })
        wx.hideLoading()
        wx.showToast({
            title: '评论成功',
            icon: 'success'
        })
    },

    cancel(){
        this.setData({
            maskStatus: false
        })
    },

    onShareAppMessage: function () {
    }
})