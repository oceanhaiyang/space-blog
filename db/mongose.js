/**
 * Created by minyi on 2016/11/29.
 */
var config = require('../config');
var mongoose = require('mongoose');
var logger = require('../logger');

mongoose.connect('mongodb://localhost/person-blog');
var db = mongoose.connection;
db.on('error', logger.error.bind(console, 'connection error:'));
db.once('open', function () {
    logger.info('Mongo DB Connected!');
});

var chatSchema = mongoose.Schema({
    receptionistId: String,
    customerId: String,
    createAt: Date,
    closeAt: Date,
    status: String,
    level: {
        type: Number,
        'default': 0
    }
});
var Chat = mongoose.model('Chat', chatSchema);

var messageSchema = mongoose.Schema({
    sender: String,
    chatId: String,
    msg: {},
    createAt: Date,
});
messageSchema.pre('save', function (next) {
    now = new Date();
    if (!this.createAt) {
        this.set('createAt', now);
    }
    next();
});
var Message = mongoose.model('Message', messageSchema);

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String, //TODO Should be hashed
    displayName: String,
    info: {},
});
var User = mongoose.model('User', UserSchema);

var childSchema = mongoose.Schema({
    name: String,
    children: []
});
var PhraseSchema = mongoose.Schema({
    name: String,
    children: [childSchema]
});
var Phrase = mongoose.model('Phrase', PhraseSchema);

module.exports.Message = Message;
module.exports.Chat = Chat;
module.exports.User = User;
module.exports.Phrase = Phrase;
module.exports.connection = db;
