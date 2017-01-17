/**
 * Created by minyi on 2016/11/22.
 */
var express = require('express');
var post = require('../db/post');
var router = express.Router();
var isAuthenticated = require('../passport/index');
var api = require('../api/index');

router.get('/login', function (req, res, next) {
    res.render('account/login');
});
router.post('/login', isAuthenticated, function (req, res, next) {
    res.send({status: 'ok'});
});

router.route('/edit')
    .get(getEditMiddleware)
    .put(putArticleMiddleware)
    .post(postArticleMiddleware);


router.get('/admin', getAdminMiddleware);

// get /account/edit?id=id
function getEditMiddleware(req, res, next) {
    var article = {
        post_title: '',
        post_url: '',
        post_abstract: '',
        post_markdown: '',
        tags: '',
    };

    if (!req.user) {
        console.log('no user');
        var url = req.url;
        var redirect = encodeURIComponent('/account' + url);
        return res.redirect('/account/login?redirect=' + redirect);
    }

    var postId = req.query.id;

    if (!postId) {
        return res.render('edit', {post: article, update: 'false'});
    }
    post.findOne({_id: postId}, function (err, searchArticle) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!searchArticle) {
            return res.render('edit', {post: article, update: 'false'});
        }
        res.render('edit', {post: searchArticle, update: 'update'});
    })
}

// put /account/edit?id=id
function putArticleMiddleware(req, res, next) {
    var postId = req.query.id;
    var article = req.body;
    console.log(article);
    console.log(postId);
    if (!postId) {
        return next();
    }

    post.updateInfo(postId, article, function (err, result) {
        if (err) {
            return next(err);
        }
        res.send({status: 'ok'});
    })
}

// post /account/edit?id=id
function postArticleMiddleware(req, res, next) {
    var body = req.body;
    console.log(body);
    post.createInfo(body, function (err, reslut) {
        if (err) {
            return next(err);
        }
        res.send({status: 'ok'});
    })
}

// get /account/admin
function getAdminMiddleware(req, res, next) {
    if (!req.user) {
        var url = req.url;
        var redirect = encodeURIComponent('/account' + url);
        return res.redirect('/account/login?redirect=' + redirect);
    }

    post.find({}, function (err, posts) {
        if (err) {
            console.log(err);
            return next(err);
        }

        var post = posts.map(function (artical) {
            var obj = {};
            obj.tags = artical.tags.join('');
            obj.createAt = api.dateFormat(artical.meta.createAt);
            obj._id = artical._id;
            obj.post_title = artical.post_title;
            obj.post_url = artical.post_url;
            obj.view = artical.view;

            return obj;
        });
        res.render('admin/index', {post: post});
    });
}

module.exports = router;