/**
 * Created by minyi on 2016/10/24.
 */
var express = require('express');
var router = express.Router();
var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

router.post('/', function(req, res, next) {
    var title = req.body.title;
    var postBody = req.body.post_body;
    var result = marked(postBody);
    res.render('show', {title: title, body: result});
});

module.exports = router;