/** Holds the page 'view' module instance */
var page = require('./page.js');

/**
 * Event assignment loads the page once the DOM has loaded 
 */ 
window.addEvent('domready', function () {
    'use strict';
    var view = page.getInstance();
    view.load();

});