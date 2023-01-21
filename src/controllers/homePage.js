const Post = require("../models/postsSchema");

//app.get("/", 
module.exports = async (req, res) => {
  try {
    const posts = await Post.find({}).lean();
    return res.render("home", {
      posts
    });
  } catch (e) {
    return res.send(e.message);
  }
};