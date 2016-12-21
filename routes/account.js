/**
 * Created by minyi on 2016/11/22.
 */
var express = require('express');
var User = require('../db/user');
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

router.post('/login', passport.authenticate('local', {session: true}), function (req, res, next) {
    res.send({status: 'ok'});
});

router.get('/edit',
    function (req, res) {
        if (req.user) {
            res.render('edit');
        }
        else {
            res.redirect('/pages/account/login');
        }
    });

router.get('/admin',
    function (req, res) {
        if (req.user) {
            res.render('admin/index');
        }
        else {
            res.redirect('/pages/account/login');
        }
    });
module.exports = router;