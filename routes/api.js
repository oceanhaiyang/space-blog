/**
 * Created by minyi on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var config = require('../config/index');
var path= require('path');

var fileStoragePath = config.fileStoragePath;
console.log('fileStoragePath: ' + fileStoragePath);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, fileStoragePath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});


// 图片上传
router.post('/img_upload', upload.single('file'), function (req, res, next) {
    res.send('/' + req.file.originalname);
});

module.exports = router;