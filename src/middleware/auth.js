const User = require('../models/userSchema')

module.exports = (req, res) => {
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
             res.redirect('/')
        }

        
    })
}