/**
 * Created by minyi on 2016/11/22.
 */
var express = require('express');
var router = express.Router();

var noAuthPages = [
    'account/login',
    'index'
];

var authPages = [
    'edit'
];
router.get('/*', function (req, res, next) {
    var path = req.url.substring(1);

    if (noAuthPages.indexOf(path) !== -1) {
        res.render(path);
    } else if (authPages.indexOf(path) !== -1) {
        if (req.session.sign) {
            res.render(path);
        } else {
            res.render('account/login');
        }
    } else {
        next();
    }

});

module.exports = router;