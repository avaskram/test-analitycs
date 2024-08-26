var parallaxOnHover = function(el) {

  if (!isMobile.any()){
    var hoveredMod = themeName+'-parallax--hovered',
        exceptionHoveredMod = 'parallax-hover';

    $(el).mousemove(function(e){
      var $this = $(this),
          $target = $($this.data('parallax-target')),
          $exceptions = $($this.data('parallax-exceptions')),
          duration = $this.data('parallax-duration'),
          easing = $this.data('parallax-easing'),
          offset = $this.offset(),
          xPos = e.pageX - offset.left,
          yPos = e.pageY - offset.top,
          mouseXPercent = Math.round(xPos / $this.width() * 100),
          mouseYPercent = Math.round(yPos / $this.height() * 100),
          diffX = $(el).width(),
          diffY = $(el).height(),
          targetX = diffX * (mouseXPercent/100),
          targetY = diffY * (mouseYPercent/100);
          

      $target.each(function(){
        var $this = $(this),
            ratioX = $this.data('parallax-ratio-x'),
            ratioY = $this.data('parallax-ratio-y');
            

        TweenMax.to($this, duration,{
          x: targetX/ratioX,
          y: targetY/ratioY,
          ease: easing
        });
      });

      $this.on('click',function(){
        if ($body.hasClass(exceptionHoveredMod)){
          $exceptions.each(function(){
            if ($this.hasClass(hoveredMod) && ($this.attr('target').length > 0)){
              extentionTarget = $(this).attr('href');
              window.open(extentionTarget);
            }
          });
        }
      });

      $exceptions.each(function(){
        var $this = $(this),
            thisTop = $this.offset().top,
            thisHeight = $this.outerHeight(),
            thisLeft = $this.offset().left,
            thisWidth = $this.outerWidth(),
            thisX = thisLeft + thisWidth,
            thisY = thisTop + thisHeight,
            isHovered = $body.find($exceptions).hasClass(hoveredMod);
  
        $this.css('pointer-events','all');
  
        if (e.pageY>thisTop && e.pageY<thisY && e.pageX>thisLeft && e.pageX<thisX) {
          $this.addClass(hoveredMod);
          $body.addClass(exceptionHoveredMod);
        }
        else {
          $this.removeClass(hoveredMod);
          if (isHovered == false) {
            $body.removeClass(exceptionHoveredMod);
          }
        }
      });

           // $shadow.each(function(){
      //   var $this = $(this),
      //       $source = $($this.data('parallax-source')),
      //       ratioX = $source.data('parallax-ratio-x'),
      //       ratioY = $source.data('parallax-ratio-y'),
      //       scaleValue = parseFloat(1+(targetY/ratioY)*0.005),
      //       blurValue = Math.abs(parseFloat(1+(targetY/ratioY)*0.15));

      //   TweenMax.to($this, duration,{
      //     x: targetX/ratioX,
      //     scale: scaleValue,
      //     webkitFilter: 'blur('+blurValue+'px)',
      //     ease: easing
      //   });
      // });
    });

   
  }
  
}
$('.js-hover-parallax').each(function(){
  var $this = $(this);
  parallaxOnHover($this);
});
