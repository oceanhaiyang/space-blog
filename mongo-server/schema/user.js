/**
 * Created by minyi on 2016/10/26.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: String,
    nickname: String,
    password: String,
    portrait: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        lastLogin: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.lastAt = Date.now();
    }
    next();
});

UserSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort({'meta.createAt': 1}).exec(cb);
    },
    findById: function (id, cd) {
        return this
            .findOne({_id: id}).exec(cb);
    },
    createInfo: function (user, cb) {
        return this.create(user, cb);
    },
    updateInfo: function (id, user, cb) {
        var conditions = {_id: id},
            options = {},
            update = {$set: user};
        return this.update(conditions, update, options, cb);
    }
};

var User = mongoose.model('user', UserSchema);

module.exports = User;