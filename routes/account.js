/**
 * Created by minyi on 2016/11/22.
 */
var express = require('express');
var User = require('../db/user');
var post = require('../db/post');
var router = express.Router();
var isAuthenticated = require('../passport/index');

router.get('/login', function (req, res, next) {
    res.render('account/login');
});
router.post('/login', isAuthenticated, function (req, res, next) {
    res.send({status: 'ok'});
});

router.get('/edit',
    function (req, res) {
        if (req.user) {
            var post = {
                post_title: '',
                post_url: '',
                post_abstract: '',
                post_markdown: '',
                tags:　'',
            };
            res.render('edit', {post: post});
        }
        else {
            var redirect = encodeURIComponent('/account/edit');
            res.redirect('/account/login?redirect=' + redirect);
        }
    });
router.route('/edit/:id')
    .get(function (req, res, next) {
        if (!req.user) {
            return next();
        }
        var id = req.params.id;

        post.findOne({_id: id}, function (err, artical) {
            if (err) {
                return next(err);
            }
            if (!artical) {
                var result = {
                    status: 'failed',
                    err_msg: '没有查到此文章'
                };
                res.send(result);
            }
            console.log(artical);
            res.render('edit', {post: artical});

        });
    })
    .put(function (req, res, next) {
        var putId = req.param.id;
        var newPost = req.body;
        if (!req.user) {
            return next();
        }

        post.updateInfo(putId, newPost, function (err, sucess) {
            if (err) {
                return next(err);
            }
            console.log(success);
        })
    })
    .post(function (req, res, next) {

    });


router.get('/admin',
    function (req, res, next) {
        if (req.user) {
            post.find({}, function (err, posts) {
                if (err) {
                    next(err);
                }
                else {
                    var post = posts.map(function (artical) {
                        var obj = {};
                        obj.tags = artical.tags.join('');
                        obj.createAt = dateFormat(artical.meta.createAt);
                        obj._id = artical._id;
                        obj.post_title = artical.post_title;
                        obj.post_url = artical.post_url;

                        return obj;
                    });
                    res.render('admin/index', {post: post});
                }
            });

        }
        else {
            var redirect = encodeURIComponent('/account/admin');
            res.redirect('/account/login?redirect=' + redirect);
        }
    });

function toStr(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function dateFormat(date) {
    date = new Date(date);

    var year = date.getYear() + 1900,
        month = date.getMonth() + 1,
        day = date.getDate();

    return [year, month, day].map(toStr).join('-');
}
module.exports = router;