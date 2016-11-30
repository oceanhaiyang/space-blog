/**
 * Created by minyi on 2016/11/29.
 */
var express = require('express');
var router = express.Router();
var post = require('../db/post');
var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

router.route('/*')
    .post(function (req, res) {
        var blog = req.body;
        blog.post_markdown = marked(blog.post_markdown);
        post.createInfo(blog, function (err, blog) {
            if (err) {
                console.log('error');
            } else {
                console.log(blog);
                redirect('/');
            }
        })
    })
    .get(function (req, res) {
        var url = '/post' + req.url;
        post.findOne({post_url: url}, function (err, blog) {
            if (err) {
                console.log(err);
            } else {
                res.render('show', {blog: blog});
            }
        })
    });


module.exports = router;
