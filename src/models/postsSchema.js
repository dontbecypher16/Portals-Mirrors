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

// postSchema.pre('validate', function(next){
//     if(this.content){
//         this.sanitizedHTML = DOMPurify.sanitize(marked(this.content))
//     }

//     next()
// })

const Post = mongoose.model('Post', postSchema)
module.exports = Post

