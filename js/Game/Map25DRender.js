"use strict";

(function(GAME) {
    var Map25DRender = function (map, ray_casting, images) {
        this._map = map;
        this._ray_casting = ray_casting;
        this.images = images;

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

            ctx.fillStyle = '#666666';
            ctx.fillRect(0, 0, w, half_h);

            var gradient = ctx.createLinearGradient(0, half_h, 0, h);
            gradient.addColorStop(0, '#888888');
            gradient.addColorStop(1, '#dddddd');
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

                var color = ray.colision == 'up' ? '#ffff00' : (ray.colision == 'down' ? '#ff0000' :  (ray.colision == 'left' ? '#00ff00' : '#0000ff'));
                var offset;
                switch (ray.colision) {
                    case 'down':
                        offset = ray.end.x - Math.floor(ray.end.x);
                        break;
                    case 'left':
                        offset = ray.end.y - Math.floor(ray.end.y);
                        break;
                    case 'up':
                        offset = 1 - ray.end.x + Math.floor(ray.end.x);
                        break;
                    case 'right':
                    default:
                        offset = 1 - ray.end.y + Math.floor(ray.end.y);
                }
                var texture = this.images['texture_' + ray.wall]
                offset = Math.floor(offset * texture.width);
                ctx.drawImage(texture, offset, 0, 1, texture.height, i * 1, half_h - wall_h / 2, 1, wall_h);
            }
        },
    };

    JLAB.extend(GAME, { Map25DRender : Map25DRender });
})(GAME);