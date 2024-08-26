/////// input number plus-minus change buttons
var inputCounter = function(plus,minus){
  var $plus = $(plus),
      $minus = $(minus),
      disabledMod = inputClassName+'__button--disabled';

  var hasCounter = $plus.length > 0 || $minus.length > 0;

  if (hasCounter){
    $body.on('click',minus,function(){
      var $this = $(this),
          $counter = $this.data('counter'),
          $container = $this.closest($counter),
          $input = $container.find('input');

      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count).change();
      if (count == 1) {
        $this.addClass(disabledMod);
      }
      else {
        $this.removeClass(disabledMod);
      }
      if ($container.attr('data-count-target')) {
        var $target =  $($container.data('count-target')),
            $totalEl = $($container.data('count-total')),
            total = parseInt($target.text() * count);
        $totalEl.text(total);
      }
    });

    $body.on('click',plus,function(){
      var $this = $(this),

          $counter = $this.data('counter'),
          $container = $this.parents($counter),
          $input = $container.find('input'),
          $minus = $container.find(minus);

      count = parseInt($input.val()) + 1
      $input.val(count).change();
      $minus.removeClass(disabledMod);

      if ($container.attr('data-count-target')) {
        var $target =  $($container.data('count-target')),
            $totalEl = $($container.data('count-total')),
            total = parseInt($target.text() * count);
        $totalEl.text(total);
      }
    });
  }
}('.js-input-plus','.js-input-minus');
