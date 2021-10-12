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
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            res.redirect('/auth/register')
            req.flash('registrationErrors', registrationErrors)
        }else{

            res.redirect("/")

        }
        
    })
}


// bcrypt.hash(user.password, 10, function (error, encrypted) {
//     user.password = encrypted
// })