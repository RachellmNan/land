let fs = require('fs')
const mongoose = require('mongoose')

// 导入所有的Schema
const dirs = fs.readdirSync(__dirname+'/Schemas')
dirs.forEach(file=>{
    require(`${__dirname}/Schemas/${file}`)
})

const MovieModel = mongoose.model('Movie')
const MusicModel = mongoose.model('Music')
const SentenceModel = mongoose.model('Sentence')

async function getData(art_id, type) {
    let art
    const finder = {
        id: art_id
    }
    switch (type) {
        case 100:
            art = MovieModel.findOne(finder)
            break;
        case 200:
            art = MusicModel.findOne(finder)
            break;
        case 300:
            art = SentenceModel.findOne(finder)
            break;
        case 400:
            break;
        default:
            break;
    }
    return art
}

const connect = () => {
    return new Promise((resolve)=>{
        // 连接数据库
        mongoose.connect('mongodb://127.0.0.1:27017/land')
        // 监听数据库被打开
        mongoose.connection.on('open',()=>{
            console.log('连接数据库成功') 
            resolve()
        })
    })
}

module.exports = {
    connect,
    getData
}

