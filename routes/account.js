/**
 * Created by minyi on 2016/11/22.
 */
var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
    var body = req.body;
    console.log(body);
    var user = {
        username: 'space',
        password: '999999'
    };
    if (body.username === user.username && body.password === user.password) {
        req.session.sign = true;
        res.render('edit');
    } else {
        res.send('error');
    }
});


module.exports = router;