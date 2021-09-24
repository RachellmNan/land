const { BookModel } = require("../../models/book")

// components/BookItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book:{
            type: Object,
            value:{
                author:''
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        commentCount: 1
    },

    // observers:{
    //     'book':async function (book){
    //         let bookModel = new BookModel()
    //         let res = await bookModel.getCommentCount(book.id)
    //         console.log('commentCount: ', res)
    //     }
    // },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
