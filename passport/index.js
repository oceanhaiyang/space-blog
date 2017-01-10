/**
 * Created by minyi on 2016/12/21.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/user');


passport.use('local', new LocalStrategy(
    function (username, password, callback) {
        User.findByUsername(username, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false);
            }
            if (user.password != password) {
                return callback(null, false);
            }
            return callback(null, user);
        })
    }));

passport.serializeUser(function (user, callback) {
    callback(null, user._id);
});

passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(null, user);
    })
});


module.exports = passport.authenticate('local', {session: true});