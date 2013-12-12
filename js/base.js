"use strict";

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
	} else {
		console.warn('TVRO.page is not defined.');
	}
};

//	cookie manager singleton
//	note that cookies are set across all paths
//	note that getCookie vs hasCookie is like
//	getCookie 'cookieValue' vs hasCookie true
//	getCookie undefined vs hasCookie false

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
//	works kinda like this:
//	
//	webService.getSomeValue(function successCallback(response) {
//		//	do something
//	}, function errorCallback(response) {
//		//	do something you probably don't want to do
//	});
//	
//	webService.setSomeValue({
// 		parameter : value,
//		parameter : {
//			parameter : value,
//		}
//	}, function successCallback(response) {
//	}, function errorCallback(response) {
//	});
//
//	pass request parameters as json
//	they'll be converted to xml for you
//	for example:
//	
//	user: {
//		firstname: 'Olivia',
//		lastname: 'Wheatley',
//		city: 'Oxford',
//		state: 'Oxfordshire'
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
	//	TODO:
	//	consolidate this code
	//	make our 'sendRequest' function check for
	//	ANT_SERVICE or XML_SERVICE and use the appropriate
	//	url defined here depending on whether or not the
	//	app is in demo mode

	var singleton,
		ANT_SERVICE_URL = '//199.244.84.92/antservice.php',	//	for now this points to a bdu in rhode island
		XML_SERVICE_URL = '//199.244.84.92/webservices.php',//	for now this points to a bdu in rhode island
		DEMO_MODE_ANT_SERVICE_URL = '/dummy/antservice.php',
		DEMO_MODE_XML_SERVICE_URL = '/dummy/xmlservices.php',
		ANT_SERVICE = 'ant-service',
		XML_SERVICE = 'xml-service';

	//	so as part of the above todo,
	//	we will end up replacing these
	var	antWebServiceUrl = '/dummy/antservice.php',
		xmlWebServiceUrl = '/dummy/xmlservices.php';

	function requestJsonAsXmlString(requestJson) {
		var responseXml = '';
		for (var key in requestJson) {
			var value = requestJson[key];
			if (typeof value === 'object') responseXml += requestJsonAsXmlString(value);
			else responseXml += '<'+key+'>'+value+'</'+key+'>';
		}
		return responseXml;
	};

	function sendRequest(requestUrl, requestName, requestJson, successCallback, errorCallback) {
		var requestXml = '<ipacu_request><message name="'+requestName+'" />'+requestJsonAsXmlString(requestJson)+'</ipacu_request>';
		$.ajax({
			type: 'post',
			contentType : 'text/xml',
			processData : false,
			dataType : 'xml',
			url : requestUrl,
			data : requestXml,
			success : successCallback,
			error : errorCallback
		});
	};

	return function() {
		if (!singleton) {
			singleton = {};

			singleton.getAntennaConfig = function(successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'get_antenna_config', null, successCallback, errorCallback);
			};

			singleton.getAntennaStatus = function(successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'antenna_status', null, successCallback, errorCallback);
			};

			singleton.getAntennaVersions = function(successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'antenna_versions', null, successCallback, errorCallback);
			};

			singleton.getAutoswitchService = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'get_autoswitch_service', null, successCallback, errorCallback);
			};

			singleton.getEthernetSettings = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'get_eth', null, successCallback, errorCallback);
			};

			singleton.getEventHistoryCount = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'get_event_history_count', null, successCallback, errorCallback);
			};

			singleton.getEventHistoryLog = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'get_event_history_log', null, successCallback, errorCallback);
			};

			singleton.getPortalVersion = function(antType, successCallback, errorCallback) {
				//	since the tvro update urls aren't set up yet,
				//	we'll map tvro ant types to vsat ant types for testing
				if (antType === TVRO.ANT_TYPES.TV1) antType = 'v3';
				else if (antType === TVRO.ANT_TYPES.TV3) antType = 'v7';
				else if (antType === TVRO.ANT_TYPES.TV5) antType = 'v7ip';
				else if (antType === TVRO.ANT_TYPES.TV6) antType = 'v11';

				var requestUrl = 'http://www.kvh.com/VSAT/'+antType+'/portalMain.php/latest_software';
				sendRequest(requestUrl, 'latest_software', null, successCallback, errorCallback);
			} 

			singleton.getProductRegistration = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'get_product_registration', null, successCallback, errorCallback);
			};

			singleton.getRecentEventHistory = function(requestJson, successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'get_recent_event_history', requestJson, successCallback, errorCallback);
			};

			singleton.getWirelessSettings = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'get_wlan', null, successCallback, errorCallback);
			};

			singleton.getSatelliteList = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'get_satellite_list', requestJson, successCallback, errorCallback);
			};

			singleton.getSatelliteList2 = function(requestJson) {
				var	requestUrl = antWebServiceUrl,
					requestXml = '<ipacu_request><message name="get_satellite_list" />'+requestJsonAsXmlString(requestJson)+'</ipacu_request>',
					responseXml = '';
				$.ajax({
					async: false,
					type: 'post',
					contentType : 'text/xml',
					processData : false,
					dataType : 'text',
					url : requestUrl,
					data : requestXml,
					success : function(responseText) { responseXml = responseText; }
				});
				return responseXml;
			};

			singleton.getSatelliteParams = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'get_satellite_params', requestJson, successCallback, errorCallback);
			};

			singleton.installSoftware = function(requestJson, successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'install_software', requestJson, successCallback, errorCallback);
			};

			singleton.resetEthernetSettings = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'set_eth_factory', null, successCallback, errorCallback);
			};

			singleton.resetSatelliteParams = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'reset_satellite_params', requestJson, successCallback, errorCallback);
			};

			singleton.resetWirelessSettings = function(successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'set_wlan_factory', null, successCallback, errorCallback);
			};

			singleton.setAntennaConfig = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'set_antenna_config', requestJson, successCallback, errorCallback);
			};

			singleton.setAutoswitchService = function(requestJson, successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'set_autoswitch_service', requestJson, successCallback, errorCallback);
			};

			singleton.setEthernetSettings = function(requestJson, successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'set_eth', requestJson, successCallback, errorCallback);
			};

			singleton.setProductRegistration = function(requestJson, successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'set_product_registration', requestJson, successCallback, errorCallback);
			};

			singleton.setSatelliteIdentity = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'set_satellite_identity', requestJson, successCallback, errorCallback);
			};

			singleton.setSatelliteParams = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'set_satellite_params', requestJson, successCallback, errorCallback);
			};

			singleton.setSelectedSatellite = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'select_satellite', requestJson, successCallback, errorCallback);
			};

			singleton.setWirelessSettings = function(requestJson, successCallback, errorCallback) {
				sendRequest(xmlWebServiceUrl, 'set_wlan', requestJson, successCallback, errorCallback);
			};

			singleton.startSerialLog = function(requestJson, successCallback, errorCallback) {
				sendRequest(antWebServiceUrl, 'start_serial_log', requestJson, successCallback, errorCallback);
			};
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