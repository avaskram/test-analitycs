var marker_src = '/files/theme/img/map-marker2.png';
    var lng = 27.8041973877;
    var lat = 53.7057912423;
    var zoom = 6;

    var points = [];

            points.push({'lng': 27.6088001318, 'lat': 54.0563711064, 'title': "NG House", 'place': "Минск, Беларусь", 'id': 54 });

            points.push({'lng': 27.5913265514, 'lat': 53.9357110362, 'title': "BD Apartment", 'place': "Минск, Беларусь", 'id': 55 });

            points.push({'lng': 27.5199368763, 'lat': 53.9098516932, 'title': "SKR Apartment", 'place': "Минск, Беларусь", 'id': 86 });

            points.push({'lng': 27.6502064037, 'lat': 53.9265771197, 'title': "JSM Apartment", 'place': "Минск, Беларусь", 'id': 87 });

            points.push({'lng': 20.5072155762, 'lat': 54.7129226798, 'title': "KNB Office", 'place': "Калининград, Россия", 'id': 89 });

            points.push({'lng': 28.4544506836, 'lat': 54.1765422849, 'title': "DD Resort", 'place': "Борисов, Беларусь", 'id': 91 });

            points.push({'lng': 37.5958052444, 'lat': 55.7537232337, 'title': "Ceramic Pavilion", 'place': "Москва, Россия", 'id': 166 });

            points.push({'lng': 0, 'lat': 0, 'title': "Periapt Chair", 'place': "", 'id': 185 });

            points.push({'lng': 28.0773106384, 'lat': 54.0253836258, 'title': "Renovation", 'place': "Смолевичи, Беларусь", 'id': 186 });

            points.push({'lng': 27.695020752, 'lat': 53.9271772655, 'title': "IBA Stella", 'place': "Минск, Беларусь", 'id': 202 });

            points.push({'lng': 27.5658562946, 'lat': 53.8992202678, 'title': "Travel agency", 'place': "Минск, Беларусь", 'id': 206 });

            points.push({'lng': 27.5414267349, 'lat': 53.9004023732, 'title': "SHR Penthouse", 'place': "Минск, Беларусь", 'id': 211 });


function initMap() {
	var secheltLoc = new google.maps.LatLng(lat, lng, zoom);
	var myMapOptions = {
		zoom: zoom,
		center: secheltLoc,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		styles: []
	};
	var theMap = new google.maps.Map(document.getElementById("map"), myMapOptions);

	points.forEach(function (item, i, points) {
		var marker = new google.maps.Marker({
			map: theMap,
			draggable: false,
			position: new google.maps.LatLng(item.lat, item.lng, 13),
			visible: true,
			icon: {
				url: marker_src,
				scaledSize: new google.maps.Size(13, 13)
			},
			class: 'pu-lnk',
			// data_id: '1'
		});

		var boxText = document.createElement("div");
		boxText.style.cssText = "";
		boxText.innerHTML = '<span class="map-baloon" style="font-family: proxima cond light" ><span>' + item.title + '</span><span>' + item.place + '</span></span>';
		var myOptions = {
			content: boxText,
			disableAutoPan: false,
			maxWidth: 0,
			pixelOffset: new google.maps.Size(-1, -100),
			zIndex: null,
			boxStyle: {
				opacity: 1,
				width: "250px"
			},
			contextmenu: true,
			closeBoxMargin: "0",
			closeBoxURL: "",
			infoBoxClearance: new google.maps.Size(1, 1),
			isHidden: false,
			pane: "floatPane",
			enableEventPropagation: false
		};
		google.maps.event.addListener(marker, "mouseover", function (e) {
			ib.open(theMap, this);
		});

		google.maps.event.addListener(marker, "mouseout", function (e) {
			ib.close(theMap, this);
		});

		google.maps.event.addListener(marker, 'click', function () {
			$('.pop-up-container').addClass('act');
			$('.pop-up-wr').removeClass('act');
			$('body').addClass('body-fix');
			$('html').addClass('doc-shift');
			$('.pop-up-body').load(base_path+'portfolio-popup/' + item.id);
			setTimeout(function () {
				$('.pop-up').addClass('act');
			}, 1000);

			window.location.hash = '#project' + item.id;
			return false;
		});
		var ib = new InfoBox(myOptions);
		ib.close(theMap, marker);
	});
}



  $(function() {
      var address_from, address_to, animLatLng, currStatus, geocodeLoaded, initMap, intervalId, latlngFrom, latlngTo, loadGeocode, map, setStatus, update, zoomDelay, zoomMax, zoomMin;

      address_from = params['from'];
      address_to = params['to'];
      map = null;
      latlngFrom = null;
      latlngTo = null;
      animLatLng = null;
      currStatus = 'zoomOut';
      intervalId = -1;
      zoomDelay = params['zoomDelay'] || 500;
      zoomMin = params['zoomMin'] || 12;
      zoomMax = params['zoomMax'] || 20;
      loadGeocode = function(address) {
        var geocoder;
        geocoder = new google.maps.Geocoder();
        return geocoder.geocode({
          address: decodeURIComponent(address)
        }, geocodeLoaded);
      };
      geocodeLoaded = function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (latlngFrom) {
            latlngTo = results[0].geometry.location;
          } else {
            latlngFrom = results[0].geometry.location;
            loadGeocode(address_to);
          }
        } else {
          window.location.href = window.location.href.split('?')[0] + '?err=address_not_found';
        }
        if (latlngFrom && latlngTo) {
          return initMap();
        }
      };
      initMap = function() {
        var mapOptions;
        mapOptions = {
          center: latlngFrom,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          disableDefaultUI: true,
          draggable: false,
          zoom: zoomMax
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        return intervalId = setInterval(update, zoomDelay);
      };
      setStatus = function(status, interval) {
        clearInterval(intervalId);
        currStatus = status;
        return intervalId = setInterval(update, interval);
      };
      update = function() {
        var delta_lat, delta_lng, lat, lng, zoom;
        if (currStatus === 'zoomOut') {
          zoom = map.getZoom() - 1;
          map.setZoom(zoom);
          if (zoom <= zoomMin) {
            animLatLng = latlngFrom;
            return setStatus('pan', 30);
          }
        } else if (currStatus === 'pan') {
          lat = animLatLng.lat();
          delta_lat = (latlngTo.lat() - lat) * 0.05;
          lng = animLatLng.lng();
          delta_lng = (latlngTo.lng() - lng) * 0.05;
          if (Math.abs(delta_lat) < 0.00001 || Math.abs(delta_lng) < 0.00001) {
            animLatLng = latlngTo;
            setStatus('zoomIn', zoomDelay);
          } else {
            animLatLng = new google.maps.LatLng(lat + delta_lat, lng + delta_lng);
          }
          return map.panTo(animLatLng);
        } else if (currStatus === 'zoomIn') {
          zoom = map.getZoom() + 1;
          map.setZoom(zoom);
          if (zoom >= zoomMax) {
            return clearInterval(intervalId);
          }
        }
      };
      $('<div>').attr('id', 'map').appendTo($('body'));
      return google.maps.event.addDomListener(window, 'load', function() {
        return loadGeocode(address_from);
      });
    });
