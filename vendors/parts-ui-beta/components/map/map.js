function mapInit(){
  var mapOptions = {
    center: mapCenter,
    zoom: mapZoom,
    mapTypeControl: false,
    scrollwheel: false,
    disableDefaultUI: true,
    styles: mapStyle
  }
  var map = new google.maps.Map(mapElement,mapOptions);
  var marker = new google.maps.Marker({
    position: mapCenter,
    map: map,
    icon: {
      url: markerSrc,
      scaledSize: new google.maps.Size(markerWidth, markerHeight)
    }
  });
  $(themeEl+'-map__zoom--in').on('click',function(){
    map.setZoom(map.getZoom() + 1);
  });
  $(themeEl+'-map__zoom--out').on('click',function(){
    map.setZoom(map.getZoom() - 1);
  });
}
