module.exports = (function () {
    'use strict';

    var instance;

    function init() {

        // Singleton

        // Private variables and functions.

        var pageState = {
            menuVisible: false
        };

        var images = [
            'images/menu_icon.png',
            'images/menu_close.png'
        ];

        function preloader(images) {
            var img, preload = [];
            if ( document.images ) {
                for (var i=0; i<images.length; i++) {
                    img = new Image();
                    img.src = images[i];
                    preload.push(img);

                }
            }
        }

        function addLoadEvent(func) {
            var oldonload = window.onload;
            if (typeof window.onload !== 'function') {
                window.onload = func;
            } else {
                window.onload = function () {
                    if (oldonload) {
                        oldonload();
                    }
                    func();
                };
            }
        }

        return {

            // Public variables and functions

            load: function () {
                this.setupEvents();
            },

            setupEvents: function () {

                // callback functions
                function menuToggle() {
                    var e = $('content').getElement('.menu'),
                        t = $('menu-toggle').getElement('img');
                    pageState.menuVisible = !pageState.menuVisible;
                    if ( pageState.menuVisible === true ) {
                        e.setStyles({left:0});
                        t.setProperty('src','images/menu_close.png');
                    } else {
                        e.setStyles({left:'-9999px'});
                        t.setProperty('src','images/menu_icon.png');
                    }
                }

                function menuClick(e) {
                    new Event(e).stop();
                    menuToggle();
                }

                // activate smooth scrolling on menu anchor click
                new Fx.SmoothScroll({duration: 750});

                // event assignment
                addLoadEvent(preloader(images));
                $('menu-toggle').addEvent('click', menuToggle);
                $$('.menu-item').addEvent('click', menuClick);

            }

        };

    }

    return {

        getInstance: function() {

            if ( !instance ) {
                instance = init();
            }

            return instance;

        }
    };

})();