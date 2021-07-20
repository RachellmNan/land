const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router({
    prefix:'/insert'
})

const MovieModel = mongoose.model('Movie')
const MusicModel = mongoose.model('Music')
const SentenceModel = mongoose.model('Sentence')
const HotBookModel = mongoose.model('HotBook')
const FlowModel = mongoose.model('Flow')

router.get('/movie', async (ctx)=>{
    // const { status, image, content, pubdate, fav_nums, title, type } = ctx.request.body
    await MovieModel.create({
        status: 1,
        id:2,
        image: 'images/movie4.png',
        content:'在变换的生命里，岁月原来是最大的小偷',
        pubdate: '2018-06-22',
        fav_nums: 46,
        title: '罗启锐《岁月神偷》',
        type: 100
    })
})

router.get('/music', async (ctx)=>{
    // const { status, image, content, pubdate, fav_nums, title, type } = ctx.request.body
    await MusicModel.create({
        status: 1,
        id:4,
        image: 'images/music5.png',
        content:'许多人来来去去，相聚又别离',
        url:'http://music.163.com/song/media/outer/url?id=26427662.mp3',
        pubdate: '2018-06-22',
        fav_nums: 68,
        title: '好妹妹 《一个人的北京》',
        type: 200
    })
})

router.get('/sentence', async (ctx)=>{
    // const { status, image, content, pubdate, fav_nums, title, type } = ctx.request.body
    await SentenceModel.create({
        status: 1,
        id:2,
        image: 'images/sentence2.png',
        content:'这个夏天又是一个毕业季',
        pubdate: '2018-06-22',
        fav_nums: 33,
        title: '未名',
        type: 300
    })
})

router.get('/hotbook', async(ctx)=>{
    await HotBookModel.create({
        status: 1,
        id:51664,
        index:20,
        image: 'https://img3.doubanio.com/lpic/s29034294.jpg',
        author:'[日]新井一二三', 
        title: '东京时味记'
    })
})

router.get('/flow', async (ctx)=>{
    // const { status, image, content, pubdate, fav_nums, title, type } = ctx.request.body
    await FlowModel.create({
        status: 1,
        id:8,
        index:5,
        type: 200,
        art_id: 4
    })
})

router.get('/update', async (ctx)=>{
    let res = await MovieModel.findOne({
        id:1
    })
    res.title = '李安《饮食男女》'
    await res.save()
    ctx.body = res
})

module.exports = router