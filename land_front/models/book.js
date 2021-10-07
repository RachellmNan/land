const { Http } = require("../utils/http");

class BookModel extends Http{
    async getHot(){
        return await this._request({
            url: '/book/hot_list'
        })
    }

    async getComment(book_id){
        return await this._request({
            url: `/book/${book_id}/short_comment`
        })
    }

    async getHotSearch(){
        return await this._request({
            url: `/book/hot_keyword`
        })
    }

    async searchBook(q,summary=1,start=0,count=20){
        console.log('搜索内容:', q)        
        return await this._request({
            url : '/book/search',
            data:{
                q,
                start,
                count,
                summary
            }
        })
    }

    async getDetail(id){
        return await this._request({
            url: `/book/${id}/detail`
        })
    }

    async addComment(book_id, content){
        return await this._request({
            url: '/book/add/short_comment',
            method: 'post',
            data:{
                book_id,
                content
            }
        })
    }
}

module.exports = {
    BookModel
}