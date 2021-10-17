const Post = require("../models/postsSchema");

//app.post("/posts", 


module.exports = (req, res) => {
  Post.create(req.body, (error, posts) => {
    if (error) {
      res.status(500);
      res.redirect("/posts");
    } 
    res.redirect("/");
  });
};