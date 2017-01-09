/**
 * Created by minyi on 2016/11/22.
 */
var express = require('express');
var User = require('../db/user');
var post = require('../db/post');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use('local', new Strategy(
    function (username, passwod, done) {
        User.findByUsername(username, function (err, user) {
            console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user.password != passwod) {
                return done(null, false);
            }
            return done(null, user);
        })
    }));

passport.serializeUser(function (user, callback) {
    callback(null, user._id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log(err);
            return cb(err);
        }
        cb(null, user);
    })
});
router.get('/login', function (req, res, next) {
    res.render('account/login');
});
router.post('/login', passport.authenticate('local', {session: true}), function (req, res, next) {
    res.send({status: 'ok'});
});

router.get('/edit',
    function (req, res) {
        if (req.user) {
            res.render('edit');
        }
        else {
            var redirect = encodeURIComponent('/account/edit');
            res.redirect('/account/login?redirect=' + redirect);
        }
    });
router.route('/edit/:id')
    .get(function (req, res, next) {
        if (!req.user) {
            next();
        }
        var id = req.params.id;

        post.find({_id: id}, function (err, artical) {
            if (err) {
                next(err);
            }
            if (!artical) {}

        });
    })
    .put(function (req, res, next) {

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
    console.log(year);
    return [year, month, day].map(toStr).join('-');
}
module.exports = router;