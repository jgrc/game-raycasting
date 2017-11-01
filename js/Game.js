"use strict";

(function(W) {

    var Game = function(fov, rays) {
        var self = this;
        this._map = new GAME.Map();
        this._player = new GAME.Player(
            new JLAB.GEOMETRY.Vector2D(2, 2),
            new JLAB.GEOMETRY.Vector2D(1, 0),
            0.5,
            this._map
        );

        this._keyboard = new JLAB.INPUT.Keyboard();
        this._timer = new JLAB.UTILS.DeltaTimer();

        this._minimap_render = new GAME.MiniMapRender(
            this._map,
            this._player,
            5
        );
    };

    Game.prototype = {
        getMiniMapCanvas : function () {
            return this._minimap_render.getCanvas();
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
        },
        _render : function() {
            this._minimap_render.render();
        }
    };

    var start = function(callback) {
        JLAB.loader(
            [
                'js/Jlab/Output/Canvas2D.js',
                'js/Jlab/Geometry/Vector2D.js',
                'js/Jlab/Input/Keyboard.js',
                'js/Jlab/Utils/Math.js',
                'js/Jlab/Utils/DeltaTimer.js',
                'js/Game/Map.js',
                'js/Game/Player.js',
                'js/Game/MiniMapRender.js',
            ],
            function() {            
                var game = new Game();
                game.start();
                callback(game);
            }
        );
    };

    W.GAME = JLAB.extend({}, { start : start });
})(window);