const { Http } = require("../utils/http");

class BookModel extends Http{
    async getHot(){
        return await this.request({
            url: '/book/hot_list'
        })
    }

    async getCommentCount(book_id){
        return await this.request({
            url: `/book/${book_id}/short_comment`
        })
    }

    async getHotSearch(){
        return await this.request({
            url: `/book/hot_keyword`
        })
    }
}

module.exports = {
    BookModel
}