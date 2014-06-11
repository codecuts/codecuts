module.exports = new Class({

	Implements: [Options, Events],

	container: null,

	elements: null,

	options: {
		container: window,
		parallaxedClass: 'parallaxed',
		factor: 0.5
	},

	initialize: function(options) {
		this.setOptions(options); 
		this.container = document.id(this.options.container);
		this.setupElements();
		this.attach();
	},

	setupElements: function() {
		this.elements = $$('.'+this.options.parallaxedClass);
	},

	getVisibleElements: function() {
		var visible = [],
		 	scroll = this.container.getScroll(),
		 	viewport = this.container.getCoordinates();

	 	viewport.top = viewport.top + scroll.y;
	 	viewport.bottom = viewport.bottom + scroll.y;
	 	viewport.left = viewport.left + scroll.x;
	 	viewport.right = viewport.right + scroll.x;

		this.elements.each(function(e) {
			// isVisible custom function defined in moohelpers.js
			if ( e.isVisible(true) ) {
				visible.push(e);
			}
		});

		return visible;
	},

	attach: function() {
		that = this;
		that.container.addEvent('scroll', that.parallaxScroll);
	},

	detach: function() {
		that = this;
		that.container.removeEvent('scroll', that.parallaxScroll);
	},

	parallaxScroll: function() {
		var newPosY,
			newPosX,
			els = that.getVisibleElements(),
			scroll = that.container.getScroll();
		if ( els.length > 0 ) {
			els.each(function(e) {
				newPosY = (scroll.y - e.getCoordinates().top) * that.options.factor;
				newPosX = (scroll.x - e.getCoordinates().left) * that.options.factor;
				e.setStyle('background-position', newPosX+'px '+newPosY+'px');
			});
		}
	}

});