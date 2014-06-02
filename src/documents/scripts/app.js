var page = require('./page.js');
var Parallax = require('./parallax.js');

window.addEvent('domready', function () {
    'use strict';

    var view = page.getInstance();
    view.load();

});

window.addEvent('load', function () {
    'use strict';

    var parallax = new Parallax({
        parallaxedClass: 'gap',
        factor: 0.5
    });
});
