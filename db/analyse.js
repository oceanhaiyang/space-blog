/**
 * Created by minyi on 2016/12/12.
 */
var mongoose = require('mongoose');

var AnalyseSchema = mongoose.Schema({
    ip: String
});
AnalyseSchema.statics= {
  createInfo: function (analyse, cb) {
    return this.create(analyse, cb);
  },
  countInfo: function () {
    return this.find({}).count();
  }
};

var analyse = mongoose.model('analyse', AnalyseSchema);

module.exports = analyse;