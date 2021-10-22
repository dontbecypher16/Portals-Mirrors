const Post = require('../models/postsSchema')

module.exports = async (req, res) => {
      await Post.findById(req.params.id, (error, post) => {

         res.render('edit', {post: post})

     }).lean()

     res.redirect('/')
    
  };