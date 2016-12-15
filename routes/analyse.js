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
    visit.findAll(function (err, cb) {
        if (err) {
            console.log(err);
        } else {
            var result;
            var data = [{
                city: '北京',
                value: 0
            }];
            cb.forEach(function (visit) {
                var cityName = visit.city;
                data.forEach(function (item) {
                    if (item.hasOwnProperty(cityName)) {
                        item[value] += 1;
                    }
                    else {
                        data.push({
                            city: cityName,
                            value: 0
                        })
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