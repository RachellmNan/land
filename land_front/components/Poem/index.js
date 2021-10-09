const { Storage } = require("../../models/storage")

// components/Poem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index:{
            type: String,
            value: 1
        },
        type:{
            type:Number,
            value:100
        },
        title:{
            type: String,
            value:''
        },
        img:{
            type:String,
            value: ''
        },
        url:{
            type: String,
            value: ''
        },
        name:{
            type: String
        }
    },
    observers:{
        'index':function(index){
            let currentPlay = Storage.getItem('currentPlay')
            if(currentPlay){
                let status = currentPlay[index]
                let currentKey
                for(let i in currentPlay){
                    currentKey = i
                }
                if(!status){
                    this.setData({
                        playingStatus:false
                    })
                }else{
                    if(currentKey == index){
                        this.setData({
                            playingStatus:true
                        })
                    }
                }
            }
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        movie:'/assets/imgs/movie.png',
        poem: '/assets/imgs/poem.png',
        music: '/assets/imgs/music.png',
        isPlaying: '/assets/imgs/playing.png',
        pause:'/assets/imgs/pause.png',
        playingStatus:false,
        manager:null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async playMusic(){
            let manager = wx.getBackgroundAudioManager()
            wx.playBackgroundAudio({
                dataUrl: this.data.url,
                title: this.data.name,
                coverImgUrl: this.data.img
            })
            manager.onPause(()=>{
                this.setData({
                    playingStatus: false,
                    manager
                })
                Storage.setItem('currentPlay',{[this.data.index]:0})
            })
            this.setData({
                playingStatus: true
            })
            Storage.setItem('currentPlay',{[this.data.index]:1})
            manager.onPlay(()=>{
                this.setData({
                    playingStatus: true,
                    manager
                })
                Storage.setItem('currentPlay',{[this.data.index]:1})
            })
        },
        async pauseMusic(){
            Storage.setItem('currentPlay',{[this.data.index]:0})
            wx.pauseBackgroundAudio()
            // let manager = wx.getBackgroundAudioManager()
            this.setData({
                playingStatus: false
            })
        }
    }
})
