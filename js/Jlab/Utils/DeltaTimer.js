"use strict";

(function(JLAB) {

    var DeltaTimer = function () {
        this.start();
    };

    DeltaTimer.prototype = {
        start : function () {
            this._current = Date.now();
        },
        tick : function () {
            var now = Date.now();
            var deltaTime = (now - this._current) / 1000;
            this._current = now;

            return deltaTime;
        },
        tack : function () {
            var now = Date.now();
            return (now - this._current) / 1000;
        },
        elapsed : function (seconds) {
            return this.tack() >= seconds;
        }
    };

    JLAB.UTILS = JLAB.extend(JLAB.UTILS || {}, { DeltaTimer : DeltaTimer });
})(window.JLAB);