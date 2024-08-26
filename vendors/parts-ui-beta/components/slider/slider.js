/// slider
///// slick slider initialize
var $slickSlider = $('.js-slick-slider');
$slickSlider.slick();

///// slick slider custom nav
var slickSliderNav = (function(){
  var sliderName = themeName+'-slider',
      sliderEl = '.'+sliderName,
      itemEl = sliderEl+ '__item',
      navEl = sliderEl+ '__nav',
      $nav = $(navEl),
      countMod = sliderName+'--counter',
      shiftMod = sliderName+'--shift';

  if ($nav.length > 0) {
    $nav.each(function(){
      var $this = $(this),
          $slider = $this.parents(sliderEl),
          $container = $slider.find(sliderEl+bem.el.container),
          navLink = sliderEl + bem.el.link,
          countEl = sliderEl+ '__count',
          $link = $(navLink),
          $prev = $this.find(navLink+'--prev'),
          $next = $this.find(navLink+'--next'),
          $list = $slider.find(sliderEl+bem.el.list),
          $countCurrent = $slider.find(countEl+'--current'),
          $countNumber = $slider.find(countEl+'--number');


      $next.on('click', function(){
        $list.slick('slickNext');
      });

      $prev.on('click', function(){
        $list.slick('slickPrev');
      });

      if ($slider.hasClass(countMod)) {
        var slides = $slider.find(itemEl),
            slidesNumber = slides.length;

        $countNumber.text(slidesNumber);

        $link.on('click',function(){
          var currentNumber = $list.slick('slickCurrentSlide') + 1;
          $countCurrent.text(currentNumber);
        });
      }
    });
  }
})();
