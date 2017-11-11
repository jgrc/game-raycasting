"use strict";

(function(JLAB) {

    var Resources = function (resource_paths) {
        this.resource_paths = resource_paths;
    	this.images = {};
    };

    Resources.prototype = {
        load : function (end_callback) {
        	var num_resources = Object.keys(this.resource_paths).length;
        	var completed = 0;

            var loaded = function () {
                if (++completed === num_resources) {
                    end_callback();
                }
            }

            for (var key in this.resource_paths) {
                if (this.resource_paths.hasOwnProperty(key)) {
                	var path = this.resource_paths[key];
                	if (/.+\.(jpg|png|gif)$/i.test(path)) {
                		this._loadImage(key, path, loaded);
                	} else {
                		throw 'Resource format not available.';
                	}
                } 
            }
        },
        _loadImage : function (key, path, callback) {
			var img = document.createElement('img');
			img.addEventListener('load', callback);
			img.setAttribute('src', path);
			this.images[key] = img;
        }
    };

    JLAB.UTILS = JLAB.extend(JLAB.UTILS || {}, { Resources : Resources });
})(window.JLAB);