"use strict";

(function(GAME) {
    var RayCasting = function (callabe_function, fov, num_rays) {
        this._callabe_function = callabe_function;
        this._fov = fov;
        this._num_rays = num_rays;

        this._fish_eye = false;
        this._rays = [];
    };

    RayCasting.prototype = {
        getFov : function () {
            return this._fov;
        },
        getRays : function () {
            return this._rays;
        },
        update : function (pos, dir) {
            this._rays = [];
            var angle_step = this._fov / this._num_rays;
            for (var i = 0; i < this._num_rays; i++) {
                var relative_angle = (-this._num_rays / 2 + i) * angle_step;
                var ray_dir = dir.clone().rotate(relative_angle);
                var ray = this._castRay(pos, dir, ray_dir);
                this._rays.push(ray);
            }
        },
        _castRay : function (pos, dir, ray_dir) {
            var t = 0;

            var int_x = Math.floor(pos.x);
            var int_y = Math.floor(pos.y);

            var step_x = ray_dir.x > 0 ? 1 : -1;
            var step_y = ray_dir.y > 0 ? 1 : -1;

            var delta_tx = Math.abs(1 / ray_dir.x);
            var delta_ty = Math.abs(1 / ray_dir.y);

            var dist_x = step_x > 0 ? int_x + 1 - pos.x : pos.x - int_x;
            var dist_y = step_y > 0 ? int_y + 1 - pos.y : pos.y - int_y;

            var max_tx = delta_tx < Infinity ? delta_tx * dist_x : Infinity;
            var max_ty = delta_ty < Infinity ? delta_ty * dist_y : Infinity;

            while (true) {
                if (this._callabe_function(int_x, int_y)) {
                    var ray = new JLAB.GEOMETRY.Vector2D(pos.x + t * ray_dir.x, pos.y + t * ray_dir.y);
                    var distance = Math.sqrt((ray.x - pos.x) * (ray.x - pos.x) + (ray.y - pos.y) * (ray.y - pos.y));
                    if (false === this._fish_eye) {
                        distance *= Math.cos(dir.angle() - ray_dir.angle());
                    }
                    return { ini : pos, end : ray, distance : distance };
                }
                
                if (max_tx < max_ty) {
                    int_x += step_x;
                    t = max_tx;
                    max_tx += delta_tx;
                } else {
                    int_y += step_y;
                    t = max_ty;
                    max_ty += delta_ty;
                }
            }
        }
    };

    JLAB.extend(GAME, { RayCasting : RayCasting });
})(GAME);