/**
 * Page module is the websites 'view'. It is instantiated as a singleton.
 * The Singleton instance is created when the object is loaded for the first
 * time and the module's getInstance() function is called. Private methods and
 * variables are located within the init() method; public functions are contained 
 * in the Object returned by init().
 * @module page
 *
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

        /** Contains various information about the page and the client it is running on */
        var pageState = {
            path: window.location.pathname,
            isHome: (window.location.pathname === '/') ? true : false,
            isDevice: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false,
            isIE: (/MSIE|Trident.*rv\:11\./i.test(navigator.userAgent)) ? true : false
        };

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
            window.addEvent('load', activateParallax);
            window.addEvent('resize', manageParallax.debounce(250));
            window.addEvent('resize', updateLayout.debounce(250));
            window.addEvent('scroll', menuFix);
            window.addEvent('load', preloader);
            window.addEvent('onhashchange', function() { console.log('eyp'); });
            window.addEvent('onunload', function() {console.log('erp'); });

        }

        /**
         * Event callback that manages the initial layout setup for the page
         */
        function setupLayout() {

            fallbacks();

            /** Layout stuff to do on the home page */
            if (pageState.isHome === true) {

                $$('.gap').setStyle('height', 0.5625 * window.getSize().x);

                $$('.logo-video').pick().addEventListener('loadedmetadata', function() {
                    positionVideo();
                });

                $$('.logo-video').pick().addEventListener('ended', function() {
                    $$('.invitation').setStyle('opacity', '0.9');
                });

            }

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

            if ( pageState.isIE === true ) {
                // fallback to logo image 
                $$('.branding').setStyle('background',"center/cover url('/images/logo_fallback.jpg') no-repeat");
                $$('.logo-video').setStyle('display','none');
                $$('.invitation').setStyle('opacity', '0.9');
            }

        }
    
        /**
         * Event callback that handles the update of the layout when page is resized.
         */
        function updateLayout() {
            console.log('updatelayout');
            $$('.gap').setStyle('height', 0.5625 * window.getSize().x);
            positionVideo();
        }

         /**
         * Event callback that activates the parallax effect on the page
         */
        function activateParallax() {

            parallax = new Parallax({
                parallaxedClass: 'gap',
                factor: 0.5
            });

            if ( pageState.isDevice ) {
                parallax.detach();
            }

        }

        /**
         * Event callback that manages the parallax effect on the page
         * 
         * If the page has been loaded on the mobile device, the 
         * parallax effect is disabled.
         */
        function manageParallax() {

            if ( pageState.isDevice ) {
                parallax.detach();
            } else {
                parallax.attach();
            }

        }

        /**
         * Event callback that preloads images 
         */
        function preloader() {
            var img,
                images = preload;
            if ( images ) {
                for (var i=0; i<images.length; i++) {
                    img = new Image();
                    img.src = images[i];
                }
            }
        }

         /** 
         * Event callback that handles the 'fixing' of the menu to top of page when user scrolls downward.
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
         * Positions the intro logo video correctly on the page.
         */
       function positionVideo() {
            var vid = $$('.logo-video').pick(),
                vidAspect = vid.videoWidth / vid.videoHeight,
                scrnAspect = window.getSize().x / window.getSize().y;

            if ( vidAspect < scrnAspect ) {
                vid.setStyles({'width': '100%', 'height': 'auto'});
            } else {
                vid.setStyles({'width': 'auto', 'height': '102%'});
            }

            vid.centerInParent();
        }

        return {

            // Public variables and functions

            /** 
             * Calls the functions needed to load the page
             */
            load: function () {
                setupLayout();
                attach();
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