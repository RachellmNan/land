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

    async getFavor(start=1, count=20){
        return await this.request({
            url: '/classic/favor',
            data:{
                start,
                count
            }
        })
    }
}

module.exports = {
    ClassicModel
}