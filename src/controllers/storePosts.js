const Post = require("../models/postsSchema");

//app.post("/posts", 


module.exports = (req, res) => {
    Post.create(req.body, (error, posts) => {
      res.redirect("/");
    });
  }