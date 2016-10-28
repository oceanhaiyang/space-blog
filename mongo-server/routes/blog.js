/**
 * Created by minyi on 2016/10/24.
 */
var express = require('express');
var router = express.Router();
var Blog = require('../schema/blog');
var md = require('markdown').markdown;

text = '###this is markdown ' +
    '`this is code`' +
    '```this is code ' +
    '```';
var tree = md.toHTML(text);
router.post('/', function(req, res, next) {
    var blog = req.body;
    Blog.createInfo(blog, function (err, blog) {
        if (err) {
            console.log('xinzencuowu');
        } else {
            console.log(blog);
            res.send(tree);
        }
    })
});

module.exports = router;