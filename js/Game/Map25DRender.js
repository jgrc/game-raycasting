"use strict";

(function(GAME) {
    var Map25DRender = function (map, ray_casting) {
        this._map = map;
        this._ray_casting = ray_casting;

        this._canvas = new JLAB.OUTPUT.Canvas2D({
            width : 640,
            height : 480,
            background_color : 'black'
        });

        this._view_max_distance = (this._canvas.getWidth() / 2) / Math.tan(this._ray_casting.getFov() / 2);
    };

    Map25DRender.prototype = {
        getCanvas : function () {
            return this._canvas.getCanvas();
        },
        render : function () {
            this._canvas.clear();
            this._render_skybox();
            this._render_walls();
        },
        _render_skybox : function () {
            var ctx = this._canvas.getCtx();
            var w = this._canvas.getWidth();
            var h = this._canvas.getHeight();
            var half_h = h / 2;

            ctx.fillStyle = 'cyan';
            ctx.fillRect(0, 0, w, half_h);

            var gradient = ctx.createLinearGradient(0, half_h, 0, h);
            gradient.addColorStop(0, '#382406');
            gradient.addColorStop(1, '#8c5c13');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, half_h, w, half_h);
        },
        _render_walls : function () {
            var ctx = this._canvas.getCtx();
            var rays = this._ray_casting.getRays();
            var n_rays = rays.length;
            var w = this._canvas.getWidth();
            var h = this._canvas.getHeight();
            var half_h = h / 2;
            var wall_w = w / n_rays;

            for (var i = 0; i < n_rays; i++) {
                var ray = rays[i];
                var wall_h = Math.round(this._view_max_distance / ray.distance);

                var distance_ratio = JLAB.UTILS.MATH.limit(0, 1, (wall_h / h) * 2);
                ctx.fillStyle = JLAB.UTILS.MATH.colorBrighten(
                    '#ffff00',
                    JLAB.UTILS.MATH.interpolate(-80, 0, distance_ratio)
                );
                ctx.fillRect(Math.ceil(wall_w * i), half_h - wall_h / 2, Math.ceil(wall_w), wall_h);
            }
        },
    };

    JLAB.extend(GAME, { Map25DRender : Map25DRender });
})(GAME);