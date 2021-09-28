const { Http } = require("../utils/http")
const { BookModel } = require("./book")

class Paging{
    count
    start
    req
    accumulator = []
    locker = false
    moreData = true
    url
    constructor(url,q, summary=1,start=0,count=20){
        this.url = url
        this.start = start
        this.count = count
        this.q = q
        this.summary = summary
    }

    async getMoreData(){
        // 是否有数据
        if(!this.moreData){
            return
        }
        console.log('hasMoreData')
        // 是否上锁
        if(!this._getLocker()){
            return
        }
        console.log('noLocker')
        // 请求数据
        let http = new Http()
        const paging = await http.request({
            url : this.url,
            data:{
                q: this.q,
                start: this.start,
                count: this.count,
                summary: this.summary
            }
        })
        if(!paging.total){
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = (this.start + this.count) < paging.total
        if(this.moreData){
            this.start += this.count
        }
        this.accumulator = this.accumulator.concat(paging.books)
        // 释放锁
        this._releaseLocker()
        return {
            empty: false,
            items:paging.books,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
        
    }
    _getLocker(){
        if(this.locker){
            return false
        }
        this.locker = true
        return true
    }
    _releaseLocker(){
        this.locker = false
    }

}

module.exports = {
    Paging
}