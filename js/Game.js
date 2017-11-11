"use strict";

(function(W) {

    var Game = function(fov, rays, load_callback) {
        var self = this;

        this.resources = new JLAB.UTILS.Resources(
            {
                texture_1 : 'textures/1.GIF',
                texture_5 : 'textures/5.GIF',
                texture_7 : 'textures/7.GIF',
                texture_13 : 'textures/13.GIF',
                texture_9 : 'textures/9.GIF',
                texture_11 : 'textures/11.GIF',
                texture_17 : 'textures/17.GIF',
                texture_19 : 'textures/19.GIF',
                texture_21 : 'textures/21.GIF',
                texture_2 : 'textures/2.png',
                texture_23 : 'textures/23.GIF'
            }
        );

        this._map = new GAME.Map();
        this._player = new GAME.Player(
            new JLAB.GEOMETRY.Vector2D(2, 55),
            new JLAB.GEOMETRY.Vector2D(1, 0),
            0.2,
            this._map
        );

        this._ray_casting = new GAME.RayCasting(
            function (x, y) { return false === self._map.isWalkable(x, y); },
            function (x, y) { return self._map.getTile(x, y); },
            JLAB.UTILS.MATH.deg2Rad(fov),
            rays
        );

        this._keyboard = new JLAB.INPUT.Keyboard();
        this._timer = new JLAB.UTILS.DeltaTimer();

        this._minimap_render = new GAME.MiniMapRender(
            this._map,
            this._player,
            this._ray_casting,
            5
        );

        this._map25d_render = new GAME.Map25DRender(
            this._map,
            this._ray_casting,
            this.resources.images
        );

        this.resources.load(function () {
            load_callback.call(self);
        });
    };

    Game.prototype = {
        getMiniMapCanvas : function () {
            return this._minimap_render.getCanvas();
        },
        get25dCanvas : function () {
            return this._map25d_render.getCanvas();
        },
        start : function() {
            this._timer.start();
            this._loop();
        },
        _loop : function() {
            var self = this;
            this._update();
            this._render();
            requestAnimationFrame(function() {
                self._loop();
            });
        },
        _update : function() {
            var KeyMap = JLAB.INPUT.Keyboard_Map;
            var delta = this._timer.tick();

            var player_request = {
                left : this._keyboard.is(KeyMap.A),
                up : this._keyboard.is(KeyMap.W),
                right : this._keyboard.is(KeyMap.D),
                down : this._keyboard.is(KeyMap.S)
            };

            this._player.update(delta, player_request, this._map);
            this._ray_casting.update(this._player._pos, this._player._dir);
        },
        _render : function() {
            this._minimap_render.render();
            this._map25d_render.render();
        }
    };

    var start = function(fov, num_rays, callback) {
        JLAB.loader(
            [
                'js/Jlab/Output/Canvas2D.js',
                'js/Jlab/Geometry/Vector2D.js',
                'js/Jlab/Input/Keyboard.js',
                'js/Jlab/Utils/Math.js',
                'js/Jlab/Utils/DeltaTimer.js',
                'js/Jlab/Utils/Resources.js',
                'js/Game/Map.js',
                'js/Game/Player.js',
                'js/Game/RayCasting.js',
                'js/Game/MiniMapRender.js',
                'js/Game/Map25DRender.js'
            ],
            function() {            
                var game = new Game(fov, num_rays, function () {
                    this.start();
                });
                callback(game);
            }
        );
    };

    W.GAME = JLAB.extend({}, { start : start });
})(window);