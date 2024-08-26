/// post preview, comment fields focus
var createPost = (function() {
  var postName = formClassName+'--post',
      postEl = '.'+formClassName,
      $container = $(postEl),
      $form = $container.find('form'),
      $button = $(postEl + '__button '),
      $input = $(postEl +'__input'),
      $attachment = $(postEl+'__attachment'),
      isFocused = postName+bem.mod.focus;

  $input.on('focus', function(){
    $container.addClass(isFocused);
  });
  $input.on('input blur', function(){
    var $this = $(this);

    if ($this.val().length>0) {
      $container.addClass(isFocused);
    }
    else {
      $container.removeClass(isFocused);
    }
  });
})();
