const Post = require('../models/postsSchema')

module.exports = async (req, res) => {
    const post = await Post.findById(req.param.id).lean()
    res.redirect("edit", {
        post
    })



}