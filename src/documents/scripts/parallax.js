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
			var elBounds = e.getCoordinates();
			if ( (elBounds.top >= viewport.top && elBounds.top <= viewport.bottom) ||
				 (elBounds.bottom <= viewport.bottom && elBounds.bottom >= viewport.top) ) {
				visible.push(e);
			}
		});

		return visible;
	},

	attach: function() {
		that = this;
		this.container.addEvent('scroll', this.parallaxScroll);
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
				console.log(e.getStyle('background-position'));
			});
		}
	}

});