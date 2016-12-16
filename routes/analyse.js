/**
 * Created by minyi on 2016/12/12.
 */
var express = require('express');
var router = express.Router();
var visit = require('../db/analyse');

router.get('/', function (req, res) {
    visit.count({}, function (err, num) {
        if (err) {
            console.log(err);
        } else {
            visit.find({}, function (err, sa) {
                let set = new Set();
                sa.forEach(function (item) {
                    set.add(item.ip);
                });
                let person = set.size;
                res.render('analyse/index', {
                    watchNum: num,
                    person: person
                });
            });
        }
    });
});
router.get('/visit_position', function (req, res) {
    visit.find({}, function (err, cb) {
        if (err) {
            console.log(err);
        } else {
            var result;
            var data = [{
                city: '北京',
                value: 0
            }];
            var cities = [];
            cb.forEach(function (visit) {
                cities.push(visit.city);
            });
            cities.forEach(function (city) {
                data.forEach(function (obj) {
                    if(obj.hasOwnProperty(city)) {
                        obj[value] += 1;
                    }
                    else {
                        data.push({
                            city: city,
                            value: 0
                        });
                    }
                })
            });
            result = {
                data: data,
                status: 'ok'
            };
            res.send(result);
        }
    })
});
module.exports = router;