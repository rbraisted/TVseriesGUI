"use strict";

(function($) {
	//	this is basically hasClass taken from jQuery source (1.10.2)
	//	but rewritten for ids
	$.fn.hasId = function(selector) {
		var idName = " " + selector + " ",
			i = 0,
			l = this.length;
		for (; i < l; i++) {
			if (this[i].nodeType === 1 && (" "+this[i].id+" ").replace(/[\t\r\n\f]/g, " ").indexOf(idName) >= 0) return true;
		}
		return false;
	}

	//	this could probably be optimized
	$.fn.setClass = function(className) {
		return $(this).removeClass().addClass(className);
	}
}(jQuery));

//	check if our app namespace has been defined
//	if the user is running this from a native iOS/Android
//	app, we should see that the native web views will have
//	injected TVRO = { MOBILE_APP : true } before any other
//	javascript is executed, so we don't want to overwrite that
if (typeof TVRO === 'undefined') {
	var TVRO = {};
}

//	as mentioned above,
//	MOBILE_APP and SAT_FINDER should be set by iOS/Android
//	web view before any other script executes
TVRO = {
	MOBILE_APP: TVRO.MOBILE_APP || false,
	SAT_FINDER: TVRO.SAT_FINDER || false,
	DEMO_MODE: 'demo-mode',
	TECH_MODE: 'technician-mode',
	ANT_TYPES: {
		TV1: 'tv1',
		TV3: 'tv3',
		TV5: 'tv5',
		TV6: 'tv6',
	        TV8: 'tv8',
	        RV1: 'rv1',
	        A9 : 'a9'
	},

	init: function() {
		var
		header = $('[id ~= header ]'),
		nav = $('[id ~= nav ]'),
		status = $('[id ~= status ]');

		$('[id ~= nav-btn ]', header).click(function() {
			nav.toggleClass('is-expanded');
		});

		// var webService = new TVRO.WebService();
		// setInterval(function() {
		// 	webService.request('antenna_status', function(response) {
		// 		var acu = $('acu > state', response).text(),
		// 			antenna = $('antenna > state', response).text();

		// 		//	ACU
		// 		//	acu > state OK | FLASHING | CALGYRO | ERROR
		// 		//	something like
		// 		$('[id ~= acu-state]', '#status-btn').removeClass('is-ok is-flashing is-calgyro is-error');
		// 		$('[id ~= acu-state]', '#status-btn').toggleClass('is-ok', acu === 'OK');
		// 		$('[id ~= acu-state]', '#status-btn').toggleClass('is-flashing', acu === 'FLASHING');
		// 		$('[id ~= acu-state]', '#status-btn').toggleClass('is-calgyro', acu === 'CALGYRO');
		// 		$('[id ~= acu-state]', '#status-btn').toggleClass('is-error', acu === 'ERROR');

		// 		//	ANTENNA
		// 		//	antenna > state INITIALIZING | WAITING FOR MODEM (Note: VSAT only) | MODEM SAT SWITCH (Note: VSAT only) | SEARCHING | TRACKING | IDLE | ERROR | CABLE UNWRAP
		// 		$('[id ~= antenna-state]', '#status-btn').removeClass('is-initializing is-searching is-tracking is-idle is-error is-cable-unwrap');
		// 		$('[id ~= antenna-state]', '#status-btn').toggleClass('is-initializing', antenna === 'INITIALIZING');
		// 		$('[id ~= antenna-state]', '#status-btn').toggleClass('is-searching', antenna === 'SEARCHING');
		// 		$('[id ~= antenna-state]', '#status-btn').toggleClass('is-tracking', antenna === 'TRACKING');
		// 		$('[id ~= antenna-state]', '#status-btn').toggleClass('is-idle', antenna === 'IDLE');
		// 		$('[id ~= antenna-state]', '#status-btn').toggleClass('is-error', antenna === 'ERROR');
		// 		$('[id ~= antenna-state]', '#status-btn').toggleClass('is-cable-unwrap', antenna === 'CABLE UNWRAP');
		// 	});
		// }, 2000);

		$('[id ~= status-btn ]', header).click(function() {
			$(status).toggleClass('toggled');
		});

		$('[id ~= sat-finder-btn ]', nav).toggle(false);//TVRO.SAT_FINDER);

		$('[id ~= nav-btn ]', nav).each(function(index, element) {
			$(element).toggleClass('is-selected', element.href === location.protocol+ '//' + location.hostname + (location.port ? ':' + location.port : '') + location.pathname);
		});

		if (TVRO.page && TVRO.page.init) TVRO.page.init();
	}
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	cookie manager singleton
//	note that cookies are set across all paths
//	note that getCookie vs hasCookie is like
//	getCookie -> 'cookieValue' vs hasCookie -> true
//	getCookie -> undefined vs hasCookie -> false
TVRO.CookieManager = (function() {
	var singleton;
	return function() {
		if (!singleton) {
			singleton = {};

			singleton.getCookie = function(key) {
				return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
			}

			singleton.setCookie = function(key, value, end) {
				if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
				var expires = {
					'string' : '; expires=' + end,
					'number' : (end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end),
					'date' : '; expires=' + new Date(end).toUTCString(),
					'undefined' : ''
				}[typeof end];
				key = encodeURIComponent(key);
				value = encodeURIComponent(value);
				document.cookie = key + '=' + value + expires + '; path=/';
				return true;
			}

			//	if the cookie doesn't exist, return false
			//	use this to handle toggles where no value is set for the cookie
			//	ie demo mode:
			//	if (!removeCookie(demoMode)) setCookie(demoMode);
			singleton.removeCookie = function(key) {
				if (!key || !singleton.hasCookie(key)) return false;
				key = encodeURIComponent(key);
				document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
				return true;
			}

			singleton.hasCookie = function(key) {
				return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
			}
		}
		return singleton;
	}
}());

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	webservice
//	pass request parameters as json
//	they'll be converted to xml for you
//	for example:
//
//	user: {
//		firstname : 'John',
//		lastname : 'Smith',
//		city : 'Middletown',
//		state : 'Rhode Island'
//	}
//
//	will be sent as:
//
//	<user>
//		<firstname>John</firstname>
//		<lastname>Smitch</lastname>
//		<city>Middletown</city>
//		<state>Rhode Island</state>
//	</user>
TVRO.WebService = (function() {
	var singleton,
		cookieManager = new TVRO.CookieManager(),
		LIVE_WEBSERVICE_URL = '/webservice.php',
		DEMO_WEBSERVICE_URL = '/demo/webservice.php';

	function jsonAsXml(json) {
		var xml = '';
		for (var key in json) {
			var value = json[key];
			if (value instanceof Array) {
				for (var i = 0; i < value.length; i++) {
					xml += '<'+key+'>'+jsonAsXml(value[i])+'</'+key+'>';
				}
			} else if (typeof value === 'object') {
				xml += '<'+key+'>'+jsonAsXml(value)+'</'+key+'>';
			} else {
				xml += '<'+key+'>'+value+'</'+key+'>';
			}
		}
		return xml;
	};

	return function() {
		if (!singleton) {
			singleton = {};

			singleton.request = function() {
				var demoMode = cookieManager.hasCookie(TVRO.DEMO_MODE),
					async = true,
					contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
					requestUrl,
					requestName,
					requestJson,
					requestXml,
					successCallback,
					errorCallback;

				for (var index in arguments) {
					var argument = arguments[index];
					if (typeof argument === 'boolean') async = argument;
					else if (typeof argument === 'object') requestJson = argument;
					else if (typeof argument === 'string' && !requestName) requestName = argument;
					else if (typeof argument === 'string' && !requestUrl) requestUrl = argument;
					else if (typeof argument === 'function' && !successCallback) successCallback = argument;
					else if (typeof argument === 'function' && !errorCallback) errorCallback = argument;
				}

				if (!requestUrl) {
					if (demoMode) requestUrl = DEMO_WEBSERVICE_URL;
					else requestUrl = LIVE_WEBSERVICE_URL;
				}

				if (requestUrl === DEMO_WEBSERVICE_URL || requestUrl === LIVE_WEBSERVICE_URL) {
					contentType = 'text/xml';
				}

				requestXml = '<ipacu_request><message name="'+requestName+'" />'+jsonAsXml(requestJson)+'</ipacu_request>';

				$.ajax({
					async: async,
					type: 'post',
					contentType: contentType,
					processData: false,
					dataType: 'xml',
					url: requestUrl,
					data: requestXml,
					success: function(response) {
						console.log('~ '+requestName.toUpperCase());
						console.log($(requestXml).get(0));
						console.log($('ipacu_response', response).get(0));

						var error = $(response).find('ipacu_response > message').attr('error');

						if (error === '0' && successCallback) successCallback($(response));
						else if (error !== '0' && errorCallback) errorCallback(error);

						// The error numbers are defined as
						// NOT_WRITTEN_YET        	-1 	TODO: remove this once everything does get written.
						// ERROR                   	1 	Doesn't fall into another category.  Shouldn't really be used...
						// INVALID_XML_MESSAGE     	2 	Not only don't I understand you, you're not even sending XML.
						// UNKNOWN_MESSAGE         	3 	Sorry boss, I don't know what you're asking me.
						// MISSING_ELEMENT_ERROR   	4 	Required tag is missing from XML data
						// INVALID_ELEMENT_VALUE   	5 	I found the correct tag, but the value inside it makes no sense
						// MISSING_DATA            	6 	Couldn't find the information you requested.
						// UNKNOWN_FILE_NAME_ERROR 	7 	File name is not in the known list
						// FILE_NOT_FOUND_ERROR    	8 	Couldn't find the file (does not exist on system)
						// FILE_UNREADABLE_ERROR   	9 	Couldn't read from file
						// FILE_LOCKED_ERROR       	10	Couldn't open file for writing
						// FILE_UNWRITABLE_ERROR   	11	Couldn't write to file
						// EVENT_NOT_FOUND         	12	The starting value is greater than the number we have in our list, so no events will be returned.
						// TOO_MANY_EVENTS         	13	We have at least the starting value number of events, but not so many that we are able to return the desired number.
						// DATASTORE_UNAVAILABLE   	14	Umm...I don't know what to do here, nor do I know when this could happen.
						// TIMEOUT                 	15	Ttl was not specified or 0, or requested button was not pressed
						// INVALID_UPDATE_FILE     	16	The name you provided doesn't start with "HD11-" and end with ".kvh".
						// DUPLICATE_DATA          	17	data value already in use
						// -Paul
						
						// I have added a new error code for TV-HUB messages.
						// 18 means configuration error, specifically for
						// TV-HUB this means the LNB is not configured. This
						// should never be a problem after we start production
						// because the factory will always install and configure the LNB.
						// -Paul
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log('\n------------------------------------------------------------');
						console.log('  TVRO.WebService AJAX error!');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
						console.log('------------------------------------------------------------\n');
					}
				});
			}
		}
		return singleton;
	}
}());

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	directv receivers and ip autoswitch devices
TVRO.Autoswitch = function(xml) {
	var self = {},
		xml = $(xml);

	self.sn = $('sn', xml).text();
	self.name = $('name', xml).text();
	self.ip = $('ip_address', xml).text();
	self.active = false;

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	satellite groups
TVRO.Group = function(xml) {
	var self = {},
		xml = $(xml);

	self.name = $('group_name', xml).text();
	self.predefined = $('predefined', xml).text();
	self.satelliteA = TVRO.Satellite($('A', xml));
	self.satelliteB = TVRO.Satellite($('B', xml));
	self.satelliteC = TVRO.Satellite($('C', xml));
	self.satelliteD = TVRO.Satellite($('D', xml));

	self.a = self.satelliteA;
	self.b = self.satelliteB;
	self.c = self.satelliteC;
	self.d = self.satelliteD;

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.Satellite = function(xml) {
	var self = {},
		xml = $(xml);

	//	these values can be retrieved from both
	//	get_satellite_list and get_satellite_params
	self.listID = $('listID', xml).text();
	self.antSatID = $('antSatID', xml).text();
	self.name = $('name', xml).text();
	self.region = $('region', xml).text();
	self.lon = Number($('lon', xml).text());
	self.suffix = $('suffix', xml).text();
	self.favorite = $('favorite', xml).text();

	//	these values can only be retrieved with get_satellite_params
	self.skew = $('skew', xml).text();
	self.computedSkew = $('computedSkew', xml).text();
	self.lo1 = $('lo1', xml).text();
	self.lo2 = $('lo2', xml).text();
	self.kumode = $('kumode', xml).text();
	self.preferredPolarity = $('preferredPolarity', xml).text();
	self.xponders = [];
	$('xponder', xml).each(function() {
		self.xponders.push[TVRO.Xponder(this)];
	});

	return self;
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	satellite xponder/params
TVRO.Xponder = function(xml) {
	var self = {},
		xml = $(xml);

	self.id = $('id', xml).text();
	self.pol = $('pol', xml).text();
	self.band = $('band', xml).text();
	self.freq = $('freq', xml).text();
	self.symRate = $('symRate', xml).text();
	self.fec = $('fec', xml).text();
	self.netID = $('netID', xml).text();
	self.modType = $('modType', xml).text();
	// self.title // to be added into the web service by paul

	return self;
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	toggle
//	gets toggleClass(is-on) on click
//	use like so:
//
//	var toggle = TVRO.Toggle(element);
//	toggle.click(function(isOn) {
//		isOn here tells us if the
//		element hasClass(is-on)
//	})
TVRO.Toggle = function() {
	var self = $.apply($, arguments),
		callbacks = [];

	self.click(function() {
		self.toggleClass('is-on');
		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i].call(this, $(this).hasClass('is-on'));
		}
	});

	return $.extend({}, self, {
		//	we'll eventaully get rid of this function since we return self now
		setOn: function(isOn) {
			self.toggleClass('is-on', isOn);
			return this;
		},
		click: function() {
			if (typeof arguments[0] !== 'function') self.click();
			else callbacks.push(arguments[0]);
			return this;
		}
	});
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	table class
//	given some element #table
//	which contains some element #table-rows
//	and some element #template#table-row
//	#template gets detached from #table
//	when setData is called (expects an array, or something property 'length'),
//	a #table-row is created from #template and added to #table-rows
//	you can override setData to modify #table-row per #table-row
TVRO.Table = function(selector, context) {
	var self = $.apply($, arguments),
		template = $('[id ~= template ]', self).detach(),
		callbacks = [];

	// template.attr('id', template.attr('id').replace('template', ''));
	if (template.length) template.get(0).id = $.trim(template.get(0).id.replace('template', ''));

	return $.extend({}, self, {
		//	build(10) - makes 10 rows
		//	build(function(index, row) - use this function to build the row element at index
		build: function() {
			if (typeof arguments[0] !== 'function') {
				var tableRows = $('[id ~= table-rows ]', self).empty();
				for (var index = 0; index < arguments[0]; index++) {
					var row = template.clone();
					for (var i = 0; i < callbacks.length; i++) {
						callbacks[i].call(this, index, row);
					}
					tableRows.append(row);
				}
			} else callbacks.push(arguments[0]);
		},
		setData: function() {
			$('[id ~= table-rows ]', self).empty().append(
				$.map(arguments[0], function() { return template.clone(); }));
		}
	});
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	radio class
//	the gist of this class is:
//	given some element #radio
//	each #radio-option in #radio can become .is-selected on click
//	and all other #radio-option in #radio will lose .is-selected
TVRO.Radio = function() {
	var self = $.apply($, arguments),
		options, // look at refresh function
		callbacks = [],
		click = function() {
			var option = $(this);
			options.removeClass('is-selected');
			option.addClass('is-selected');
			for (var i = 0; i < callbacks.length; i++) {
				callbacks[i].call(this, option.attr('value'));
			}
		},
		refresh = function() {
			options = $('[id ~= radio-option ]', self);
			options.unbind('click', click).click(click);
		}

	refresh();

	return $.extend({}, self, {
		refresh: refresh,
		click: function() {
			if (typeof arguments[0] !== 'function') options.filter('[value="'+arguments[0]+'"]').click();
			else callbacks.push(arguments[0]);
		},
		selectedValue: function() {
			return options.filter('.is-selected').attr('value');
		},
		setSelectedValue: function() {
			options.removeClass('is-selected');
			options.filter('[value="'+arguments[0]+'"]').addClass('is-selected');
		}
	});
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	dropdown class
//	a popup that contains a radio
//	setButtons takes whatever elements you give it
//	assigns a click that shows the dropdown and
//	positions the dropdown over the button
//
//	also if the button has a #radio-value it will
//	$(#radio-value).text(radio.selectedValue())
//	when a #radio-option is selected
TVRO.Dropdown = function() {
	var self = $.apply($, arguments),
		radio = TVRO.Radio(self),
		buttons,
		click = function() {
			self.show();
			$('[id ~= dropdown-content ]', self).offset($(this).offset());
		}

	radio.click(function(value) {
		if (buttons) $('[id ~= radio-value ]', buttons).text(value);
		self.hide();
	});

	$('[id ~= close-btn ]', self).click(function() {
		self.hide();
	});

	return $.extend({}, self, radio, {
		setButtons: function() {
			if (buttons) buttons.unbind('click', click);
			buttons = $.apply($, arguments);
			buttons.click(click);
		},
		setSelectedValue: function() {
			radio.setSelectedValue(arguments[0]);
			if (buttons) $('[id ~= radio-value ]', buttons).text(radio.selectedValue());
		}
	});
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SatelliteTrackingView = function() {
	var 
	self = $.apply($, arguments),
	webService = TVRO.WebService(),
	switchingModeBtn = TVRO.Toggle('[id ~= mode-btn ]', self),
	satellitesRadio = TVRO.Radio('[id ~= satellite-dropdown ]', self),
	refresh = function() {
		webService.request('antenna_status', function(response) {
			var detailsView = $('[id ~= details-view ]', self);
			$('[id ~= name ]', detailsView).text($('satellite name', response).text());
			$('[id ~= region ]', detailsView).text($('satellite region', response).text());
			$('[id ~= status ]', detailsView).text($('antenna state', response).text());
			$('[id ~= signal ]', detailsView).removeClass('is-0 is-1 is-2 is-3 is-4 is-5');
			$('[id ~= signal ]', detailsView).addClass('is-'+$('antenna rf bars', response).text());
		});

		webService.request('get_autoswitch_status', function(response) {
			var isManual = $('enable:eq(0)', response).text() === 'Y';

			if (isManual) {
				var slots = ['a', 'b', 'c', 'd'],
					selectedSlot = $('master sat', response).text(),
					selectedSatellite = $('satellites '+selectedSlot, response);

				for (var i = 0; i < slots.length; i++) {
					var satellite = $('satellites '+slots[i].toUpperCase(), response),
						slotBtn = $('[id ~= slot-'+slots[i]+'-btn ]', satellitesRadio);

					slotBtn.toggle(satellite.children().length > 0);
					slotBtn.attr('value', $('antSatID', satellite).text());
					$('[id ~= name ]', slotBtn).text($('name', satellite).text());
					$('[id ~= region ]', slotBtn).text($('region', satellite).text());
				}

				satellitesRadio.setSelectedValue($('antSatID', selectedSatellite).text());
			}

			switchingModeBtn.toggleClass('is-on', isManual);
			satellitesRadio.toggle(isManual);
		});
	}

	switchingModeBtn.click(function(isManual) {
		webService.request('set_autoswitch_service', {
			enabled: (isManual ? 'N' : 'Y')
		}, refresh);
	});

	satellitesRadio.click(function(antSatID) {
		webService.request('select_satellite', {
			antSatID: antSatID
		}, refresh);
	});

	refresh();

	return $.extend({}, self, {
		refresh: refresh
	});
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

$(document).ready(function() {
	TVRO.init();
});
