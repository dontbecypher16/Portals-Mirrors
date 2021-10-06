const User = require('../models/userSchema')

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            console.log(error)
             res.redirect('/auth/register')
        }

            res.redirect("/")
        
    })
}