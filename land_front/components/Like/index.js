// components/Like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isLike:{
            type: Boolean,
            value: true
        },
        count:{
            type: Number,
            value: 1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        Like: '/assets/imgs/like.png',
        disLike: '/assets/imgs/unlike.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeLike(){
            this.triggerEvent('likeStatus',{
                isLike:!this.data.isLike
            })
        }
    }
})
