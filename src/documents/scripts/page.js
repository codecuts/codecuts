module.exports = (function () {
    'use strict';

    var instance;

    function init() {

        // Singleton

        // Private variables and functions.
        require('browsernizr/test/css/vhunit');
        require('browsernizr/test/css/vwunit');
        require('browsernizr/test/css/flexbox');
        var Modernizr = require('browsernizr');

        require('./moohelpers.js');

        var pageState = {
            menuVisible: false
        };

        var images = [
            'images/menu_icon.png',
            'images/menu_close.png'
        ];

        function layout() {

            window.addEvent('load', function() {

                $$('.section-label').vAlign();

            });

        }

        function attach() {

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

        function fallbacks() {
            var tests = $$('html').pick().getProperty('class').split(' ');

            if ( tests.contains('no-cssvhunit') ) {
                var el = $('content').getElement('.intro');
                el.setStyles({
                    height: window.getSize().y,
                    width: window.getSize().x
                });
            }

            if ( tests.contains('no-cssvwunit') ) {
                alert($$('html').pick().getProperty('class'));
            }
        }

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
                layout();
                fallbacks();
                attach();
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