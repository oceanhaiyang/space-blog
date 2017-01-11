var express = require('express');
var post = require('../db/post');
var router = express.Router();
var analyse = require('../db/analyse');
var request = require('request');
var api = require('../api/index');
/* GET home page. */
router.get('/', getIndex);

function getIndex(req, res, next) {
    var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
    var getAdressUri = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=' + ip;
    request.get(getAdressUri, function (err, response, body) {
        if (err) {
            return next(err);
        }
        try {
            body = JSON.parse(body);
        } catch (err) {
            console.log(err);
        }
        var city = body.city;
        var visit = {
            ip: ip,
            city: city
        };
        analyse.createInfo(visit, function (err, success) {
            if (err) {
                return next(err);
            }
            showPosts(req, res, next);
        })
    });
}

function showPosts(req, res, next) {
    post.find({}, null, {skip: 0, limit: 10}, function (err, blogs) {
        if (err) {
            return next(err);
        }
        var result = blogs.map(function (blog) {
            var obj = {};
            obj.tags = blog.tags;
            obj.createAt = api.dateFormat(blog.meta.createAt);
            obj._id = blog._id;
            obj.post_title = blog.post_title;
            obj.post_url = blog.post_url;

            return obj;
        });
        res.render('index', {blog: result});
    });
}

module.exports = router;
