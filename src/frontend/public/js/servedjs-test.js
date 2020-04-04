/*!
 * MIT License
 *
 * Copyright (c) 2019, 2020 Imre Tabur <imre.tabur@eesti.ee>
 */
"use strict";

(function (global) {

    var jsdi = global.jsdi = global.jsdi || {};

    jsdi.service("$geoTest", function () {
        return {
            inject: ["$timer"],
            testData: [],
            newWatcher: function (watcherSuccess, watcherError, options) {
                var watcher = {
                    $timer: this.$timer,
                    timer: null,
                    counter: 0,
                    testData: this.testData,
                    init: function () {
                        var that = this;
                        if (!this.timer) {
                            this.timer = this.$timer.newInterval(function () {
                                if (that.counter < that.testData.length) {
                                    var position = that.testData[that.counter];
                                    that.counter++;
                                    that.success(position);
                                } else {
                                    that.timer.stop();
                                }
                            }, 5000);
                        }
                    },
                    success: function (position) {
                        watcherSuccess({
                            coords: {
                                latitude: position.latitude,
                                longitude: position.longitude,
                                accuracy: position.accuracy,
                                altitude: position.altitude,
                                altitudeAccuracy: position.altitudeAccuracy,
                                speed: position.speed,
                                heading: position.heading
                            },
                            timestamp: position.timestamp
                        });
                    },
                    start: function () {
                        this.timer.start();
                    },
                    stop: function () {
                        this.timer.stop();
                    }
                };
                watcher.init();
                return watcher;
            }
        };
    });

})(typeof window === 'undefined' ? global : window);
