const Koa = require('koa')

const app = new Koa()
const bodyParser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

app.use(catchError)
app.use(bodyParser())
// 路由的自动注册
InitManager.init(app)

//test
app.listen(3000)