/**
 * Created by minyi on 2016/10/24.
 */
var mongoose = require('mongoose');
var User = require('./user');
// user schema

var BlogSchema = new mongoose.Schema({
    title: String,
    postBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tag: String,
    body: String,
    comments: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        date: {
            type: Date,
            default: Date.now()
        },
        body: String
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
BlogSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

BlogSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort({'meta.createAt': 1})
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id}).exec(cb);
    },
    createInfo: function (blog, cb) {
        return this.create(blog, cb);
    },
    updateInfo: function (id, blog, cb) {
        var conditions = {_id: id},
            options = {},
            update = {$set: blog};
        return this.update(conditions, update, options, cb);
    },
    deleteInfo: function (id, cb) {
        var condition = {_id: id};
        return this.remove(condition, cb);
    }
};
var Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;
