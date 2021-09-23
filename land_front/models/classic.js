const { Http } = require("../utils/http");

class ClassicModel extends Http{
    async getLatest(){
        return await this.request({
            url:"/classic/2/previous"
        })
    }
}

module.exports = {
    ClassicModel
}