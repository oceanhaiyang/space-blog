var express = require('express');
var post = require('../db/post');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  post.find({}, null, {skip: 0, limit:10}, function (err, blog) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {blog: blog});
    }
  });
});

module.exports = router;
