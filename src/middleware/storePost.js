module.exports = (req, res, next) => {
    if (!req.body.username || !req.body.title || !req.body.description || !req.body.category || !req.body.content) {
        res.redirect('/posts')
    }

    next()
}