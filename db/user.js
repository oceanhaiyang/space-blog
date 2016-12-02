/**
 * Created by minyi on 2016/11/29.
 */
var mongoose = require('mongoose');

// connect mongodb
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
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
        this.meta.createAt = Date.now();
    }
    next();
});


UserSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort({'meta.createAt': 1}).exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id}).exec(cb);
    },
    findByUsername: function (username, cb) {
      return this
          .findOne({username: username}).exec(cb);
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