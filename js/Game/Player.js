"use strict";

(function(GAME) {
    var Player = function (pos, dir, radius, map) {
        this._pos = pos;
        this._dir = dir;
        this._radius = radius;
        this._map = map;

        this._max_speed_move = 5.5;
        this._max_speed_rotate = JLAB.UTILS.MATH.deg2Rad(100);
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
            var new_x = this._pos.x + this._dir.x * delta * movement * this._max_speed_move;
            var new_y = this._pos.y + this._dir.y * delta * movement * this._max_speed_move;

            if (this._checkWalkable(new_x, this._pos.y)) {
                this._pos.x = new_x;
            }
            if (this._checkWalkable(this._pos.x, new_y)) {
                this._pos.y = new_y;
            }
        },
        _checkWalkable : function (x, y) {
            if (false === this._map.isWalkable(x + this._radius, y)) {
                return false;
            }
            if (false === this._map.isWalkable(x, y + this._radius)) {
                return false;
            }
            if (false === this._map.isWalkable(x - this._radius, y)) {
                return false;
            }
            if (false === this._map.isWalkable(x, y - this._radius)) {
                return false;
            }

            return true
        }
    };

    JLAB.extend(GAME, { Player : Player });
})(GAME);