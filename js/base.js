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
		$(this).removeClass().addClass(className);
	}
}(jQuery));

/*
	check if our app namespace has been defined
	if the user is running this from a native iOS/Android
	app, we should see that the native web views will have
	injected TVRO = { MOBILE_APP : true } before any other
	javascript is executed, so we don't want to overwrite that
	*/
if (typeof TVRO === 'undefined') {
	var TVRO = {};
}
/*
	as mentioned above,
	MOBILE_APP and SAT_FINDER should be set by iOS/Android
	web view before any other script executes
	*/
TVRO = {
	MOBILE_APP : TVRO.MOBILE_APP || false,
	SAT_FINDER : TVRO.SAT_FINDER || false,
	DEMO_MODE : 'demo-mode',
	TECH_MODE : 'technician-mode',
	ANT_TYPES : {
		TV1 : 'tv1',
		TV3 : 'tv3',
		TV5 : 'tv5',
		TV6 : 'tv6'
	}
}

TVRO.init = function() {
	var header = $('[id ~= header ]'),
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
			};

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
			};


			//	if the cookie doesn't exist, return false
			//	use this to handle toggles where no value is set for the cookie
			//	ie demo mode:
			//	if (!removeCookie(demoMode)) setCookie(demoMode);
			singleton.removeCookie = function(key) {
				if (!key || !singleton.hasCookie(key)) return false;
				key = encodeURIComponent(key);
				document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
				return true;
			};

			singleton.hasCookie = function(key) {
				return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
			};
		}
		return singleton;
	}
}());

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

/*
	webservice
	pass request parameters as json
	they'll be converted to xml for you
	for example:

	user: {
		firstname : 'Olivia',
		lastname : 'Wheatley',
		city : 'Oxford',
		state : 'Oxfordshire'
	}

	will be sent as:

	<user>
		<firstname>Olivia</firstname>
		<lastname>Wheatley</lastname>
		<city>Oxford</city>
		<state>Oxfordshire</state>
	</user>
	*/
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

				requestXml = '<ipacu_request><message name="'+requestName+'" />'+jsonAsXml(requestJson)+'</ipacu_request>';

				$.ajax({
					async : async,
					type : 'post',
					contentType : 'text/xml',
					processData : false,
					dataType : 'xml',
					url : requestUrl,
					data : requestXml,
					success : function(response) {
						console.log('\n------------------------------------------------------------');
						console.log('  '+requestName.toUpperCase());
						console.log($(requestXml).get(0));

						var error = $(response).find('ipacu_response > message').attr('error');

						console.log(error === '0' ? 'success!' : 'error: '+error);
						console.log($('ipacu_response', response).get(0));
						console.log('------------------------------------------------------------\n');

						if (error === '0' && successCallback) successCallback($(response));
						else if (error !== '0' && errorCallback) errorCallback(error);
					},
					error : function(jqXHR, textStatus, errorThrown) {
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

TVRO.Dropdown = function(dropdown, dropdownBtn) {
	var self = {},
		dropdown = $(dropdown),
		optionSelected = [];

	self.setSelectedValue = function(value) {
		$('[id ~= dropdown-option]', dropdown).removeClass('is-selected');
		$('[id ~= dropdown-option][value = "'+value+'"]', dropdown).addClass('is-selected');
	}

	self.selectValue = function(value) {
		$('[id ~= dropdown-option][value = "'+value+'"]', dropdown).click();
	}

	self.optionSelected = function() {
		if (typeof arguments[0] === 'function') {
			optionSelected.push(arguments[0]);
		}
	}

	self.selectedValue = function() {
		return $('[id ~= dropdown-option ].is-selected', dropdown).attr('value');
	}

	$(dropdownBtn).click(function() {
		dropdown.show();
		$('#dropdown-content', dropdown).offset($(this).offset());
	});

	$('[id ~= close-btn ]', dropdown).click(function() {
		self.hide();
	});

	$('[id ~= dropdown-option]', dropdown).click(function() {
		var dropdownOption = $(this);
		self.hide();
		self.setSelectedValue(dropdownOption.attr('value'));
		for (var i = 0; i < optionSelected.length; i++) {
			optionSelected[i]($('label', dropdownOption).text(), dropdownOption.attr('value'));
		}
	});

	self.show = function() {
		dropdown.show();
	}

	self.hide = function() {
		dropdown.hide();
	}

	return self;
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.Group = function(xml) {
	var self = {},
		xml = $(xml);

	self.name = $('group_name', xml).text();
	self.predefined = $('predefined', xml).text();
	self.satelliteA = TVRO.Satellite($('A', xml));
	self.satelliteB = TVRO.Satellite($('B', xml));
	self.satelliteC = TVRO.Satellite($('C', xml));
	self.satelliteD = TVRO.Satellite($('D', xml));

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.Satellite = function(xml) {
	var self = {},
		xml = $(xml);

	//	these values can be retrieved from
	//	get_satellite_list and get_satellite_params
	self.listID = $('listID', xml).text();
	self.antSatID = $('antSatID', xml).text();
	self.name = $('name', xml).text();
	self.region = $('region', xml).text();
	self.lon = Number($('lon', xml).text());
	self.suffix = $('suffix', xml).text();	//	not sure about this one
	self.enabled = $('enabled', xml).text();
	self.favorite = $('favorite', xml).text();
	self.select = $('select', xml).text();
	self.triSatID = $('triSatID', xml).text();
	//	these values can only be retrieved with get_satellite_params
	self.skew = $('skew', xml).text();
	self.lo1 = $('lo1', xml).text();
	self.lo2 = $('lo2', xml).text();
	self.kumode = $('kumode', xml).text();
	//	xponders can only be retrieved with get_satellite_params
	self.xponders = [];
	$('xponder', xml).each(function(index, xponder) {
		self.xponders[$(xponder).find('id').text()] = new TVRO.Xponder(xponder);
	});

	return self;
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

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

	return self;
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

/*
	toggle
	gets toggleClass(is-on) on click
	use like so:

	var toggle = TVRO.Toggle(element);
	toggle.click(function(isOn) {
		isOn here tells us if the
		element hasClass(is-on)
	})
	*/
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
		},
		click: function() {
			if (typeof arguments[0] !== 'function') self.click();
			else callbacks.push(arguments[0]);
		}
	});
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

/*
	table class
	given some element #table
	which contains some element #table-rows
	and some element #template#table-row
	#template gets detached from #table
	when setData is called (expects an array, or something property 'length'),
	a #table-row is created from #template and added to #table-rows
	you can override setData to modify #table-row per #table-row
	*/
TVRO.Table = function(selector, context) {
	var self = $.apply($, arguments),
		template = $('[id ~= template ]', self).detach(),
		callbacks = [];

	template.get(0).id = $.trim(template.get(0).id.replace('template', ''));

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

/*
	radio class
	the gist of this class is:
	given some element #radio
	each #radio-option in #radio can become .is-selected on click
	and all other #radio-option in #radio will lose .is-selected
	*/
TVRO.Radio = function() {
	var self = $.apply($, arguments),
		options, // look at refresh function
		callbacks = [],
		click = function() {
			var option = $(this);
			if (option.hasClass('is-selected')) {
				return;
			} else {
				options.removeClass('is-selected');
				option.addClass('is-selected');
				for (var i = 0; i < callbacks.length; i++) {
					callbacks[i].call(this, option.attr('value'));
				}
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

TVRO.RadioTable = function(selector, context) {
	var self = {},
		view,
		radio = TVRO.Radio(selector, context),
		table = TVRO.Table(selector, context);

	self.init = function() {
		view = $(selector, context);
		radio.init();
		table.init();
	}

	self.setData = function() {
		var data = arguments[0];
		table.setData(data);
		$('[id ~= radio-option ]', view).each(function(index, element) {
			this.setAttribute('value', data[index]);
			//	i ran into some kind of unexpected jQuery behavior here
			//	where $('[id ~= name ]', this) or $('[id ~= name ]', element)
			//	will collect all [id ~= name ] in $('[id ~= radio-option ]', view)
			//	instead of just [id ~= name ] in this or element
			//	so we'll do this instead:
			$('[id ~= radio-option ][value = '+data[index]+' ] [id ~= name ]', view).text(data[index]);
		});
		radio.init();
	}

	self.click = function() {
		radio.click(arguments[0]);
	}

	return self;
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