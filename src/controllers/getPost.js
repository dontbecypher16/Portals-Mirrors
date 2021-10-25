const { post } = require("jquery");
const Post = require("../models/postsSchema");

//app.get("/posts/:id", 

module.exports = async (req, res) => {
    const posts = await Post.findById(req.params.id).lean();
    res.render("singlepost", {
      posts,
    });
   
  }
  