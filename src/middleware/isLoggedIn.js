const User = require('../models/userSchema')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (user) {
            res.locals.isLoggedIn = true
        }

        next()
    })
}