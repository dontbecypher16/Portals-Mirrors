const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['essay', 'poem']
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post

