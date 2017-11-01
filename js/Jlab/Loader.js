"use strict";

(function() {
    window.JLAB = {
        loader : function(scripts, callback) {
            var completed = 0;
            var loaded = function () {
                if (++completed === scripts.length) {
                    callback();
                }
            }
            
            for (var i = 0, n = scripts.length; i < n; i++) {
                var script = document.createElement('script');
                script.setAttribute('type', 'text/javascript');
                script.addEventListener('load', loaded);
                script.setAttribute('src', scripts[i]);
                document.head.appendChild(script);
            }
        },
        extend : function () {
            for (var i = 1, n = arguments.length; i < n; i++) {
                for (var attr in arguments[i]) {
                    if (arguments[i].hasOwnProperty(attr)) {
                        arguments[0][attr] = arguments[i][attr];
                    }
                }
            }

            return arguments[0];
        }
    };
})();

