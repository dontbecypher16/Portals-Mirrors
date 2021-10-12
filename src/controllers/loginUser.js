const bcrypt = require('bcrypt')
const User = require('../models/userSchema')

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    // try to find the user
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    // store user session.
                    req.session.userId = user._id
                    res.redirect('/')
                    console.log({ Message: "Success"})
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
             res.redirect('/auth/login')
        }
    })
}


// @if(errors.length > 0)
//   <ul class="list-group">
//     @each(error in errors)
//       <li class="list-group-item text-danger">{{ error }}</li>
//     @endeach
//   </ul>
// @endif