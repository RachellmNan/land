var mongoose = require('mongoose')
let fs = require('fs')

// 导入 model
const dirs = fs.readdirSync(__dirname + '/Schemas')
dirs.forEach((file)=>{
    require(`${__dirname}/Schemas/${file}`)
})

const connectMongoose = ()=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect('mongodb://127.0.0.1:27017/land')
        mongoose.connection.on('open', ()=>{
            resolve()
            console.log('连接数据库成功')
        })
    })
}

module.exports = {
    connectMongoose
}