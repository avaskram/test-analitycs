/// slider
///// slick slider initialize
var $slickSlider = $('.js-slick-slider');

$slickSlider.slick();

///// slick slider custom nav
var slickSliderNav = (function(){
  var sliderName = themeName+'-slider',
      sliderEl = '.'+sliderName,
      shiftMod = sliderName+'--shift',
      shiftNextMod = sliderName+'--shift-left',
      shiftPrevMod = sliderName+'--shift-right',
      $nav = $(sliderEl+ '__nav');

  if ($nav.length > 0) {
    $nav.each(function(){
      var $this = $(this),
          $slider = $this.parents(sliderEl),
          $container = $slider.find(sliderEl + bem.el.container),
          navLink = sliderEl + bem.el.link,
          $prev = $this.find(navLink+'--prev'),
          $next = $this.find(navLink+'--next'),
          $list = $slider.find(sliderEl+bem.el.list);


      $next.on('click', function(){
        $list.slick('slickNext');
      });

      $prev.on('click', function(){
        $list.slick('slickPrev');
      });

      ///// shift container to arrows hover
      if ($slider.hasClass(shiftMod)) {
        $next.hover(function(){
          $slider.addClass(shiftNextMod);
        }, function(){
          $slider.removeClass(shiftNextMod);
        });
        $prev.hover(function(){
          $slider.addClass(shiftPrevMod);
        }, function(){
          $slider.removeClass(shiftPrevMod);
        });
      }
    });
  }
})();
