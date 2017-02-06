/**
 * Created by minyi on 2017/1/22.
 */
var express = require('express');
var router = express.Router();
var Post = require('../db/post');
var __ = require('underscore');
var _ = require('lodash');

router.get('/', function (req, res, next) {
  Post.find({}, function (err, posts) {
    if (err) {
      return next(err);
    }
    var tags = [];
    posts.forEach(function (post) {
      tags = tags.concat(post.tags);
    });
    tags = _.uniq(tags);
    console.log(tags);
    res.render('tags/index', {tags: tags});
  });
});

router.get('/:tag', function (req, res, next) {
  var tag = req.params.tag;

  Post.find({tags: tag}, function (err, posts) {
    if (err) {
      return next(err);
    }
    res.render('tags/tag', {title: tag, blog: posts});
  })
});

module.exports = router;