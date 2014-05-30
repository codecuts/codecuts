var page = require('./page.js');

window.addEvent('domready', function () {
    'use strict';

    var view = page.getInstance();
    view.load();
});