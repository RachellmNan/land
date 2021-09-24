class Storage{
    static getItem(key){
        return wx.getStorageSync(key)
    }
    static setItem(key,value){
        wx.setStorageSync(key, value)
    }
}

module.exports = {
    Storage
}