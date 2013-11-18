TVRO.Updates = function() {
	var updates = {},
		webService = new TVRO.WebService(),
		systemVersion,
		portalVersion,
		downloadUrl;

	webService.getPortalVersion(antType, function(responseXml) {
		var xml = $(responseXml),
			error = xml.find('latest_software').attr('error');

		downloadUrl = xml.find('url').text();
		portalVersion = xml.find('software_version').text();
		$('#portal-version').text(portalVersion);
	});

	webService.getAntennaVersions(function(responseXml) {
		var xml = $(responseXml),
			error = xml.find('message').attr('error');

		systemVersion = xml.find('current').text();
		$('#system-version').text(systemVersion);
	});

	$('#download-button').click(function() {
		window.location = url;
	});

	
};

$(document).ready(function() {
	window.tvro.updates = new TVRO.Updates();
});