const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }, (error, user) => {
        if (error) {
            console.log(error)
            res.status(500)
             res.redirect('/auth/register')
        }else{
            const savedUser = user.save()
            res.redirect("/")

        }
        
    })
}


// bcrypt.hash(user.password, 10, function (error, encrypted) {
//     user.password = encrypted
// })