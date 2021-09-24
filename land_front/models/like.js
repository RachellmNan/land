const { Http } = require("../utils/http");

class Like extends Http{
    async dolike(type, art_id){
        return await this.request({
            url: '/like',
            method: 'post',
            data:{
                type,
                art_id
            }
        })
    }

    async cancelLike(type, art_id){
        return await this.request({
            url: '/like/cancel',
            method:'post',
            data:{
                type,
                art_id
            }
        })
    }

    async getLikeCount(type, id){
        return await this.request({
            url: `/classic/${type}/${id}/favor`
        })
    }
}

module.exports = {
    Like
}