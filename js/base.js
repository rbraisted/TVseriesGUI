var TVRO = function() {
	var self = {},
		ios = [];

	$('.nav-toggle').click(function() {
		$(this).toggleClass('selected');
		$('.nav').toggleClass('toggled');
	});

	//	in iOS, after pages are loaded (after document.ready)
	//	the app shell will call 'tvro.ios()'. if you need something
	//	to be executed at that time you should add it like this:
	//	tvro.ios(function() { /* stuff happens here */ });
	self.ios = function(f) {
		if (typeof f == 'function') {
			ios.push(f);
		} else {
			for (var i = 0; i < ios.length; i++) {
				ios[i].call({});
			};			
		}
	}

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

	self.getProductRegistration = function(requestJson, successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'set_product_registration', requestJson, successCallback, errorCallback);
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