const Post = require("../models/postsSchema");

//app.get("/", 
module.exports = async (req, res) => {
    const posts = await Post.find({}).lean();
   return res.render("home", {
      posts
    });
  }