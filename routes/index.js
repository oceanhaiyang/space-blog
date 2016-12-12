var express = require('express');
var post = require('../db/post');
var router = express.Router();
var analyse = require('../db/analyse');
var request = require('request');
/* GET home page. */
router.get('/', getIndex);

function getIndex(req, res) {
    var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
    var getAdressUri = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=' + ip;
    request.get(getAdressUri, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log(body);
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
            createVisitInfo(res, visit, showPosts);
        }
    });
}

function createVisitInfo(res, visit, callback) {
    analyse.createInfo(visit, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(res);
        }
    })
}

function showPosts(res) {
    post.find({}, null, {skip: 0, limit: 10}, function (err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blog: blog});
        }
    });
}

module.exports = router;
