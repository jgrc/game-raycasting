"use strict";

(function(JLAB) {
    var default_options = {
        width : 800,
        height : 600,
        background_color : 'black'
    };

    var Canvas2D = function (current_options) {
        this._options = JLAB.extend({}, default_options, current_options || {});
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        this._canvas.width = this._options.width;
        this._canvas.height = this._options.height;
        this._canvas.style.backgroundColor = this._options.background_color;
    };

    Canvas2D.prototype = {
        getCtx : function () {
            return this._ctx;
        },
        getCanvas : function () {
            return this._canvas;
        },
        getWidth : function () {
            return this._options.width;
        },
        getHeight : function () {
            return this._options.height;
        },
        getMiddlePoint : function () {
            return {
                x : Math.round(this.getWidth() / 2),
                y : Math.round(this.getHeight() / 2)
            };
        },
        clear : function () {
            this._ctx.clearRect(0, 0, this._options.width, this._options.height);
        }
    };

    JLAB.OUTPUT = JLAB.extend(JLAB.OUTPUT || {}, { Canvas2D : Canvas2D });
})(window.JLAB);