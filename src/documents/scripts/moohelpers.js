/**
 * Module containing helper functions augmenting MooTools
 * @module moohelpers
 **/
module.exports = (function() {

	/** 
	 * Vertically aligns the element upon which it is called.
	 */
    Element.implement('vAlign', function() {
        var e = this,
            p = e.getParent(),
            m = (p.getSize().y - e.getSize().y) / 2;
        e.setStyle('margin-top', m);
    });


    /**
     *  Centers the element upon which it is called within the containning parent element.
     */
    Element.implement('centerInParent', function() {
    	console.log('centerInParent');
    	var e = this,
    		p = e.getParent(),
    		vDif = (p.getSize().y - e.getSize().y) / 2,
    		hDif = (p.getSize().x - e.getSize().x) / 2;

//    	console.log(e.getSize());
//    	console.log('p:', p.getSize().x, p.getSize().y);
//    	console.log('e:', e.getSize().x, e.getSize().y);
//    	console.log(vDif,hDif);

		e.setStyle('margin-top', vDif);
		e.setStyle('margin-left', hDif);
    });

    /** 
     * Returns true if element is visible, false if not, depending on 
     * certain specified options. 
     *
     * @param {Boolean} partial Contains boolean determing if method should count 
     *     element visible if only partially visible; default is false.
     * @param {string} direction Contains string (both|vertical|horizontal) dictating whether the element should
     *    be counted as visible against horizontal or vertical constraings; default is 'both'.
     *
     * @return {Boolean} If the element is visible or not.
     */
    Element.implement('isVisible', function(partial,direction) {

    	partial = typeof partial !== 'undefined' ? partial : false;
    	direction = typeof direction !== 'undefined' ? direction : 'both';

    	var el = this.getCoordinates(),
    		view = window.getCoordinates(),
    		scroll = window.getScroll();

    	view.top = view.top + scroll.y;
	 	view.bottom = view.bottom + scroll.y;
	 	view.left = view.left + scroll.x;
	 	view.right = view.right + scroll.x;

	    var topViz = el.top >= view.top && el.top <= view.bottom,
	    	botViz = el.bottom <= view.bottom && el.bottom >= view.top,
	    	leftViz = el.left >= view.left && el.left <= view.right,
	    	rightViz = el.right >= view.left && el.right <= view.right,
	    	vBigViz = el.top < view.top && el.bottom > view.bottom,
	    	hBigViz = el.left < view.left && el.right > view.right,
	    	vViz = partial ? topViz || botViz || vBigViz : ( (topViz && botViz) || vBigViz ),
	    	hViz = partial ? leftViz || rightViz || hBigViz : ( (leftViz && rightViz) || hBigViz );

//	    console.log('view',view);
//	   	console.log('el',el);
//	   	console.log({topViz:topViz, botViz:botViz});

	    if ( direction === 'both' ) {
	    	return vViz && hViz;
	    }
	    else if ( direction === 'vertical' ) {
	    	return vViz;
	    }
	    else if ( direction === 'horizontal' ) {
	    	return hViz;
	    }

    });


	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 * 
	 * @param {int} wait Number of millisecond to wait before function calls itself again.
	 * @param {Boolean} immediate If true then function will be triggered on leading edge instead of trailing.
	 * 
	 * @return {Function} Function that will continue to call itself until no longer invoked.
	 */
	Function.implement('debounce', function(wait, immediate) {
		var timeout, args, context, timestamp, result;

		var func = this;

		var later = function() {
			var last = new Date().getTime() - timestamp;

			if (last < wait && last > 0) {
				timeout = setTimeout(later, wait - last);
			}
			else {
				timeout = null;
				if (!immediate) {
				  result = func.apply(context, args);
				  if (!timeout) {
				  	context = args = null;
				  }
				}
			}
	    };

		return function() {
			context = this;
	    	args = arguments;
	    	timestamp = new Date().getTime();
	    	var callNow = immediate && !timeout;
	     	if (!timeout) {
	    		timeout = setTimeout(later, wait);
	    	}
	      	if (callNow) {
	        	result = func.apply(context, args);
	        	context = args = null;
	      	}
	      	return result;
   		};

	});

})();