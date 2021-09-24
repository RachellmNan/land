const { BookModel } = require("../../models/book")
const { getSystemInfo, getHeight } = require("../../utils/util")

// pages/book/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight:0,
        bookList: [],
        isSearch: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._init()
    },

    async _init(){
        let bookModel = new BookModel()
        let bookList = await bookModel.getHot()
        let hotWordList = (await bookModel.getHotSearch()).hot
        console.log('hotWords: ', hotWordList)
        console.log('bookList: ', bookList)
        let scrollHeight = getHeight(110)
        this.setData({
            scrollHeight,
            bookList,
            hotWordList
        })
    }
})