const { getMeta } = require('../helpers')

const BaseSchema = {
    status: Number,
    id: Number,
    image: String,
    content: String,
    pubdate: String,
    fav_nums: {
        type: Number,
        default: 0
    },
    title: String,
    type: Number,
    meta: getMeta()
}

module.exports = BaseSchema