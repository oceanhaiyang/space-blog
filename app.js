var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var config = require('./config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost/personalBlog');
db.connection.on('error', function (error) {
    console.log('数据库连接失败：' + error);
});
db.connection.once('open', function () {
    console.log('--数据库连接成功--');
});

var index = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var post = require('./routes/post');
var analyse = require('./routes/analyse');
var api = require('./routes/api');
var tags = require('./routes/tags');
var timeLine = require('./routes/timeline');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/img/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../blog-images'));
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
// route
// 访问统计
app.use('/analyse', analyse);
app.use('/users', users);
app.use('/account', account);
app.use('/post', post);
app.use('/api', api);
app.use('/tags', tags);
app.use('/time-line', timeLine);
app.get('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
