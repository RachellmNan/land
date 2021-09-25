const { BookModel } = require("../../models/book")
const { Storage } = require("../../models/storage")
const { getSystemInfo, getHeight } = require("../../utils/util")

// pages/book/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight:0,
        bookList: [],
        isSearch: false,
        inputValue: '',
        storage: [],
        timer: ''
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
        this._initWords()
        this.setData({
            scrollHeight,
            bookList,
            hotWordList
        })
    },
    async input_confirm(event){
        let searchValue = event.detail.value
        this._updateWord(searchValue)

        this.searchBook(searchValue)
    },
    _initWords(){
        let storage = Storage.getItem('search_key')
        this.setData({
            storage
        })
    },
    _updateWord(searchValue){
        Storage.setArrayItem('search_key', searchValue)
        let storage = Storage.getItem('search_key')
        this.setData({
            storage
        })
    },
    goDetail(event){
        let id = event.detail.id
        wx.navigateTo({
            url: `/pages/detail/index?id=${id}`
        })
    },
    showSearch(){
        this.setData({
            isSearch: true
        })
    },
    closeSearch(){
        this.setData({
            isSearch: false
        })
    },
    searchFromTag(event){
        let searchValue = event.currentTarget.dataset.value
        this._updateWord(searchValue)
        this.setData({
            inputValue: searchValue
        })
    },
    clearSearch(){
        this.setData({
            inputValue: ''
        })
    },
    onInput(event){
        let value = event.detail.value
        this.debunce(this.searchBook,1000)(value)
        
    },
    
    debunce(fn,delay){
        let  timer = this.data.timer
        return (searchValue)=>{
            if(timer){
                clearTimeout(timer)
            }
            this.data.timer = setTimeout(()=>{
                fn.apply(this,[searchValue])
            },delay)
        }
    },

    async searchBook(searchValue){
        console.log(searchValue)
        let bookModel = new BookModel()
        let res = await bookModel.searchBook()
        console.log(res)
    },
    onHide(){
        setTimeout(()=>{
            this.closeSearch()
        },500)
    }
})