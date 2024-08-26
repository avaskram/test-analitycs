var toggleList = function(el,target){
  var container = themeName+'-accordeon',
      containerEl = '.'+container,
      itemEl = themeEl+'-accordeon'+bem.el.item,
      inner = target,
      tween = TweenLite,
      toggleMod = container+'--toggle',
      duration = .34,
      $toggle = $(el);

  $toggle.on('click', function(){
    var $this = $(this),
        $item = $this.parents(itemEl),
        $inner = $item.find(inner),
        $container = $this.parents(containerEl),
        $items = $container.find(itemEl),
        $active = $container.find(itemEl+'.'+activeClassName).find(inner);

    if ($container.hasClass(toggleMod)) {
      if ($item.hasClass(activeClassName)){
        $items.removeClass(activeClassName);
        $item.removeClass(activeClassName);
        tween.set($inner,{height:0});
        tween.from($inner,duration,{height:'auto',ease: Quint.easeOut});
        tween.to($inner,duration,{height:0,ease: Quint.easeOut});
      }
      else {
        tween.from($active,duration,{height:'auto',ease: Quint.easeOut});
        tween.to($active,duration,{height:0,ease: Quint.easeOut});
        $items.removeClass(activeClassName);
        $item.addClass(activeClassName);
        tween.set($inner,{height:'auto'});
        tween.from($inner,duration,{height:0,ease: Quint.easeOut});
      }
    }

    else {
      if ($item.hasClass(activeClassName)){
        $item.removeClass(activeClassName);
        tween.to($inner,duration,{height:0,ease: Quint.easeOut})
      }
      else {
        $item.addClass(activeClassName);
        tween.set($inner,{height:'auto'})
        tween.from($inner,duration,{height:0,ease: Quint.easeOut})
      }
    }
  });
}(themeEl+'-accordeon__heading',themeEl+'-accordeon__content');
