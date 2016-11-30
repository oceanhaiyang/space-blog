var express = require('express');
var post = require('../db/post');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  post.find({}, null, {skip: 1, limit:2}, function (err, blog) {
    if (err) {
      console.log(err);
    } else {
      console.log(blog);
      res.render('index');
    }
  });
});

module.exports = router;
