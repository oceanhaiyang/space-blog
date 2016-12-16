/**
 * Created by minyi on 2016/12/13.
 */
var analyse = (function () {

    return {
        setMap: function () {
            // 基于准备好的dom，初始化echarts实例
            var that = this;
            var myChart = echarts.init(document.getElementById('map'));
            var data = that.getCities();
            console.log(data);
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            var option = {
                backgroundColor: '#404a59',
                tooltip : {
                    trigger: 'item'
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series : [
                    {
                        name: '访问量',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 6)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
            myChart.setOption(option);
        },
        getCities: function () {
            $.ajax({
                url: '/analyse/visit_position',
                success: function (json) {
                    var data = [{
                        city: '北京',
                        value: 0
                    }];
                    json.data.forEach(function (cities) {
                        data.forEach(function (obj) {
                            if (obj.hasOwnProperty(cities)) {
                                obj[value] += 1;
                            } else {
                                data.push({
                                    city: cities,
                                    value: 0
                                });
                            }
                        })
                    });
                    console.log(data);
                    return data;
                }
            })
        }
    }
})();

analyse.setMap();