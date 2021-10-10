const { Http } = require("../utils/http");

class Like extends Http{
    async dolike(type, art_id){
        return await this._request({
            url: '/like',
            method: 'post',
            data:{
                type,
                art_id
            }
        })
    }
    async dolikeBook(type, art_id){
        return await this._request({
            url: '/like',
            method: 'post',
            data:{
                type,
                art_id
            }
        })
    }

    async cancelLike(type, art_id){
        return await this._request({
            url: '/like/cancel',
            method:'post',
            data:{
                type,
                art_id
            }
        })
    }
    async cancelLikeBook(type, art_id){
        return await this._request({
            url: '/like/cancel',
            method:'post',
            data:{
                type,
                art_id
            }
        })
    }

    async getLikeCount(type, id){
        
        return await this._request({
            url: `/classic/${type}/${id}/favor`
        })
    }

    async getBookLikeCount(book_id){
        return await this._request({
            url: `/book/${book_id}/favor`
        })
    }
}

module.exports = {
    Like
}