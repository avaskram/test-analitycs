/// TABS
///// tabs switch slider animation
var tabsNavInit = function(){
  var tabs = themeEl + '-tabs',
      nav = tabs + '__nav',
      item = tabs + bem.el.item,
      link = tabs + bem.el.link,
      containerName = tabs + bem.el.container,
      nav = tabs + '__nav',
      slider = tabs + '__slider',
      $slider = $(slider),
      $link = $(link);

  function tabsInit() {
    $link.each(function(){
      var $this = $(this),
          $parent = $this.parents(tabs),
          $nav = $parent.find(nav),
          $container = $parent.find(containerName),
          $item = $container.find(item),
          $links = $nav.find(link);

      $links.eq(0).addClass(activeClassName);
      $item.eq(0).addClass(activeClassName);

      $this.on('click', function () {
        var itemIndex = $this.index(),
            $currentItem = $item.eq(itemIndex);
        if (!$this.hasClass('js-toggle')) {
          $item.removeClass(activeClassName);
          $links.removeClass(activeClassName);
          $currentItem.addClass(activeClassName);
          $this.addClass(activeClassName);
        }
        tabsSliderAnimate();
      });
    });
    tabsSliderAnimate();
  }

  function tabsSliderAnimate() {
    $slider.each(function () {
      var $this = $(this),
          $nav = $this.parent(),
          $currentItem = $nav.find(link+'.'+activeClassName),
          containerPosLeft = $nav.offset().left,
          containerPosTop = $nav.offset().top,
          itemPosLeft = $currentItem.offset().left,
          itemPosTop = $currentItem.offset().top,
          sliderPosLeft = itemPosLeft - containerPosLeft,
          sliderPosTop = itemPosTop - containerPosTop,
          sliderWidth = $currentItem.innerWidth();

      $this.attr('style','width:'+sliderWidth+'px; transform: translate3d('+sliderPosLeft+'px,0px,0.0001px);');
    });
  }

  $window.on('load', tabsInit(),tabsSliderAnimate());
  $window.on('resize', tabsSliderAnimate());
}

tabsNavInit();
