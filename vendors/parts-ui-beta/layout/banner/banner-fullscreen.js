///// banner fullscreen resize
var bannerFullscreenResize = (function(el){
	window.addEventListener('load', function (){
		var windowHeight = window.innerHeight;
		el.css({
			height: windowHeight + 'px',
			maxHeight: windowHeight + 'px'
		});

		window.addEventListener('resize', function() {
			var windowHeight = window.innerHeight;
			el.css({
				height: windowHeight + 'px'
			});
		});
		window.addEventListener('scroll', function(){
			el.css({
				height: windowHeight + 'px'
			});
		});
	});
})($(bannerEl+'--fullscreen'));
