"use strict";

(function($) {
	//	this is basically hasClass taken from jQuery source (1.10.2)
	//	but rewritten for ids
	$.fn.hasId = function( selector ) {
		var idName = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].id + " ").replace(/[\t\r\n\f]/g, " ").indexOf( idName ) >= 0 ) {
				return true;
			}
		}
		return false;
	};
}(jQuery));

//	check if our app namespace has been defined
//	if the user is running this from a native iOS/Android
//	app, we should see that the native web views will have
//	injected TVRO = { MOBILE_APP : true } before any other
//	javascript is executed, so we don't want to overwrite
//	that

if (typeof TVRO === 'undefined') {
	var TVRO = {};
}

//	as mentioned above,
//	MOBILE_APP and SAT_FINDER should be set by iOS/Android
//	web view before any other script executes

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
	// $('#nav-btn').click(function() {
	// 	$(this).toggleClass('selected');
	// 	$('#nav').toggleClass('toggled');
	// });

	$('#header > #nav-btn').click(function() {
		$('#nav-bar', '#header').toggleClass('is-expanded');
	});


	var webService = new TVRO.WebService();
	setInterval(function() {
		webService.request('antenna_status', function(response) {
			var acu = $('acu > state', response).text(),
				antenna = $('antenna > state', response).text();

			//	ACU
			//	acu > state OK | FLASHING | CALGYRO | ERROR
			//	something like
			$('[id ~= acu-state]', '#status-btn').removeClass('is-ok is-flashing is-calgyro is-error');
			$('[id ~= acu-state]', '#status-btn').toggleClass('is-ok', acu === 'OK');
			$('[id ~= acu-state]', '#status-btn').toggleClass('is-flashing', acu === 'FLASHING');
			$('[id ~= acu-state]', '#status-btn').toggleClass('is-calgyro', acu === 'CALGYRO');
			$('[id ~= acu-state]', '#status-btn').toggleClass('is-error', acu === 'ERROR');

			//	ANTENNA
			//	antenna > state INITIALIZING | WAITING FOR MODEM (Note: VSAT only) | MODEM SAT SWITCH (Note: VSAT only) | SEARCHING | TRACKING | IDLE | ERROR | CABLE UNWRAP
			$('[id ~= antenna-state]', '#status-btn').removeClass('is-initializing is-searching is-tracking is-idle is-error is-cable-unwrap');
			$('[id ~= antenna-state]', '#status-btn').toggleClass('is-initializing', antenna === 'INITIALIZING');
			$('[id ~= antenna-state]', '#status-btn').toggleClass('is-searching', antenna === 'SEARCHING');
			$('[id ~= antenna-state]', '#status-btn').toggleClass('is-tracking', antenna === 'TRACKING');
			$('[id ~= antenna-state]', '#status-btn').toggleClass('is-idle', antenna === 'IDLE');
			$('[id ~= antenna-state]', '#status-btn').toggleClass('is-error', antenna === 'ERROR');
			$('[id ~= antenna-state]', '#status-btn').toggleClass('is-cable-unwrap', antenna === 'CABLE UNWRAP');
		});
	}, 2000);

	$('#status-btn').click(function() {
		$(this).toggleClass('selected');
		$('#status').toggleClass('toggled');
	});

	TVRO.SAT_FINDER = false;

	$('[id ~= sat-finder-btn ]', '#nav-bar').toggle(TVRO.SAT_FINDER);

	$('[id ~= nav-btn ]', '#nav-bar').each(function(index, element) {
		$(element).toggleClass('is-selected', element.href === location.protocol+ '//' + location.hostname + (location.port ? ':' + location.port : '') + location.pathname);
	});

	if (TVRO.page && TVRO.page.init) {
		TVRO.page.init();
	}
};

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
			};

			singleton.removeCookie = function(key) {
				if (!key || !singleton.hasCookie(key)) return false;
				key = encodeURIComponent(key);
				document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
			};

			singleton.hasCookie = function(key) {
				return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
			};
		}
		return singleton;
	}
}());

//	webservice singleton
//	using this doc: SoftEng-56-0229IPACUXMLServicesICDrev.xB4-161213-1501-3.pdf
//	
//	pass request parameters as json
//	they'll be converted to xml for you
//	for example:
//
//	user: {
//		firstname : 'Olivia',
//		lastname : 'Wheatley',
//		city : 'Oxford',
//		state : 'Oxfordshire'
//	}
//
//	will be sent as:
//
//	<user>
//		<firstname>Olivia</firstname>
//		<lastname>Wheatley</lastname>
//		<city>Oxford</city>
//		<state>Oxfordshire</state>
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
						var error = $(response).find('ipacu_response > message').attr('error');
						if (error === '0' && successCallback) successCallback($(response));
						else if (error !== '0' && errorCallback) errorCallback(error);
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log('TVRO.WebService AJAX error!');
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});
			}
		}
		return singleton;
	}
}());

TVRO.Dropdown = function(dropdown, dropdownBtn) {
	var self = {},
		dropdown = $(dropdown),
		optionSelected = [];

	self.selectValue = function(value) {
		$('[id ~= dropdown-option][value = "'+value+'"]', dropdown).click();
	};

	self.optionSelected = function() {
		if (typeof arguments[0] === 'function') {
			optionSelected.push(arguments[0]);
		}
	};

	$('[id ~= dropdown-option]', dropdown).click(function() {
		$('[id ~= dropdown-option]', dropdown).removeClass('selected');
		$(this).toggleClass('selected', true);
		for (var i = 0; i < optionSelected.length; i++) {
			optionSelected[i](this.innerText, this.getAttribute('value'));
		}
		self.hide();
	});

	$(dropdownBtn).click(function() {
		dropdown.show();
		dropdown.offset($(this).offset());
	});

	self.show = function() {
		dropdown.show();
	};

	self.hide = function() {
		dropdown.hide();
	};

	return self;
};

TVRO.Satellite = function(xml) {
	var self = {},
		xml = $(xml);

	//	these values can be retrieved from
	//	get_satellite_list and get_satellite_params
	self.listID = $('listID', xml).text();
	self.antSatID = $('antSatID', xml).text();
	self.name = $('name', xml).text();
	self.region = $('region', xml).text();
	self.lon = $('lon', xml).text();
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


//	here's where the magic starts
//	note: it's not magic
//	this should be the only document.ready that inits
//	any TVRO app stuff
//	TVRO.init will call TVRO.page.init if it is available
//	TVRO.page should be set up by scripts included per page
//	ie if you have sidebar (#sb) or main content (#mc)
//	stuff that needs to be initialized you should set up
//	sb.init or mc.init in your TVRO.page

$(document).ready(function() {
	TVRO.init();
});