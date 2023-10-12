(function() {

	"use strict";

	var moskSingleMap;

	function moskSingleMapInitialize() {
		var mapOptions = {
			zoom: 14,
			center: new google.maps.LatLng(-33.86934656572772,151.20728015899658),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false
		};

		moskSingleMap = new google.maps.Map(document.getElementById('mosk-single-map'), mapOptions);

		var pin = 'img/map-pin.png';

		var marker1 = new google.maps.Marker({
			position: new google.maps.LatLng(-33.86934656572772,151.20728015899658),
			map: moskSingleMap,
			title: 'Title Example',
			icon: pin
		});

		var marker2 = new google.maps.Marker({
			position: new google.maps.LatLng(-33.875994657015646,151.22444193810225),
			map: moskSingleMap,
			title: 'Title Example',
			icon: pin
		});

		var center;

		function calculateCenter() {
			center = moskSingleMap.getCenter();
		}

		google.maps.event.addDomListener(moskSingleMap, 'idle', function() {
			calculateCenter();
		});

		google.maps.event.addDomListener(window, 'resize', function() {
			moskSingleMap.setCenter(center);
		});
	}

	google.maps.event.addDomListener(window, 'load', moskSingleMapInitialize);

})();