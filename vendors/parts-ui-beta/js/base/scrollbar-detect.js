///// window scrollbar detect
var checkHasScrollbar = function(){
	var htmlEl = document.documentElement,
			hasVerticalScroll = document.body.scrollHeight > document.body.clientHeight;

	if (hasVerticalScroll) {
		htmlEl.classList.remove(documentWithoutScrollbarClassName);
		htmlEl.classList.add(documentHasScrollbarClassName);
	}
	else {
		htmlEl.classList.remove(documentHasScrollbarClassName);
		htmlEl.classList.add(documentWithoutScrollbarClassName);
	}
}
window.addEventListener('load',checkHasScrollbar);
window.addEventListener('resize',checkHasScrollbar);
