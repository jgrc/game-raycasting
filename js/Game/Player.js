"use strict";

(function(GAME) {
    var Player = function (pos, dir, radius, map) {
        this._pos = pos;
        this._dir = dir;
        this._radius = radius;
        this._map = map;

        this._max_speed_move = 8;
        this._max_speed_rotate = JLAB.UTILS.MATH.deg2Rad(75);
    };

    Player.prototype = {
        getPos : function () {
            return this._pos;
        },
        getDir : function () {
            return this._dir;
        },
        getRadius : function () {
            return this._radius;
        },
        update : function (delta, request) {
            var movement = 0;
            var rotation = 0;
            if (request.up) movement += 1;
            if (request.down) movement -= 1;
            if (request.left) rotation -= 1;
            if (request.right) rotation += 1;

            this._dir.rotate(delta * rotation * this._max_speed_rotate);
            var new_pos = this._pos.clone().add(this._dir.clone().mulScalar(delta * movement * this._max_speed_move));

            if (this._map.isWalkable(new_pos.x, new_pos.y)) {
                this._pos = new_pos;
            }
        }
    };

    JLAB.extend(GAME, { Player : Player });
})(GAME);