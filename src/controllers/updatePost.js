const { post } = require('jquery')
const Post = require('../models/postsSchema')

module.exports = async (req, res) => {
    console.log(req.params.id)

    try{
        let doc = {}
        doc.title = req.body.title
        doc.description = req.body.description
        doc.category = req.body.category
        doc.content = req.body.content
        doc.username = req.body.username
        doc.createdAt = req.body.createdAt

        await Post.findByIdAndUpdate(req.params.id, doc).lean()
    
        res.redirect(`/posts/${id}`)
   

    }catch(e){
        console.error(e)
        res.status(500)
        res.redirect('/')
    }
    

}