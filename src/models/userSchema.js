const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
        
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


userSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
    })

    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User