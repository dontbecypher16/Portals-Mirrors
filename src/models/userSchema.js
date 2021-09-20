const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true, 
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true  
    },
    role: {
        type: String,
        enum: ["guest", "admin"],
        default: "admin"

    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }] 
    
})

const User = mongoose.model('User', userSchema)
module.exports = User