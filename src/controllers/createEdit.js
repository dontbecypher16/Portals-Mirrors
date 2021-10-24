const Post = require("../models/postsSchema");

module.exports = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    res.render("edit", { post: post });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.redirect(`/edit/${req.params.id}`);
  }
};
