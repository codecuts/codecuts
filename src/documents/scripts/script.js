var page = new function() {

	this.pageState = {
		menuVisible: false
	};

	this.images = [
		'images/menu_icon.png',
		'images/menu_close.png'
	];

	this.load = function() {
		this.setupEvents();
	};

	this.setupEvents = function() {
		var pageState = this.pageState;

		// callback functions
		function menuToggle() {
			var e = $('content').getElement('.menu'),
				t = $('menu-toggle').getElement('img');
			pageState.menuVisible = !pageState.menuVisible;
			if ( pageState.menuVisible === true ) {
				e.setStyles({left:0});
				t.setProperty('src','images/menu_close.png');
			} else {
				e.setStyles({left:'-9999px'});
				t.setProperty('src','images/menu_icon.png');
			}
		}

		function menuClick(e) {
			new Event(e).stop();
			scroll.start();
			menuToggle();
		}

		// event assignment
		this.addLoadEvent(this.preloader(this.images));
		new Fx.SmoothScroll({duration: 500});
		$('menu-toggle').addEvent('click', menuToggle);
		$$('.menu-item').addEvent('click', menuClick);

	};

	this.preloader = function(images) {
		var img, preload = [];
		if ( document.images ) {
			for (var i=0; i<images.length; i++) {
				img = new Image();
				img.src = images[i];
				preload.push(img);

			}
		}
	};

	this.addLoadEvent = function(func) {
		var oldonload = window.onload;
		if (typeof window.onload !== 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			};
		}
	};

}();

window.addEvent('domready', function() {
    page.load();
});