/// forms validate (used form validation plugin http://www.formvalidator.net) https://github.com/victorjonsson/jQuery-Form-Validator
var formsValidate = function(callbackLoading,callbackPost,callbackSuccess,callbackError){
  var defaultOptions = {
    errorMessageClass: inputClassName+'__error',
    validateOnBlur: false,
    scrollToTopOnError: false,
    modules: 'all',
    onSuccess: function(form){
      successHanlder(form);
      return false;
    }
  }

  var callOptions = [];

  var validateOptions = $.extend(defaultOptions,callOptions);

  $.validate(validateOptions);

  function successHanlder(form){
    var sendUrl = null,
        formData = form.serialize(),
        $formItem = form.parents(formEl),
        $formButton = $formItem.find('[type="submit"]'),
        $formReset = $(formEl+'__reset'),


        $formResponse = $formItem.find(formEl+'__response'),
        successMod = formClassName+bem.mod.success,
        errorMod = formClassName+bem.mod.error;

    if (form.attr('action')) {
      sendUrl = form.attr('action');
    }
    else {
      if (sendMailFilePath != null) {
        sendUrl = sendMailFilePath;
      }
    }


    var sendForm = function(){
      $.ajax({
        url: sendUrl,
        type: "POST",
        data: formData,
        success: function(){
          if (callbackSuccess != null) {
            callbackSuccess();
          }
          else {
            if (callbackLoading != null) {
              $.when(callbackLoading()).then(function(){
                $formItem.addClass(successMod);
              });
            }
            else {
              $formItem.addClass(successMod);
            }
          }
        },
        error: function(data){
          if (callbackLoading != null){
            $.when(callbackLoading()).then(function(){
              $formItem.addClass(errorMod);
            });
          }
          else {
            $formItem.addClass(errorMod);
          }
        },
        statusCode: {
          400: function(){
            $formItem.addClass(errorMod);
          },
          404: function(){
            $formItem.addClass(errorMod);
          },
          500: function(){
            $formItem.addClass(errorMod);
          }
        }
      });
    }
    if (callbackPost != null) {
      callbackPost();
      $.when(callbackPost()).then(function(){
        sendForm();
      });
    }
    else {
      sendForm();
    }
    $formReset.on('click',function(){
      form.trigger('reset');
      form.find('input,textarea,select').val('');
      form.find(inputEl).removeClass(inputClassName+bem.mod.value+' '+inputClassName+bem.mod.focus);
      $formItem.removeClass(successMod+' '+errorMod);
    });
  }
}
window.addEventListener('load',formsValidate());
