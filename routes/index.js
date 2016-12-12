var express = require('express');
var post = require('../db/post');
var router = express.Router();
var analyse = require('../db/analyse');
/* GET home page. */
router.get('/', getIndex);

function getIndex(req, res) {
    var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);

    var ips = {
        ip: ip
    };
    analyse.createInfo(ips, function (err, cb) {
        if (err) {
            console.log(err);
        } else {
            // post
            post.find({}, null, {skip: 0, limit: 10}, function (err, blog) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('index', {blog: blog});
                }
            });
        }
    });
}

module.exports = router;
