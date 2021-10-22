const Post = require('../models/postsSchema')

module.exports = async (req, res) => {
       await Post.findByIdAndUpdate(req.params.id, (error, post) => {
         if(error){
            res.status(500);
            res.redirect("/posts");
         }else{
             
                 post.title = req.body.title
                 post.description = req.body.description
                 post.category = req.body.category
                 post.content = req.body.content
                 postusername = req.body.username
                 post.createdAt = req.body.createdAt
            
             post.save((error, savedPost) => {
                 if(error){
                     res.status(500)
                 }
                
                 res.redirect('/')
             })
         }

         res.redirect('singlepost')

     }).lean()

}