const Koa = require('koa')
const { connect } = require('mongoose')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const { connectMongoose } = require('./app/db')
const InitManager = require('./core/init')
const { handleException } = require('./middlewares/handelException')

connectMongoose().then(()=>{
    const app = new Koa()
    // 全局异常处理
    app.use(handleException)
    app.use(bodyParser())
    app.use(static(__dirname + '/static'))
    InitManager.init(app)
    app.listen(3000)
})