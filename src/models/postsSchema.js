const mongoose = require('mongoose')
const marked = require("marked")
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

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
    },
    sanitizedHtml: {
        type: String

    }
    
})


postSchema.pre('validate', function(next){


    if(this.content){
        this.sanitizedHtml = dompurify.sanitize(marked(this.content))
    }

    next()
})


const Post = mongoose.model('Post', postSchema)
module.exports = Post

