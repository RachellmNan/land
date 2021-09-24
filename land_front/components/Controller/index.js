// components/Controller/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        content:{
            type: String,
            value: ''
        },
        maxIndex:{
            type: Number,
            value: 1
        },
        currentIndex:{
            type: Number,
            value:1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        minIndex: 1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        next(event){
            if(this.data.currentIndex == this.data.maxIndex ){
                return 
            }
            this.triggerEvent('tip',{
                tip: event.currentTarget.dataset.tip
            })
        },
        previous(event){
            if(this.data.currentIndex == this.data.minIndex){
                return 
            }
            this.triggerEvent('tip',{
                tip: event.currentTarget.dataset.tip
            })
        }
    }
})
