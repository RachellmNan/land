const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const { connect } =require('./app/db/index') 
const path = require('path')
const static = require('koa-static')

// 数据库连接后执行后续中间件
connect().then(()=>{
    // 全局异常处理
    app.use(catchError)
    app.use(bodyParser())
    app.use(static(path.join(__dirname,'./static')))
    // 路由的自动注册
    InitManager.init(app)
    // test 封装sss
    app.listen(3000)
})
