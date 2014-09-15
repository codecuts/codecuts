/**
 * Parallax module enables a Parallax effect.
 * @module parallax
 */
module.exports = new Class({

	Implements: [Options, Events],

	/** The object within which the parallax effect will function */
	container: null,

	/** The elements, designated by a .class specified in options, upon which the parallax effect will operate */
	elements: null,

	/** 
	 * Contains key configuration options, including the container, which elements receive parallax effect, and 
	 * the Parallax 'factor'.
	 */
	options: {
		container: window,
		parallaxedClass: 'parallaxed',
		factor: 0.5
	},

	/** 
	 * @constructor
	 */
	initialize: function(options) {
		this.setOptions(options); 
		this.container = document.id(this.options.container);
		this.setupElements();
		this.attach();
	},

	/**
	 * Sets the class property elements, i.e. the elements that will receive parallax effect.
	 */
	setupElements: function() {
		this.elements = $$('.'+this.options.parallaxedClass);
	},

	/** 
	 * Returns a list of the parallaxed elements that are visible on the page.
	 * @return {Array} Containing a list of the visible parallaxed elements.
	 */
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

	/** 
	 * 'Attaches' the Parallax scroll event to the page.
	 */
	attach: function() {
		that = this;
		that.container.addEvent('scroll', that.parallaxScroll);
	},

	/** 
	 * 'Detaches' the Parallax scroll event from the page.
	 */
	detach: function() {
		that = this;
		that.container.removeEvent('scroll', that.parallaxScroll);
	},

	/** 
	 * The Parallax function, called as a callback to the page's scroll event.
	 */
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