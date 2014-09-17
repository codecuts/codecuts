/** 
 * Page module is the websites 'view'. It is instantiated as a singleton.
 * The Singleton instance is created when the object is loaded for the first
 * time and the module's getInstance() function is called.
 *
 * @module page 
 **/
module.exports = (function () {
    'use strict';

    /** Holds the singleton instance */
    var instance;

    /** Holds the parallax module once loaded. */
    var parallax;

    /** Holds the MooTools scroll class, instantiated right away */
    var scroll = new Fx.Scroll(window, {
        duration: 750, 
        offset: {
            x: 0,
            y: -60
        }
    });

    /**
     * Initializes the page module Singleton instance.
     * 
     * Contains all of the functions for the module. The methods that are public
     * are declared in the object returned by the function; the method declared 
     * in the body of the function are private.
     * 
     * @constructor
     * @return {object} An object containing the module's public properties and methods.
     */
    function init() {
        /**
         * Singleton instance declared here. All private functions appear
         * inside this function.
         */

        /** Load necessary modenrizr tests */
        require('browsernizr/test/css/vhunit');
        require('browsernizr/test/css/vwunit');
        require('browsernizr/test/css/flexbox');
        require('browsernizr/test/video');
        var Modernizr = require('browsernizr');

        /** Load custom helper functions */
        require('./moohelpers.js');

        /** Load Parallax module */
        var Parallax = require('./parallax.js');

        /** Tracks some information about the state of the page */
        var pageState = {
            menuVisible: false
        };

        /** Boolean captures whether the page has been loaded on a mobile device or not */
        var isDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

        /** For preloading some images */
        var preload = imagesToPreload;

        /**
         * 'Attaches' all the necessary events to the page
         */
        function attach() {
           
            /** Activate smooth scrolling on menu anchor click */
            new Fx.SmoothScroll({
                duration: 750, 
                offset: {
                    x:0,
                    y: -60
                }
            });

            //Event assignments
            window.addEvent('load', preloader(preload));
            window.addEvent('load', activateParallax);
            window.addEvent('resize', manageParallax.debounce(250));
            window.addEvent('resize', updateLayout.debounce(250));
            window.addEvent('scroll', menuFix);

        }

        /**
         * Checks for instances in which certain 'fallbacks' are needed
         * to make page work correctly on certain browsers. Uses Modernizr 
         * tests, for example, to determine capabilities of client's browser.
         */
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


       /**
        * Handles the instance in which the page is loaded with a hash.
        * 
        * Checks if the page is being loaded with a hash designation.
        * If so, the method adds an event that scrolls to the appropriate
        * hash location when the page has fully loaded.
        */
//        function checkForHash() {
//            var hash = window.location.hash.replace('/','');
//
//            if ( hash === '' ) {
//                return;
//            }
//
//            window.addEvent('load', function() {
//                scroll.toElement($$(hash).pick());
//            });
//
//        }

        /**
         * Activates the parallax effect on the page
         */
        function activateParallax() {
            console.log('activateParallax called');

            parallax = new Parallax({
                parallaxedClass: 'gap',
                factor: 0.5
            });

            if ( isDevice ) {
                parallax.detach();
            }

        }

        /**
         * Manages the parallax effect on the page
         * 
         * If the page has been loaded on the mobile device, the 
         * parallax effect is disabled.
         */
        function manageParallax() {

            if ( isDevice ) {
                parallax.detach();
            } else {
                parallax.attach();
            }

        }

        /**
         * Manages the initial layout setup for the page
         */
        function setupLayout() {
//            alert($$('html').getProperty('class'));

            fallbacks();

            window.addEvent('load', function() {

                $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
                console.log($$('.gap').getStyle('height')[0]);
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

        
        /**
         * Handles preloading of images designated in the module's
         * 'image' property.
         */
        function preloader(images) {
            var img;
            if ( images ) {
                for (var i=0; i<images.length; i++) {
                    img = new Image();
                    img.src = images[i];
                }
            }
        }

         /** 
         * Handles the 'fixing' of the menu to top of page when user scrolls downward.
         */
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

        /**
         * Handles the update of the layout when page is resized.
         */
        function updateLayout() {
            $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
            positionVideo();
        }

        /** 
         * Positions the intro logo video correctly on the page.
         */
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

// This was a function that might help detect if the client's internet connection was too slow to load the logo video.
//        function loadSpeedTest() {
//
//            console.log('loadSpeedTest: called at', new Date.getTime());
//
//            var slowLoad = window.setTimeout( function() {
//                console.log( "the page is taking its sweet time loading" );
//            }, 1 );
//
//             document.addEventListener( 'load', function() {
//                window.clearTimeout( slowLoad );
//           }, false );
//       }

        return {

            // Public variables and functions

            /** 
             * Calls the functions needed to load the page
             */
            load: function () {
                setupLayout();
                attach();
//              checkForHash();
            }

        };
    }

    return {

        /** 
         * Returns the Singleton instance of the page module.
         * @return {Object} Instance of the Singleton page module.
         */
        getInstance: function() {

            if ( !instance ) {
                instance = init();
            }

            return instance;

        }
    };

})();