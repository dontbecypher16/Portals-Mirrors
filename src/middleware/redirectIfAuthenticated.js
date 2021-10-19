const User = require('../models/userSchema')

module.exports = (req, res, next) => {
    if (req.session.userId) {
         return res.redirect('/')
    }

    next()
}