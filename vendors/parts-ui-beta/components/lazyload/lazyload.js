$(themeEl+'-lazy').each(function(){
  var $this = $(this),
      wh = window.innerHeight,
      scrollOffset= wh/3;
  initOnScroll($this,scrollOffset);
});
