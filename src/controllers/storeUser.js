const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')

module.exports = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }, (error, user) => {
        if (error) {
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
    
            req.flash('registrationErrors', registrationErrors)
            res.redirect('/auth/register')
        }else{

            res.redirect("/")

        }
        
    })
}




// bcrypt.hash(user.password, 10, function (error, encrypted) {
//     user.password = encrypted
// })