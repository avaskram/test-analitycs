///// video link
(function playVideoFrame(el){
  $body.on('click',el, function(){
    var videoName = themeName+'-video',
        videoEl = '.'+videoName,
        $this = $(this),
        $videos = $(videoEl),

        $iframes = $videos.find('iframe'),
        $videoItem = $this.parents(videoEl),

        $iframe = $videoItem.find('iframe'),
        isPlayedClass = videoEl+'--played';

    $videos.removeClass(isPlayedClass);

    $videoItem.addClass(isPlayedClass);

    $iframe.each(function(){
      var $this = $(this),
          src = $this.attr('src');
          newSrc = src.replace('autoplay=1','');
      $this.attr('src', newSrc);
    });
    $iframe[0].src += "&autoplay=1";
  });

})('.js-video-play');
