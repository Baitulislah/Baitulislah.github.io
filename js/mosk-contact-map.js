(function() {

	"use strict";

	var moskContactMap;

	function moskContactMapInitialize() {
		var mapOptions = {
			zoom: 14,
			center: new google.maps.LatLng(-33.86934656572772,151.20728015899658),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false
		};

		moskContactMap = new google.maps.Map(document.getElementById('mosk-contact-map'), mapOptions);

		var pin = 'img/map-pin.png';

		var marker1 = new google.maps.Marker({
			position: new google.maps.LatLng(-33.86934656572772,151.20728015899658),
			map: moskContactMap,
			title: 'Title Example',
			icon: pin
		});

		var marker2 = new google.maps.Marker({
			position: new google.maps.LatLng(-33.875994657015646,151.22444193810225),
			map: moskContactMap,
			title: 'Title Example',
			icon: pin
		});

		var center;

		function calculateCenter() {
			center = moskContactMap.getCenter();
		}

		google.maps.event.addDomListener(moskContactMap, 'idle', function() {
			calculateCenter();
		});

		google.maps.event.addDomListener(window, 'resize', function() {
			moskContactMap.setCenter(center);
		});
	}

	google.maps.event.addDomListener(window, 'load', moskContactMapInitialize);

})();