const { Http } = require("../utils/http");

class Like extends Http{
    async dolike(){
        return await this.request({
            url: '/like'
        })
    }

    async cancelLike(){
        return await this.request({
            url: '/like/cancel'
        })
    }
}

module.exports = {
    Like
}