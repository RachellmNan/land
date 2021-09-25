class Storage{
    static getItem(key){
        return wx.getStorageSync(key)
    }
    static setItem(key,value){
        wx.setStorageSync(key, value)
    }
    static setArrayItem(key, value){
        let storage = this.getItem(key)
        if(storage){
            let index = storage.findIndex((item)=>item == value)
            if(index>=0){
                storage.splice(index,1)
            }
            storage.unshift(value)
            if(storage.length > 10){
                storage.pop()
            }
            this.setItem(key, storage)
        }else{
            this.setItem(key, [value])
        }

    }
}

module.exports = {
    Storage
}