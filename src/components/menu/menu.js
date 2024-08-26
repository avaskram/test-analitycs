var pageNavigation = function(){
  var $link = $('.js-target-link'),
      $burger = $('.burger'),
      $header = $('.header'),
      $headerClose = $('.header__close'),
      offset = 120,
      tween = TweenMax,
      speed = 1,
      easing = Quint.easeOut;

  $link.on('click', function(){
    var $this = $(this),
        target = $this.attr('href'),
        $target = $(target);

    $header.removeClass('active');

    if ($target.length > 0) {
      targetPos = $target.offset().top - offset;
      tween.to(window,speed,{
        scrollTo:{
          y: targetPos,
          autoKill: false
        },ease:easing
      },50);
      return false;
    }
    else {
      window.location.href = '/'+target
    }
  });

  $burger.on('click',function(){
    $header.addClass('active');
  })
  $headerClose.on('click',function(){
    $header.removeClass('active');
  })
}
window.addEventListener('load',pageNavigation());
