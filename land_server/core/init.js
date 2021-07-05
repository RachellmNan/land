const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager{
    static init(app){
        this.app = app
        this._loadModules(app)
    }
    static _loadModules(app){
        function whenLoadModules(module){
            if(module instanceof Router){
                app.use(module.routes())
            }
        }
        // 所需导入路由的路径
        const apiDirectory = process.cwd() + '/app/api/v1'
        requireDirectory(module, apiDirectory, {
            visit:whenLoadModules
        })
    }
}

module.exports = InitManager