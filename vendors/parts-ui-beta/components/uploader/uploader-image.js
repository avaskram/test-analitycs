///// image uploader
(function imageUploader(){
  var uploadArea = uploaderClassName+'--area',
      uploaderPreview = uploaderClassName+'__image',
      uploadedClass = uploaderClassName+'--uploaded';

  function imageuploadArea(input){
    var $input = $(input)
        $container = $input.parents('.'+uploadArea),
        $target = $($container.find('.'+uploaderPreview)),
        $mirror = $($input.data('mirror'));

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var image = e.target.result;
        var styleBg = 'background-image: url("' + image + '")';
        $target.attr('style', styleBg);
        $mirror.attr('style', styleBg);
      }
      reader.readAsDataURL(input.files[0]);

      setTimeout(function() {
        $container.addClass(uploadedClass);
      }, 200);
    }
  }

  $body.on('change','.js-upload-area',function(){
    imageuploadArea(this);
  });

  function clearUploadArea(el){
    var $container = $(el.parents('.'+uploadArea)),
        $target = $($container.find('.'+uploaderPreview)),
        $input = $container.find('input');
        $mirror = $($input.data('mirror'));


    $input.val('').change();
    $container.removeClass(uploadedClass);

    setTimeout(function() {
      $target.removeAttr('style');
      $mirror.removeAttr('style');
    }, 500);
  }

  $body.on('click', '.js-clean-upload-area', function(){
    var $this = $(this);
    clearUploadArea($this);
  });
})();
