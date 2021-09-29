
// components/LikeItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        classic:{
            type:Object,
            value:{}
        }
    },

    observers:{
        'classic.type': function(type){
            let title 
            if(type == 200){
                title = '音乐' 
            }else if(type == 300){
                title = '诗句'                
            }else{
                title = '电影'
            }
            this.setData({
                title
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        async likeStatus(event){
            let type = event.currentTarget.dataset.type
            let id = event.currentTarget.dataset.id
            this.triggerEvent('likeStatus',{
                info:{
                    type,
                    id
                }
            },{
                bubbles: true,
                composed: true
            })
        }
    }
})
