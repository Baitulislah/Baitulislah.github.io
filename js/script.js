;(function($) {

"use strict";

var $body = $('body');
var $head = $('head');
var pageLoaded = setTimeout(addClassWhenLoaded, 500);



// Style Switcher
// ---------------------------------------------------------
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



// Mediaqueries
// ---------------------------------------------------------
var XS = window.matchMedia('(max-width:767px)');
var SM = window.matchMedia('(min-width:768px) and (max-width:991px)');
var MD = window.matchMedia('(min-width:992px) and (max-width:1199px)');
var LG = window.matchMedia('(min-width:1200px)');
var XXS = window.matchMedia('(max-width:480px)');
var SM_XS = window.matchMedia('(max-width:991px)');
var LG_MD = window.matchMedia('(min-width:992px)');



// Touch
// ---------------------------------------------------------
var dragging = false;

$body.on('touchmove', function() {
	dragging = true;
});

$body.on('touchstart', function() {
	dragging = false;
});



// Smart Resize
// ---------------------------------------------------------
(function($,sr) {

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				func.apply(obj, args);
				timeout = null;
			};

			if (timeout)
			clearTimeout(timeout);
			else if (execAsap)
			func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	}

	// smartresize
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');



// Back to top btn
// ---------------------------------------------------------
$('#back-to-top').each(function () {

	var $this = $(this);

	$this.on('click', function (event) {
		event.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 500);
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$this.fadeIn(200);
		} else if ($(this).scrollTop() < 250) {
			$this.fadeOut(200);
		}
	});

});



// Mobile Search Form
// ---------------------------------------------------------
var $searchForm = $('#header .header-search'),
	$mobileSearchContainer = $('#mobile-search-container');

function moveSearchForm(SM_XS) {
	if (SM_XS.matches) {
		$searchForm.appendTo($mobileSearchContainer);
	} else {
		$searchForm.appendTo($('#header .header-top-bar > .container').not($mobileSearchContainer));
		$mobileSearchContainer.removeAttr('style');
	}
}

moveSearchForm(SM_XS);
SM_XS.addListener(moveSearchForm);

$('#mobile-search-toggle').on('click', function (event) {
	event.preventDefault();

	$('#mobile-search-container').slideToggle(250);
});



// Mobile Primary Nav
// ---------------------------------------------------------
var $primaryNav = $('#header .primary-nav'),
	$mobileMenuContainer = $('#mobile-menu-container');

function mobilePrimaryNav(SM_XS) {
	if (SM_XS.matches) {
		$primaryNav.appendTo($mobileMenuContainer.children('.menu'));
	} else {
		$primaryNav.appendTo('#header .header-nav-bar nav');
		$mobileMenuContainer.removeAttr('style');
	}
}

mobilePrimaryNav(SM_XS);
SM_XS.addListener(mobilePrimaryNav);

$('#mobile-menu-toggle').on('click', function (event) {
	event.preventDefault();

	$mobileMenuContainer.slideToggle(250);
});



// Move Call to Action
// ---------------------------------------------------------
var $callToAction = $('#header .header-call-to-action');

function moveCallToAction(XS) {
	if (XS.matches) {
		$callToAction.insertBefore('#header .header-language');
	} else {
		$callToAction.insertBefore('#header .header-social');
	}
}

moveCallToAction(XS);
XS.addListener(moveCallToAction);



// Header Login/Register Toggle
// ---------------------------------------------------------
var $headerLoginRegister = $('#header .header-login, #header .header-register');

function headerLoginRegister(XS) {
	if (XS.matches) {
		$headerLoginRegister.appendTo($mobileMenuContainer.children('.login-register'));
	} else {
		$('#header .header-top-bar .container').first().prepend($headerLoginRegister);
		$headerLoginRegister.removeAttr('style');
		$mobileMenuContainer.find('.mobile-register-toggle, .mobile-login-toggle').removeClass('active');
	}
}

headerLoginRegister(XS);
XS.addListener(headerLoginRegister);

$headerLoginRegister.each(function () {
	var $this = $(this);

	$this.children('a').on('click', function (event) {
		event.preventDefault();
		$this.toggleClass('active');
	});

	$this.on('clickoutside touchendoutside', function () {
		if ($this.hasClass('active')) { $this.removeClass('active'); }
	});
});

var $headerLoginClone = $('#header .header-login > .btn').clone(false).addClass('clone mobile-login-toggle'),
	$headerRegisterClone = $('#header .header-register > .btn').clone(false).addClass('clone mobile-register-toggle');

$mobileMenuContainer.children('.login-register').prepend($headerLoginClone, $headerRegisterClone);

$mobileMenuContainer.find('.mobile-login-toggle').on('click', function (event) {
	event.preventDefault();

	var $this = $(this),
		$container = $mobileMenuContainer.find('.header-login');

	if (!$this.hasClass('active')) {
		$mobileMenuContainer.find('.mobile-register-toggle').removeClass('active');
		$mobileMenuContainer.find('.header-register').slideUp(250);

		$container.slideDown(250);
		$this.addClass('active');
	} else {
		$container.slideUp(250);
		$this.removeClass('active');
	}
});

$mobileMenuContainer.find('.mobile-register-toggle').on('click', function (event) {
	event.preventDefault();

	var $this = $(this),
		$container = $mobileMenuContainer.find('.header-register');

	if (!$this.hasClass('active')) {
		$mobileMenuContainer.find('.mobile-login-toggle').removeClass('active');
		$mobileMenuContainer.find('.header-login').slideUp(250);

		$container.slideDown(250);
		$this.addClass('active');
	} else {
		$container.slideUp(250);
		$this.removeClass('active');
	}
});



// Mobile Header
// ---------------------------------------------------------
$('#header').on('clickoutside touchendoutside', function () {
	$('#mobile-search-container, #mobile-menu-container').slideUp(250);
});



// Header Language Toggle
// ---------------------------------------------------------
var $headerLanguageToggle = $('#header .header-language');

$headerLanguageToggle.children('a').on('click', function (event) {
	event.preventDefault();
	$(this).parent('.header-language').toggleClass('active');
});

$headerLanguageToggle.on('clickoutside touchendoutside', function () {
	if ($headerLanguageToggle.hasClass('active')) { $headerLanguageToggle.removeClass('active'); }
});



// Header Search Options Toggle
// ---------------------------------------------------------
var $headerSearchOptionsToggle = $('#header .header-search .toggle');

$headerSearchOptionsToggle.children('a').on('click', function (event) {
	event.preventDefault();
	$(this).parent('.toggle').toggleClass('active');
});

$headerSearchOptionsToggle.on('clickoutside touchendoutside', function () {
	if ($headerSearchOptionsToggle.hasClass('active')) { $headerSearchOptionsToggle.removeClass('active'); }
});

function headerSearchOptionsToggleCheckbox() {
	var $this = $(this),
		$li = $this.closest('li');

	if ($this.prop('checked')) {
		$li.addClass('active');
	} else {
		$li.removeClass('active');
	}
}

$headerSearchOptionsToggle.find('input[type="checkbox"]').each(headerSearchOptionsToggleCheckbox).on('change', headerSearchOptionsToggleCheckbox);



// Header Search Advanced
// ---------------------------------------------------------
$('.header-search-dropdown input[name="header-search-dropdown-radio"]').on('change', function () {
	var selected = $(this).val();

	$('.header-search-dropdown .hsd-toggle').slideUp(250);
	$('.header-search-dropdown .' + selected).slideDown(250);
});



// Submenu Levels
// ---------------------------------------------------------
$('#header .primary-nav li.has-submenu').each(function () {
	$(this).append('<span class="submenu-arrow"></span>');
});

$('#header .header-nav-bar li.has-submenu > .submenu-arrow').on('click', function () {
	var $this = $(this),
		$thisLi = $this.parent('li');

	if (!$thisLi.hasClass('hover')) {
		$thisLi.siblings('li').removeClass('hover').find('.has-submenu').removeClass('hover');
		$thisLi.addClass('hover');
	} else {
		$thisLi.removeClass('hover').find('.has-submenu').removeClass('hover');
	}
});

$('#header .header-nav-bar').on('clickoutside touchendoutside', function () {
	if (!dragging) {
		$('#header .header-nav-bar li.has-submenu').removeClass('hover');
	}
});

function removeMenusHoverClass(SM_XS) {
	if (!SM_XS.matches) {
		$('#header .header-nav-bar li.has-submenu').removeClass('hover');
	}
}

removeMenusHoverClass(SM_XS);
SM_XS.addListener(removeMenusHoverClass);



// Sliders
// ---------------------------------------------------------
if ($.fn.flexslider) {

	// Header Hero Slider
	// ---------------------------------------------------------
	$('.header-hero-slider .slides > li').each(function () {
		$(this).css('background-image', 'url(' + $(this).data('image') + ')');
	});

	$('.header-hero-slider').flexslider({
		pauseOnHover: true,
		controlNav: true,
		directionNav: false,
		slideshow: true,
		animationSpeed: 1000,
		animation: 'fade',
		animationLoop: false,
		after: function () {
			var $style = $('<style/>', {
				'id': 'fixYoutubeVideos',
				'text': '.header-hero-slider .macbook iframe:before { content: " " !important; }'
			});

			$('head').append($style);
			setTimeout(function () { $style.remove(); }, 0);
		}
	});



	// Crowdfunding Slider
	// ---------------------------------------------------------
	$('.crowdfunding-slider').flexslider({
		pauseOnHover: true,
		pauseOnAction: true,
		controlNav: true,
		directionNav: false,
		slideshow: true,
		animationSpeed: 1000,
		animation: 'slide',
		animationLoop: false
	});



	// Our Partners Slider
	// ---------------------------------------------------------
	$('.our-partners-slider').flexslider({
		pauseOnHover: true,
		controlNav: true,
		directionNav: false,
		slideshow: true,
		animationSpeed: 1000,
		animation: 'slide',
		animationLoop: false,
		itemWidth: 195,
		itemMargin: 0
	});



	// Search Item Slider
	// ---------------------------------------------------------
	$('.search-item .flexslider').flexslider({
		pauseOnHover: true,
		controlNav: true,
		directionNav: false,
		slideshow: true,
		animationSpeed: 1000,
		animation: 'fade'
	});

}



// Twitter Feed Section
// ---------------------------------------------------------
if ($.fn.tweet) {
	$('.twitter-feed-section .tweets-container').each(function () {
		var $this = $(this),
			user = $this.data('user'),
			tweets = $this.data('tweets');

		$this.on('loaded', function () {
			if ($.fn.flexslider) {
				$this.flexslider({
					pauseOnHover: true,
					controlNav: false,
					directionNav: true,
					slideshow: true,
					animationSpeed: 500,
					animation: 'fade',
					animationLoop: false,
					selector: '.tweet_list > li',
					prevText: '&#xf106;',
					nextText: '&#xf107;',
					controlsContainer: $this.closest('.css-table')
				});
			}

			$this.parent().siblings('.twitter-logo').attr('href', '//twitter.com/' + user);

			$this.closest('.twitter-feed-section').removeClass('hide');
		});

		$this.tweet({
			username: user,
			modpath: './js/twitter/',
			count: tweets,
			loading_text: "Loading tweets...",
			template: "{text}{time}",
		});
	});
}



// Datepicker
// ---------------------------------------------------------
if ($.fn.datepicker) {
	$('.datepicker input').datepicker({
		prevText: '&#xf053;',
		nextText: '&#xf054;',
		showOtherMonths: true
	});
}



// Responsive Tabs
// ---------------------------------------------------------
if ($.fn.responsiveTabs) {
	$('.responsive-tabs').responsiveTabs();
}



// Accordion
// ---------------------------------------------------------
$('.accordion').each(function () {

	$(this).find('ul > li > a').on('click', function (event) {
		event.preventDefault();

		var $this = $(this),
			$li = $this.parent('li'),
			$div = $this.siblings('div'),
			$siblings = $li.siblings('li').children('div');

		if (!$li.hasClass('active')) {
			$siblings.slideUp(250, function () {
				$(this).parent('li').removeClass('active');
			});

			$div.slideDown(250, function () {
				$li.addClass('active');
			});
		} else {
			$div.slideUp(250, function () {
				$li.removeClass('active');
			});
		}
	});

});



// Progress Bar
// ---------------------------------------------------------
$('.progress-bar').each(function () {

	var $this = $(this),
		progress = $this.data('progress');

	if (!$this.hasClass('no-animation')) {
		$this.one('inview', function () {
			$this.children('.progress-bar-inner').children('span').css('width', progress + '%');
		});
	} else {
		$this.children('.progress-bar-inner').children('span').css('width', progress + '%');
	}

	if ($this.hasClass('toggle')) {
		$this.children('.progress-bar-toggle').on('click', function (event) {
			event.preventDefault();

			if (!$this.hasClass('active')) {
				$this.children('.progress-bar-content').slideDown(250, function () {
					$this.addClass('active');
				});
			} else {
				$this.children('.progress-bar-content').slideUp(250, function () {
					$this.removeClass('active');
				});
			}
		});
	}

});



// Animated Counter
// ---------------------------------------------------------
$('.animated-counter').each(function () {
	var $this = $(this),
		$text = $this.children('span'),
		number = $this.data('number');

	$this.one('inview', function () {
		$({numberValue: 0}).animate({numberValue: number}, {
			duration: 2500,
			step: function () {
				$text.text(Math.ceil(this.numberValue));
			},
			complete: function () {
				$text.text(number);
			}
		});
	});
});



// Progress Circle
$('.progress-circle').each(function () {

	var $this = $(this),
		progress = $this.data('progress'),
		html = '';

	html += '<div class="loader"><div class="loader-bg"><div class="text">0%</div></div>';
	html += '<div class="spiner-holder-one animate-0-25-a"><div class="spiner-holder-two animate-0-25-b"><div class="loader-spiner"></div></div></div>';
	html += '<div class="spiner-holder-one animate-25-50-a"><div class="spiner-holder-two animate-25-50-b"><div class="loader-spiner"></div></div></div>';
	html += '<div class="spiner-holder-one animate-50-75-a"><div class="spiner-holder-two animate-50-75-b"><div class="loader-spiner"></div></div></div>';
	html += '<div class="spiner-holder-one animate-75-100-a"><div class="spiner-holder-two animate-75-100-b"><div class="loader-spiner"></div></div></div>';
	html += '</div>';

	$this.prepend(html);

	var setProgress = function(progress) {

		if (progress < 25) {
			var angle = -90 + (progress / 100) * 360;

			$this.find('.animate-0-25-b').css('transform', 'rotate(' + angle + 'deg)');
		} else if (progress >= 25 && progress < 50) {
			var angle = -90 + ((progress - 25) / 100) * 360;

			$this.find('.animate-0-25-b').css('transform', 'rotate(0deg)');
			$this.find('.animate-25-50-b').css('transform', 'rotate(' + angle + 'deg)');
		} else if (progress >= 50 && progress < 75) {
			var angle = -90 + ((progress - 50) / 100) * 360;

			$this.find('.animate-25-50-b, .animate-0-25-b' ).css('transform', 'rotate(0deg)');
			$this.find('.animate-50-75-b').css('transform' , 'rotate(' + angle + 'deg)');
		} else if (progress >= 75 && progress <= 100) {
			var angle = -90 + ((progress - 75) / 100) * 360;

			$this.find('.animate-50-75-b, .animate-25-50-b, .animate-0-25-b').css('transform', 'rotate(0deg)');
			$this.find('.animate-75-100-b').css('transform', 'rotate(' + angle + 'deg)');
		}

		$this.find('.text').html(progress + '%');
	}

	var clearProgress = function () {
		$this.find('.animate-75-100-b, .animate-50-75-b, .animate-25-50-b, .animate-0-25-b').css('transform', 'rotate(90deg)');
	}

	$this.one('inview', function () {
		for (var i = 0; i <= progress; i++) {
			(function(i) {
				setTimeout(function () {
					setProgress(i);
				}, i * 20);
			})(i);
		}
	});

});



// Alerts
// ---------------------------------------------------------
$('.alert').each(function () {

	var $this = $(this);

	$(this).find('.close').on('click', function (event) {
		event.preventDefault();

		$this.remove();
	});

});



// Coran Accordion
// ---------------------------------------------------------
$('.coran-accordion').each(function () {

	var $item = $(this).children('ul').children('li');

	$item.children('a').on('click', function (event) {
		event.preventDefault();

		var $this = $(this),
			$li = $this.parent('li'),
			$div = $this.siblings('div'),
			$siblings = $li.siblings('li').children('div');

		if (!$li.hasClass('active')) {
			$siblings.slideUp(function () {
				$(this).parent('li').removeClass('active');
				$(this).find('.chapter').removeClass('active').children('div').removeAttr('style');
			});

			$div.slideDown(function () {
				$li.addClass('active');
			});
		} else {
			$div.slideUp(function () {
				$li.removeClass('active');
				$(this).find('.chapter').removeClass('active').children('div').removeAttr('style');
			});
		}
	});

	$item.find('.chapter').children('h6').on('click', function () {
		var $this = $(this),
			$chapter = $this.parent('.chapter'),
			$div = $this.siblings('div'),
			$siblings = $chapter.siblings('.chapter').children('div');

		if (!$chapter.hasClass('active')) {
			$siblings.slideUp(function () {
				$(this).parent('.chapter').removeClass('active');
			});

			$div.slideDown(function () {
				$chapter.addClass('active');
			});
		} else {
			$div.slideUp(function () {
				$chapter.removeClass('active');
			});
		}
	});

});



// UOU Selects
// ---------------------------------------------------------
$.fn.uouCustomSelect = function () {
	var $select = $(this);

	$select.wrap('<div class="uou-custom-select"></div>');

	var $container = $select.parent('.uou-custom-select');

	$container.append('<ul class="select-clone"></ul>');

	var $list = $container.children('.select-clone'),
		placeholder = $select.data('placeholder') ? $select.data('placeholder') : $select.find('option:eq(0)').text();

	$('<input class="value-holder" type="text" disabled="disabled" placeholder="' + placeholder + '"><i class="fa fa-chevron-down"></i>').insertBefore($list);

	var $valueHolder = $container.children('.value-holder');

	// Create clone list
	$select.find('option').each(function () {
		var $this = $(this);

		$list.append('<li data-value="' + $this.val() + '">' + $this.text() + '</li>');
	});

	// Toggle list
	$container.on('click', function () {
		$container.toggleClass('active');
		$list.slideToggle(250);
	});

	// Option Select
	$list.children('li').on('click', function () {
		var $this = $(this);

		$valueHolder.val($this.text());
		$select.find('option[value="' + $this.data('value') + '"]').prop('selected', true);
	});

	// Hide
	$container.on('clickoutside touchendoutside', function () {
		if (!dragging) {
			$container.removeClass('active');
			$list.slideUp(250);
		}
	});

	// Links
	if ($select.hasClass('links')) {
		$select.on('change', function () {
			window.location.href = select.val();
		});
	}

	$select.on('change', function () {
		cosole.log(chnaged);
		cosole.log($(this).val());
	});
};

$('.header-search-dropdown select').each(function () {
	$(this).uouCustomSelect();
});



// Media PLayers
// ---------------------------------------------------------
if ($.fn.mediaelementplayer) {

	// Video Player
	// ---------------------------------------------------------
	$('.video-player').mediaelementplayer({
		startVolume: 0.8,
		features: ['playpause','progress','volume','fullscreen'],
		pauseOtherPlayers: true,
		videoVolume: 'horizontal'
	});



	// Audio Player
	// ---------------------------------------------------------
	$('.audio-player').mediaelementplayer({
		audioWidth: '100%',
		audioHeight: 40,
		features: ['playpause','progress','volume'],
		pauseOtherPlayers: true,
	});

}



// Filters
// ---------------------------------------------------------
if ($.fn.isotope) {

	var $container = $('.filter-items-container'),
		portfolio_filter_options = {
			animationEngine: 'best-available',
			animationOptions: {
				duration: 500,
				easing: 'linear',
				queue: false
			},
			itemSelector: '.filter-item',
			resizable: false
		};

	$container.each(function () {
		var $this = $(this),
			$row = $this.children('.row');

		$row.isotope(portfolio_filter_options);

		$this.find('.gallery-filters li a').on('click', function(event) {
			event.preventDefault();

			var $this = $(this),
				selector = $this.attr('data-filter'),
				$li = $this.parent('li'),
				$others = $li.siblings('li');

			$others.removeClass('active');
			$li.addClass('active');
			$row.isotope({ filter: selector });
		});

		$(window).load(function () {
			$row.isotope('reLayout');
		});

		$(window).smartresize(function () {
			$row.isotope('reLayout');
		});
	});

}



// $(window).load(function () {

// 	// Add body loaded class for fade transition
// 	addClassWhenLoaded();
// 	clearTimeout(pageLoaded);

// });

function addClassWhenLoaded() {
	if (!$body.hasClass('loaded')) {
		$body.addClass('loaded');
	}
}

}(jQuery));