const Post = require('../models/postsSchema')

module.exports = async (req, res) => {
     await Post.findByIdAndDelete(req.params.id)
    res.redirect("/")



}