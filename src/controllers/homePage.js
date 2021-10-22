const Post = require("../models/postsSchema");

//app.get("/", 
module.exports = async (req, res) => {
    const posts = await Post.find({}).lean();
    //const formatted_date = moment(posts.createdAt).format('YYYY-MM-DD')
    res.render("home", {
      posts
    });
  }