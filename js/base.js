var TVRO = function() {
	var tvro = {};

	$('.nav-toggle').click(function() {
		$(this).toggleClass('selected');
		$('.nav').toggleClass('toggled');
	});

	return tvro;
};

TVRO.WebService = function() {
	var webService = {},
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

	webService.getAntennaVersions = function(successCallback, errorCallback) {
		sendRequest(antWebServiceUrl, 'antenna_versions', null, successCallback, errorCallback);
	};

	webService.getAntennaStatus = function(successCallback, errorCallback) {
		sendRequest(antWebServiceUrl, 'antenna_status', null, successCallback, errorCallback);
	};

	webService.getEventHistoryCount = function(successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'get_event_history_count', null, successCallback, errorCallback);
	};

	webService.getEventHistoryLog = function(successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'get_event_history_log', null, successCallback, errorCallback);
	};

	webService.getPortalVersion = function(antType, successCallback, errorCallback) {
		//	use anttype to get url
		var requestUrl = 'http://www.kvh.com/HD11UpdatesDir/mainUpdate/portalMain.php/latest_software';
		sendRequest(requestUrl, null, null, successCallback, errorCallback);
	} 

	webService.getProductRegistration = function(requestJson, successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'set_product_registration', requestJson, successCallback, errorCallback);
	};

	webService.getRecentEventHistory = function(requestJson, successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'get_recent_event_history', requestJson, successCallback, errorCallback);
	};

	webService.setProductRegistration = function(requestJson, successCallback, errorCallback) {
		sendRequest(xmlWebServiceUrl, 'set_product_registration', requestJson, successCallback, errorCallback);
	};

	webService.startSerialLog = function(requestJson, successCallback, errorCallback) {
		sendRequest(antWebServiceUrl, 'start_serial_log', requestJson, successCallback, errorCallback);
	};

	return webService;
};

$(document).ready(function() {
	window.tvro = new TVRO();
});