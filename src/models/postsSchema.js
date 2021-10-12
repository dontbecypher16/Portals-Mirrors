const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['essay', 'poem']
    },
    content: {
        type: String
    },
    username: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date()
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post

