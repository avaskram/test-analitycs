$.fn.alertMessage = function(options) {
  var alertName = themeName+'-alert',
      alertBlock = alertName,
      alertContainer = alertBlock+bem.el.container,
      alertSection = alertBlock+bem.el.section,
      alertMessage = alertBlock+bem.el.section,
      alertEl = '.'+alertName;

  var template = '<div class="'+alertName+'">'+
                    '<div class="'+alertContainer+'">'+
                      '<div class="'+alertSection+'">'+
                        '<div class="'+alertName+'__message">'+
                          '<div class="'+alertName+'__close"></div>'+
                          '<div class="'+alertName+'__title"></div>'+
                          '<div class="'+alertName+'__text"></div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>';

  var options = $.extend({
    title: null,
    text: null,
    timeout: null,
    center: false
  },options);

  var init = function(){
    var target = $(this);

    $.when(target.prepend(template).addClass(alertName)).then(function(){
      var $message = target.find('.'+alertName+'__message');

      if (options.title != ''){
        target.find(alertEl+'__title').html(options.title);
      }
      else {
        target.find('.'+alertName+'__title').remove();
      }

      if (options.text != ''){
        target.find('.'+alertName+'__text').html(options.text);
      }
      else {
        target.find('.'+alertName+'__text').remove();
      }

      if (options.center == true){
        target.find('.'+alertName+'__message').addClass(alertName+'__message--center');
      }
      if (options.timeout != ''){
        var $body = target.find('.'+alertName+'__body'),
            $close = target.find('.'+alertName+'__close');
        $close.remove();

        setTimeout(function () {
          $.when($message.removeClass(activeClassName)).then(function(){
            $body.remove();
            target.removeClass(alertName);
          });
        }, options.timeout);
      }
      $message.addClass(activeClassName);
    });

    function alertClose(){
      var $this = $(this),
          $body = $this.parents('.'+alertName+'__body'),
          $container = $this.parents('.'+alertName);

      $container.removeClass(alertName);
      $body.remove();
    }
    $body.on('click', alertEl+'__close', alertClose);
  }
  return this.each(init);
};
