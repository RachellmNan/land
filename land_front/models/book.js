const { Http } = require("../utils/http");

class BookModel extends Http{
    async getHot(){
        return await this.request({
            url: '/book/hot_list'
        })
    }

    async getComment(book_id){
        return await this.request({
            url: `/book/${book_id}/short_comment`
        })
    }

    async getHotSearch(){
        return await this.request({
            url: `/book/hot_keyword`
        })
    }

    async searchBook(q,start=0,count=20,summary=1){
        return await this.request({
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
        return await this.request({
            url: `/book/${id}/detail`
        })
    }

    async addComment(book_id, content){
        return await this.request({
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