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
	$('#nav-btn').click(function() {
		$(this).toggleClass('selected');
		$('#nav').toggleClass('toggled');
	});

	$('#sat-finder-btn').toggle(TVRO.SAT_FINDER);

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

				requestXml = '<ipacu_request><message name="'+requestName+'" />'+jsonAsXml(requestJson)+'</ipacu_request>'

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
					}
				});
			}
		}
		return singleton;
	}
}());

//	our generic dropdown class

TVRO.Dropdown = function(dropdownId, buttonId, callback, options) {
	var self = {},
		dropdown = $('#'+dropdownId),
		buttons = [];

	$('#'+buttonId).click(function() {
		dropdown.show();
		//	position dropdown over button
		dropdown.offset($(this).offset());
	});

	//	initialize with any options that are already in html
	//	we expect options to have this format:
	//	<tag class="dropdown-option" value="Option value"><img src="/images/img.gif">Option text</tag>
	dropdown.find('.dropdown-option').each(function() {
		buttons.push(this);
		$(this).click(optionSelected);
	});

	//	initialize with options
	//	options should be in this format:
	//	{
	//		'Option 1 Text' : 'option A value',
	//		'Option B Text' : 'option 2 value'
	//	}
	(function() {
		for (var key in options) {
			var value = options[key],
				button = $('<a href="#" value="'+value+'" class="dropdown-option"><img src="/images/img.gif">'+key+'</a>');
			buttons.push(button);
			button.click(optionSelected);
			dropdown.append(button);
		}
	}());

	function optionSelected() {
		dropdown.hide();
		$(buttons).removeClass('selected');
		$(this).toggleClass('selected', true);
		if (typeof callback === 'function') {
			callback(this.innerText, this.getAttribute('value'));
		}
	}

	//	if you want to set the selected option, you can do it using
	//	jQuery like so: $('#dropdown .dropdown-option[value='+value+']').click();

	return self;
};

TVRO.Table = function(tableId, tableRowId, dataHandler, data) {
	var self = {},
		rows = [],
		table = $('#'+tableId),
		tableRow = $('#'+tableRowId),
		numCols = tableRow.find('.table-col').length;

	//	first remove the tableRow from the dom
	tableRow.detach();
	tableRow.removeAttr('id');


	//	using data + dataHandlers set up each row
	//	and set up each col of each row
	//	expected data handler signature:
	//	function (data, row) {
	//		return row;
	//	}
	//	this assumes you know the structure of your table's rows/cols
	//	as defined in html
	self.setData = function(data) {
		table.find('.table-row').remove();
		for (var i = 0; i < data.length; i++) {
			table.append(dataHandler(data[i], tableRow.clone()));
		}
	};

	if (data) {
		self.setData(data);
	}

	return self;
};

TVRO.Satellite = function(satellite) {
	var self = {},
		satellite = $(satellite);

	//	these values can be retrieved from
	//	get_satellite_list and get_satellite_params
	self.listID = satellite.find('listID').text();
	self.antSatID = satellite.find('antSatID').text();
	self.name = satellite.find('name').text();
	self.region = satellite.find('region').text();
	self.lon = satellite.find('lon').text();
	self.suffix = satellite.find('suffix').text();	//	not sure about this one
	self.enabled = satellite.find('enabled').text();
	self.favorite = satellite.find('favorite').text();
	self.select = satellite.find('select').text();
	self.triSatID = satellite.find('triSatID').text();
	//	these values can only be retrieved with get_satellite_params
	self.skew = satellite.find('skew').text();
	self.lo1 = satellite.find('lo1').text();
	self.lo2 = satellite.find('lo2').text();
	self.kumode = satellite.find('kumode').text();
	//	xponders can only be retrieved with get_satellite_params
	self.xponders = [];
	satellite.find('xponder').each(function(index, xponder) {
		self.xponders[$(xponder).find('id').text()] = new TVRO.Xponder(xponder);
	});

	return self;
};

TVRO.Xponder = function(xponder) {
	var self = {};

	xponder = $(xponder);
	self.id = xponder.find('id').text();
	self.pol = xponder.find('pol').text();
	self.band = xponder.find('band').text();
	self.freq = xponder.find('freq').text();
	self.symRate = xponder.find('symRate').text();
	self.fec = xponder.find('fec').text();
	self.netID = xponder.find('netID').text();
	self.modType = xponder.find('modType').text();

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