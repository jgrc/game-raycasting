"use strict";

(function(JLAB) {

    var Vector2D = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Vector2D.prototype = {
        clone : function () {
            return new Vector2D(this.x, this.y);
        },
        set : function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        copy : function (vector) {
            this.x = vector.x;
            this.y = vector.y;
        },
        add : function (vector) {
            return this.addScalar(vector.x, vector.y);
        },
        addScalar : function (x, y) {
            y = arguments.length > 1 ? y : x;
            this.x += x;
            this.y += y;
            return this;
        },
        sub : function (vector) {
            return this.subScalar(vector.x, vector.y);
        },
        subScalar : function (x,y) {
            y = arguments.length > 1 ? y : x;
            this.x -= x;
            this.y -= y;
            return this;
        },
        mul : function (vector) {
            return this.mulScalar(vector.x, vector.y);
        },
        mulScalar : function (x, y) {
            y = arguments.length > 1 ? y : x;
            this.x *= x;
            this.y *= y;
            return this;
        },
        invertX : function () {
            this.x *= -1;
            return this;
        },
        invertY : function () {
            this.y *= -1;
            return this;
        },
        invert : function () {
            return this.invertX().invertY();
        },
        truncate : function (max) {
            return this.long() > max ? this.normalize().mulScalar(max) : this;
        },
        rotate : function (rad) {
            var x0 = this.x;
            var y0 = this.y;
            this.x = x0 * Math.cos(rad) - y0 * Math.sin(rad);
            this.y = x0 * Math.sin(rad) + y0 * Math.cos(rad);
            return this;
        },
        long : function () {
            return Math.sqrt(this.sqLong());
        },
        sqLong : function () {
            return (this.x * this.x + this.y * this.y);
        },
        normalize : function () {
            var lon = this.long();
            this.mulScalar(lon !== 0 ? 1 / lon : 0);
            return this;
        },
        dot : function (vector) {
            return (this.x * vector.x + this.y * vector.y);
        },
        angle : function () {
            return Math.atan2(this.y, this.x);
        },
        distance : function (vector) {
            return vector.clone().sub(this);
        }
    };

    JLAB.GEOMETRY = JLAB.extend(JLAB.GEOMETRY || {}, { Vector2D : Vector2D });
})(window.JLAB);