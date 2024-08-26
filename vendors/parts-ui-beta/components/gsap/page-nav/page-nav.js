var onePageNavigation = function(el){
  var $navLink = el;

  $navLink.each(function(){
    var $this = $(this),
        targetId = $this.attr('href'),
        $targetEl = $(targetId);

    $window.on('scroll resize load', function(){
      var wh = $window.height(),
          scrollProgress = $window.scrollTop(),
          windowBottom = (scrollProgress+wh),
          windowHalf = wh/2,
          windowCenter = (scrollProgress+windowHalf),
          elTop = $(targetId).offset().top,
          elBottom = (elTop+wh),
          elCenter = (elTop+(wh/2));

      if ((elTop+windowHalf) < windowBottom && (elBottom+windowHalf) > windowBottom) {
        $this.addClass(activeClassName);
      }
      else {
        $this.removeClass(activeClassName);
      }
    });

    $window.on('scroll', function(){
      $targetEl.each(function(){
        var $this = $(this),
            wh = window.innerHeight,
            elTop = $(targetId).offset().top,
            elHeight = $(targetId).innerHeight(),
            elBottom = elTop+elHeight,
            $link = $('[href="#'+$this.attr('id')+'"]'),
            windowTop = document.body.scrollTop,
            windowBottom = windowTop+wh,
            windowHalf = wh/2,
            windowCenter = windowTop+windowHalf;


        if (elTop < windowBottom && elBottom > windowBottom) {
          $navLink.removeClass(activeClassName);
          $link.addClass(activeClassName);
        }
        else {
          $navLink.removeClass(activeClassName);
          $link.removeClass(activeClassName);
        }
      });
    });

    $this.on('click', function(){
      $navLink.removeClass(activeClassName);
      $this.addClass(activeClassName);
      TweenMax.to($window,0.8,{
        scrollTo:{
          y: targetId,
          offsetY: 100
        },
        ease: Quint.easeInOut
      });
      return false;
    });
  });
}($(headerEl+'__link'));
