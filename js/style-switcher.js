// Style Switcher
// ---------------------------------------------------------
(function () {

	/*!
	 * jQuery Cookie Plugin v1.4.0
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */
	(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){a(require("jquery"))}else{a(jQuery)}}}(function(f){var a=/\+/g;function d(i){return b.raw?i:encodeURIComponent(i)}function g(i){return b.raw?i:decodeURIComponent(i)}function h(i){return d(b.json?JSON.stringify(i):String(i))}function c(i){if(i.indexOf('"')===0){i=i.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{i=decodeURIComponent(i.replace(a," "));return b.json?JSON.parse(i):i}catch(j){}}function e(j,i){var k=b.raw?j:c(j);return f.isFunction(i)?i(k):k}var b=f.cookie=function(q,p,v){if(p!==undefined&&!f.isFunction(p)){v=f.extend({},b.defaults,v);if(typeof v.expires==="number"){var r=v.expires,u=v.expires=new Date();u.setTime(+u+r*86400000)}return(document.cookie=[d(q),"=",h(p),v.expires?"; expires="+v.expires.toUTCString():"",v.path?"; path="+v.path:"",v.domain?"; domain="+v.domain:"",v.secure?"; secure":""].join(""))}var w=q?undefined:{};var s=document.cookie?document.cookie.split("; "):[];for(var o=0,m=s.length;o<m;o++){var n=s[o].split("=");var j=g(n.shift());var k=n.join("=");if(q&&q===j){w=e(k,p);break}if(!q&&(k=e(k))!==undefined){w[j]=k}}return w};b.defaults={};f.removeCookie=function(j,i){if(f.cookie(j)===undefined){return false}f.cookie(j,"",f.extend({},i,{expires:-1}));return !f.cookie(j)}}));



	// CSS Styles
	$head.append('<link rel="stylesheet" href="css/style-switcher.css">');



	// HTML Code
	var $styleHTML = '<div id="style-switcher">';
			$styleHTML += '<a href="#" class="toggle fa fa-cog"></a>';

			$styleHTML += '<ul class="colors">';
				$styleHTML += '<li class="active"><a href="#" data-color-code="D2B995"></a></li>';
				$styleHTML += '<li><a href="#" data-color-code="CE0001" data-path="css/red.css"></a></li>';
				$styleHTML += '<li><a href="#" data-color-code="7E9E1D" data-path="css/green.css"></a></li>';
			$styleHTML += '</ul>';
		$styleHTML += '</div>';

	$body.append($styleHTML);



	var $switcher = $('#style-switcher'),
		$colors = $switcher.find('.colors > li > a'),
		has_color = false;



	// Onload Cookie Check
	var color_cookie = $.cookie('style-switcher-color');
	var toggle_cookie = $.cookie('style-switcher-toggle');

	if (color_cookie) {
		$head.append('<link id="style-switcher-css" rel="stylesheet" href="' + color_cookie + '">');
		has_color = true;
		$('a[data-path="' + color_cookie + '"]').parent('li').addClass('active').siblings('li').removeClass('active');
	}

	if (!toggle_cookie) {
		$switcher.addClass('active');
	}



	// Toggle
	$switcher.find('.toggle').on('click', function (event) {
		event.preventDefault();

		if (!$switcher.hasClass('active')) {
			$switcher.addClass('active');
			$.removeCookie('style-switcher-toggle', { path: '/salam/' });
		} else {
			$switcher.removeClass('active');
			$.cookie('style-switcher-toggle', 'hidden', { path: '/salam/', expires: 365 });
		}
	});



	// Buttons Colors
	$colors.each(function () {
		var $this = $(this);

		$this.css('background-color', '#' + $this.data('color-code'));
	});



	// Colors Toggle
	$colors.on('click', function (event) {
		event.preventDefault();

		var $this = $(this),
			$parent = $this.parent('li');

		if (!$parent.hasClass('active')) {
			var path = $this.data('path');

			if (!path) {
				$('#style-switcher-css').remove();
				has_color = false;
				$.removeCookie('style-switcher-color', { path: '/salam/' });
			} else if (has_color == false) {
				$head.append('<link id="style-switcher-css" rel="stylesheet" href="' + path + '">');
				has_color = true;
				$.cookie('style-switcher-color', path, { path: '/salam/', expires: 1 });
			} else {
				$('#style-switcher-css').attr('href', path);
				$.cookie('style-switcher-color', path, { path: '/salam/', expires: 1 });
			}

			$parent.addClass('active').siblings('li').removeClass('active');
		}
	});

})();