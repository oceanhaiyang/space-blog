/**
 * Created by minyi on 2016/11/29.
 */
var express = require('express');
var router = express.Router();
var post = require('../db/post');

router.route('/')
    .post(function (req, res) {
        var blog = req.body;
        post.createInfo(blog, function (err, blog) {
            if (err) {
                console.log('error');
            } else {
                console.log(blog);
            }
        })
    })
    .get(function (req, res) {

    });


module.exports = router;
