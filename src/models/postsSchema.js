const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    _author: {
        type: Number,
        ref: 'User'
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    category: {
        type: String,
        enum: ['essay', 'poem']
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post

