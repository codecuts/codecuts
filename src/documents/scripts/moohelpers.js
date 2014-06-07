module.exports = (function() {

    Element.implement('vAlign', function() {
        var e = this,
            p = e.getParent(),
            m = (p.getSize().y - e.getSize().y) / 2;
        e.setStyle('margin-top', m);
    });

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


	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
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