/**
 * Created by minyi on 2016/12/21.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../db/user');

// passport setup
/*passport.use(new passportHttp.BasicStrategy(
    function(username, password, done) {
        // config user & pass must be valid
        if(!config.username || !config.password){
            return done(null, false);
        }
        // check if equals
        if(username == config.username && password == config.password){
            return done(null, true);
        } else{
            return done(null, false);
        }
    }
));*/

passport.use(new LocalStrategy(callback));

function callback(username, password, done) {
    user.find({username: username}, function (err, user) {
        if (err) {
            return done(null, false, {errMsg: '用户不存在'});
        }
        else {
            if (user.username !== username || user.password !== password) {
                return done(null, false, {errMsg: '用户名或密码错误'})
            }
            if (user.username === username || user.password === password) {
                return done(null, user);
            }
        }
    })
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});


model.exports = passport;