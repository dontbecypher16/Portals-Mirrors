const Post = require("../models/postsSchema");

//app.post("/posts", 


module.exports = async (req, res) => {
  try {
    await Post.create(req.body)
    res.redirect("/");
  } catch (e) {
    res.redirect("/posts");
  }
};