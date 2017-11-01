"use strict";

(function(GAME) {
    var MiniMapRender = function (map, player, ray_casting, tile_size) {
        this._map = map;
        this._player = player;
        this._ray_casting = ray_casting;
        this._tile_size = tile_size;

        this._canvas = new JLAB.OUTPUT.Canvas2D({
            width : this._map.getRows() * tile_size,
            height : this._map.getColumns() * tile_size,
            background_color : 'white'
        });
    };

    MiniMapRender.prototype = {
        getCanvas : function () {
            return this._canvas.getCanvas();
        },
        render : function () {
            this._canvas.clear();
            this._render_map();
            this._render_ray_casting();
            this._render_player();
        },
        _render_map : function () {
            var ctx = this._canvas.getCtx();
            for (var y = 0; y < this._map.getColumns(); y++) {
                for (var x = 0; x < this._map.getRows(); x++) {
                    var tile = this._map.getTile(x, y);
                    if (tile === 1) {
                        ctx.fillStyle = 'black';
                        ctx.fillRect(x * this._tile_size, y * this._tile_size, this._tile_size, this._tile_size);
                    }
                }
            }
        },
        _render_player : function () {
            var ctx = this._canvas.getCtx();
            var player_pos = this._player.getPos();

            ctx.translate(player_pos.x * this._tile_size, player_pos.y * this._tile_size); 

            ctx.beginPath();
            ctx.arc(0, 0, this._player.getRadius() * this._tile_size, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1;
            ctx.fillStyle = 'blue';
            ctx.fill();

            var view = this._player.getDir().clone().mulScalar(this._tile_size * 5);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(view.x, view.y);
            ctx.strokeStyle = 'blue';
            ctx.stroke();

            ctx.translate(-player_pos.x * this._tile_size, -player_pos.y * this._tile_size);
        },
        _render_ray_casting : function () {
            var ctx = this._canvas.getCtx();
            var rays = this._ray_casting.getRays();

            for (var i = 0, n = rays.length; i < n; i++) {
                var ray = rays[i];
                ctx.beginPath();
                ctx.moveTo(ray.ini.x * this._tile_size, ray.ini.y * this._tile_size);
                ctx.lineTo(ray.end.x * this._tile_size, ray.end.y * this._tile_size);
                ctx.strokeStyle = 'red';
                ctx.stroke();
            }
        },
    };

    JLAB.extend(GAME, { MiniMapRender : MiniMapRender });
})(GAME);