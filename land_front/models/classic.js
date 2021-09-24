const { Http } = require("../utils/http");

class ClassicModel extends Http{
    async getLatest(){
        return await this.request({
            url:"/classic/latest"
        })
    }

    async getNext(index){
        return await this.request({
            url: `/classic/${index}/next`
        })
    }

    async getPrevious(index){
        return await this.request({
            url: `/classic/${index}/previous`
        })
    }
}

module.exports = {
    ClassicModel
}