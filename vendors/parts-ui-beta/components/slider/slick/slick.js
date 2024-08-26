/// slider
///// slick slider initialize
var $slickSlider = $('.js-slick-slider');
$slickSlider.slick();

///// slick slider custom nav
var slickSliderNav = (function(){
  var sliderName = themeName+'-slider',
      sliderEl = '.'+sliderName,
      shiftMod = sliderName+'--shift',
      $nav = $(sliderEl+ '__nav');

  if ($nav.length > 0) {
    $nav.each(function(){
      var $this = $(this),
          $slider = $this.parents(sliderEl),
          $container = $slider.find(sliderEl + '__container'),
          navLink = sliderEl + '__link',
          $prev = $this.find(navLink+'--prev'),
          $next = $this.find(navLink+'--next'),
          $list = $slider.find(sliderEl+'__list');

      $next.on('click', function(){
        $list.slick('slickNext');
      });

      $prev.on('click', function(){
        $list.slick('slickPrev');
      });

      var shiftNextClass = sliderName+'--shift-left',
          shiftPrevClass = sliderName+'--shift-right';

      ///// shift container to arrows hover
      if ($slider.hasClass(shiftMod)) {
        $next.hover(function(){
          $slider.addClass(shiftNextClass);
        }, function(){
          $slider.removeClass(shiftNextClass);
        });

        $prev.hover(function(){
          $slider.addClass(shiftPrevClass);
        }, function(){
          $slider.removeClass(shiftPrevClass);
        });
      }
    });
  }
})();
