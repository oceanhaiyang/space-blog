/**
 * Created by minyi on 2016/11/29.
 */
var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    post_title: String,
    post_url: String,
    post_abstract: String,
    post_markdown: String,
    tags:　[],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
});

PostSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = Date.now();
    }
    next();
});

PostSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort({'meta.createAt': 1}).exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id}).exec(cb);
    },
    createInfo: function (user, cb) {
        return this.create(user, cb);
    },
    updateInfo: function (id, post, cb) {
        var conditions = {_id: id},
            options = {},
            update = {$set: post};
        return this.update(conditions, update, options, cb);
    },
    findAll: function (cb) {
        return this.findAll().exec(cb);
    }
};

var post = mongoose.model('post', PostSchema);

module.exports = post;