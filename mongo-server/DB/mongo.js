/**
 * Created by minyi on 2016/10/14.
 */
var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/test');
db.on('error', console.error.bind(console, '连接错误'));
db.once('open', function () {
  console.log('数据库打开');
});

var userSchema = new mongoose.Schema({
  name: String
});

var user = mongoose.model('user', userSchema);

model.exports.user = user;