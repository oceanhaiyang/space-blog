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
    .get(function (req, res) {
        var url = req.url;
        post.findOne({post_url: url}, function (err, blog) {
            if (err) {
                console.log(err);
            } else {
                blog.view += 1;
                post.updateInfo(blog._id, {"view": blog.view}, function (err) {
                    if (err) {
                        return next(err);
                    }
                    blog.post_markdown = marked(blog.post_markdown);
                    res.render('show', {blog: blog});
                });


            }
        })
    });


module.exports = router;
