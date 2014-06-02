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

})();