const { BookModel } = require("../../models/book")
const { Paging } = require("../../models/paging")
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
        timer: '',
        searchResult:[],
        paging:'',
        moreData: true
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
            isSearch: false,
            searchResult: [],
            inputValue: ''
        })
    },
    searchFromTag(event){
        let searchValue = event.currentTarget.dataset.value
        this._updateWord(searchValue)
        this.searchBook(searchValue)
        this.setData({
            inputValue: searchValue
        })
    },
    clearSearch(){
        this.setData({
            inputValue: '',
            searchResult: []
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
        const paging = new Paging('/book/search',searchValue)
        let res = await paging.getMoreData()
        if(!res.accumulator.length){{
            wx.showToast({
                title:'不存在该图书',
                icon:'error'
            })
            return
        }}
        // let bookModel = new BookModel()
        // let res = await bookModel.searchBook(searchValue)
        this.setData({
            searchResult: res.accumulator,
            paging,
            moreData: res.moreData
        })
        console.log(res)
    },
    onHide(){
        setTimeout(()=>{
            this.closeSearch()
        },500)
    },
    async onReachBottom(){
        const paging = this.data.paging
        let res = await paging.getMoreData()
        console.log('加载新数据: ', res)
        if(res){
            this.setData({
                searchResult: res.accumulator,
                moreData: res.moreData
            })
        }
    },
    scrolltolower(){
        this.onReachBottom()
    }
})