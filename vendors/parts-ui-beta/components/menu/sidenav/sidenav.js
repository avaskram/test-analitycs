var toggleSideNav = function(options){
  var tween = TweenMax,
      navName = themeName+'-sidenav';
      navEl = '.'+navName,
      navToggle = navEl+bem.el.toggle,

      $nav = $(navEl),
      $toggle = $(navToggle),
      $content = $(pageEl+bem.el.content),
      isHidden = navName+bem.mod.hidden;

  var defaults = {
    duration: .15,
    width: 250,
    hiddenWidth: 46,
    type: 'click'
  }

  var options = $.extend(options,defaults);

  var sideMenuShow = function() {
    tween.from($content,duration,{paddingLeft: hiddenWidth, ease: Quint.easeOut});
    tween.to($content,duration,{paddingLeft: defaultWidth, ease: Quint.easeOut});

    tween.from($nav,duration,{width: hiddenWidth, ease: Quint.easeOut});
    tween.to($nav,duration,{width: defaultWidth, ease: Quint.easeOut});
    $nav.removeClass(isHidden);
  }
  var sideMenuHide = function(){
    tween.from($content,duration,{paddingLeft: defaultWidth, ease: Quint.easeOut});
    tween.to($content,duration,{paddingLeft: hiddenWidth, ease: Quint.easeOut});
    tween.from($nav,duration,{width: defaultWidth, ease: Quint.easeOut});
    tween.to($nav,duration,{width: hiddenWidth, ease: Quint.easeOut});
    $nav.addClass(isHidden);
  }
  if (options.type == 'click') {
    $toggle.on('click',function(){
      if ($nav.hasClass(isHidden)) {
        sideMenuShow();
      }
      else {
        sideMenuHide();
      }
    });
  }

  if (options.type == 'hover') {
    $nav.hover(function(){
      sideMenuShow();
    },function(){
      sideMenuHide();
    });
  }
};
