/**
 * Created by minyi on 2016/11/22.
 */
var express = require('express');
var User = require('../db/user');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
    function (username, passwod, cb) {
        User.findByUsername(username, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != passwod) {
                return cb(null, false);
            }
            return cb(null, user);
        })
    }));

passport.serializeUser(function (user, cb) {
   cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
   user.findById(id, function (err, user) {
       if (err) {
           return cb(err);
       }
       cb(null, user);
   })
});

router.post('/login', function (req, res, next) {
    var body = req.body;


    if (body.username === user.username && body.password === user.password) {
        req.session.sign = true;

        var successMsg = {
            status: 'ok'
        };
        res.send(successMsg);
    } else {
        var errorMsg = {
            status: 'no auth'
        };

        res.send(errorMsg);
    }
});


module.exports = router;