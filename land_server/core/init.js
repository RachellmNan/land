const requireDirectory = require('require-directory')



class InitManager{

    static init(app){
        this.app = app
        this._initLoadRouters(app)
    }

    static _initLoadRouters(app){
        const apiDirectoryPath = process.cwd() + '/app/v1'
        requireDirectory(module, apiDirectoryPath, {visit: visitor})
        function visitor(router){
            app.use(router.routes())
        }
    }
}

module.exports = InitManager
