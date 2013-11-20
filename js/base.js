var TVRO = function() {
	var self = {};

	$('#nav-button').click(function() {
		$(this).toggleClass('selected');
		$('#nav').toggleClass('toggled');
	});

	//	all immediate kids of tvro
	//	will have their 'ios' function
	//	called if it's available
	self.ios = function(f) {
		for (var key in self) {
			if (typeof self[key]['ios'] == 'function') {
				self[key].ios();
			}
		}
	}

	return self;
};

TVRO.Cookies = function() {
	var self = {};

	self.getCookie = function(key) {
		return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
	};

	self.setCookie = function(key, value, end, path, domain, secure) {
		if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;

		var expires = {
			'string' : '; expires=' + end,
			'number' : (end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end),
			'date' : '; expires=' + new Date(end).toUTCString(),
			'undefined' : ''
		}[typeof end];

		key = encodeURIComponent(key);
		value = encodeURIComponent(value);
		domain = domain ? '; domain=' + domain : '';
		path = path ? '; path=' + path : '';
		secure = secure ? '; secure' : '';
		document.cookie = key + '=' + value + expires + domain + path + secure;
	};

	self.removeCookie = function(key, path, domain) {
		if (!key || !self.hasCookie(key)) return false;

		key = encodeURIComponent(key);
		domain = domain ? '; domain=' + domain : '';
		path = path ? '; path=' + path : '';

		document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + domain + path;
	};

	self.hasCookie = function (key) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	};

	return self;
};

TVRO.WebService = function() {
	var self = {},
		antWebServiceUrl = '/dummy/antservice.php',
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
			contentType : "text/xml",
			processData : false,
			dataType : 'xml',
			url : requestUrl,
			data : requestXml,
			success : successCallback,
			error : errorCallback
		});
	};

	self.getAntennaVersions = function(successCallback, errorCallback) {
		sendRequest(antWebServiceUrl, 'antenna_versions', null, successCallback, errorCallback);
	};

	self.getAntennaStatus = function(successCallback, errorCallback) {
		sendRequest(antWebServiceUrl, 'antenna_status', null, successCallback, errorCallback);
	};

	self.getEventHistoryCount = function(successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'get_event_history_count', null, successCallback, errorCallback);
	};

	self.getEventHistoryLog = function(successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'get_event_history_log', null, successCallback, errorCallback);
	};

	self.getPortalVersion = function(antType, successCallback, errorCallback) {
		//	use anttype to get url
		//	for now, pretend we're vsat
		antType = {
			'tv1' : 'v3',
			'tv3' : 'v7',
			'tv5' : 'v7ip',
			'tv6' : 'v11'
		}[antType];

		var requestUrl = 'http://www.kvh.com/VSAT/'+antType+'/portalMain.php/latest_software';
		sendRequest(requestUrl, 'latest_software', null, successCallback, errorCallback);
	} 

	self.getProductRegistration = function(successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'get_product_registration', null, successCallback, errorCallback);
	};

	self.getRecentEventHistory = function(requestJson, successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'get_recent_event_history', requestJson, successCallback, errorCallback);
	};

	self.installSoftware = function(requestJson, successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'install_software', requestJson, successCallback, errorCallback);
	};

	self.setProductRegistration = function(requestJson, successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'set_product_registration', requestJson, successCallback, errorCallback);
	};

	self.startSerialLog = function(requestJson, successCallback, errorCallback) {
		sendRequest(antWebServiceUrl, 'start_serial_log', requestJson, successCallback, errorCallback);
	};

	return self;
};

$(document).ready(function() {
	window.tvro = new TVRO();
});