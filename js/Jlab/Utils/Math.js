"use strict";

(function(JLAB) {

    var rad2Deg = function (rad) {
        return rad * 180 / Math.PI;
    };

    var deg2Rad = function (deg) {
        return deg * Math.PI / 180;
    };

    var random = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    var randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var interpolate = function (init, end, percent) {
        return init + (end - init) * percent;
    };

    var limit = function (min, max, value) {
        return Math.min(Math.max(value, min), max);
    };

    var colorBrighten = function (hex, percent) {
        var a = Math.round(255 * percent / 100),
        r = a + parseInt(hex.substr(1, 2), 16),
        g = a + parseInt(hex.substr(3, 2), 16),
        b = a + parseInt(hex.substr(5, 2), 16);

        r = r < 255 ? (r < 1 ? 0 : r) : 255;
        g = g < 255 ? (g < 1 ? 0 : g) : 255;
        b = b < 255 ? (b < 1 ? 0 : b) : 255;

        return '#' + (0x1000000 + (r * 0x10000) + (g * 0x100) + b).toString(16).slice(1);
    };

    JLAB.UTILS = JLAB.extend(
        JLAB.UTILS || {},
        {
            MATH : {
                rad2Deg : rad2Deg,
                deg2Rad : deg2Rad,
                random : random,
                randomInt : randomInt,
                interpolate : interpolate,
                limit : limit,
                colorBrighten : colorBrighten
            }
        }
    );
})(window.JLAB);