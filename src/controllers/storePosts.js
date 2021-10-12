const Post = require("../models/postsSchema");

//app.post("/posts", 


module.exports = (req, res) => {
     Post.create(req.body, (error, posts) => {
      if (error) {
        console.log(error)
        res.status(500)
         res.redirect('/posts/new')
    }
      res.redirect("/");
    })
  }