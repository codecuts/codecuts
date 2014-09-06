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

        loadSpeedTest();

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

            if ( window.getSize().x < 768 ) {
                parallax.detach();
            } else {
                parallax.attach();
            }

        }

        function setupLayout() {
//            alert($$('html').getProperty('class'));

            fallbacks();

            window.addEvent('load', function() {

                $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
                //$$('.slider-wrap img').vAlign();
                $('content').setStyle('height','');

            });

            $$('.logo-video').pick().addEventListener('loadedmetadata', function() {
                positionVideo();
            });

            $$('.logo-video').pick().addEventListener('ended', function() {
                $$('.invitation').setStyle('opacity', '0.9');
            });

        }

        function updateLayout() {
            $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
            positionVideo();
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
                    return;
                }

                var el = $$('.menu').pick(),
                    scroll = window.getScroll(),
                    scrn = window.getSize();
                if ( scroll.y >= scrn.y ) {
                    el.setStyles({
                        'position':'fixed',top:'0',
                        '-moz-box-shadow': '0 10px 6px -6px #ccc',
                        '-webkit-box-shadow': '0 10px 6px -6px #ccc',
                        'box-shadow': '0 10px 6px -6px #ccc'
                    });
                } else {
                    el.setStyles({
                        position:'absolute',top:'',
                        '-mox-box-shadow': '',
                        '-webkit-box-shadow': '',
                        'box-shadow': ''
                    });
                }
            }

            function updateLayout() {
                $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
                positionVideo();
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
                console.log('fallbacks test: no-cssvhunit');

                var el = $('content').getElements('#intro');
                el.setStyles({
                    height: window.getSize().y,
                    width: window.getSize().x
                });

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

       function positionVideo() {
            var vid = $$('.logo-video').pick(),
                vidAspect = vid.videoWidth / vid.videoHeight,
                scrnAspect = window.getSize().x / window.getSize().y;

            console.log(vidAspect, scrnAspect);

            if ( vidAspect < scrnAspect ) {
                vid.setStyles({'width': '100%', 'height': 'auto'});
            } else {
                vid.setStyles({'width': 'auto', 'height': '102%'});
            }

            vid.centerInParent();
        }

        function loadSpeedTest() {

//            console.log('loadSpeedTest: called at', new Date.getTime());

            var slowLoad = window.setTimeout( function() {
                console.log( "the page is taking its sweet time loading" );
            }, 1 );

             document.addEventListener( 'load', function() {
                window.clearTimeout( slowLoad );
            }, false );

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