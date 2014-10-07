var router = require('express').Router()
var Post = require('../../models/post')

router.get('/posts', function (req, res, next) {
  Post.find()
  .sort('-date')
  .exec(function (err, posts) {
    if (err) { return next(err) }
    res.json(posts)
  })
})

router.post('/posts', function (req, res, next) {
  var post = new Post({
    username: req.body.username,
    body:     req.body.body,
  })
  post.save(function (err, post) {
    if (err) { return next(err) }
    res.status(201).json(post)
  })
})

module.exports = router
