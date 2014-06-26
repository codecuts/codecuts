module.exports = (function () {
    'use strict';

    var instance;

    var parallax;

    var scroll = new Fx.Scroll(window, {
        duration: 750, 
        offset: {
            x: 0,
            y: -60
        }
    });

    function init() {

        // Singleton

        // Private variables and functions.
        require('browsernizr/test/css/vhunit');
        require('browsernizr/test/css/vwunit');
        require('browsernizr/test/css/flexbox');
        require('browsernizr/test/video');
        var Modernizr = require('browsernizr');

        require('./moohelpers.js');
        var Parallax = require('./parallax.js');


        var pageState = {
            menuVisible: false
        };

        var images = [
            '/images/menu_icon.png',
            '/images/menu_close.png'
        ];

        function checkForHash() {
            var hash = window.location.hash.replace('/','');

            if ( hash === '' ) {
                return;
            }

            window.addEvent('load', function() {
                scroll.toElement($$(hash).pick());
            });

        }

        function activateParallax() {

            parallax = new Parallax({
                parallaxedClass: 'gap',
                factor: 0.5
            });

            if ( window.getSize().x < 460 ) {
                parallax.detach();
            }

        }

        function manageParallax() {

            if ( window.getSize().x < 460 ) {
                parallax.detach();
            } else {
                parallax.attach();
            }

        }

        function setupLayout() {

            //$('content').setStyles({overflow: 'hidden', height: window.getSize().y});

//            alert($$('html').getProperty('class'));

            window.addEvent('load', function() {

                $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
                //$$('.slider-wrap img').vAlign();
                $('content').setStyle('height','');

            });

        }

        function updateLayout() {
            $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
        }

        function attach() {

             // activate smooth scrolling on menu anchor click
            new Fx.SmoothScroll({
                duration: 750, 
                offset: {
                    x:0,
                    y: -60
                }
            });

            // event callbacks
            function menuFix() {
                if ( $$('body').pick().hasClass('project') ) {
                    console.log('here');
                    return;
                }

                var el = $$('.menu').pick(),
                    scroll = window.getScroll(),
                    scrn = window.getSize();
                if ( scroll.y > scrn.y ) {
                    el.setStyles({position:'fixed',top:'0'});
                } else {
                    el.setStyles({position:'absolute',top:''});
                }
            }

            function updateLayout() {
                $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
            }

            // event assignment
            window.addEvent('load', preloader(images));
            window.addEvent('load', activateParallax);
            window.addEvent('resize', manageParallax.debounce(250));
            window.addEvent('resize', updateLayout.debounce(250));
            window.addEvent('scroll', menuFix);

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

        return {

            // Public variables and functions

            load: function () {
                setupLayout();
                attach();
                checkForHash();
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