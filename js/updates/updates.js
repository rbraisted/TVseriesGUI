TVRO.Updates = function() {
	var updates = {},
		webService = new TVRO.WebService(),
		systemVersion,
		portalVersion,
		downloadUrl;

	var antType;

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

	$('#install-input').change(function() {
		$.ajaxFileUpload({
			// url : '/dummy/xmlservices.php',//upload_software',
			url : '/xmlservices.php/upload_software',
			secureuri : false,
			fileElementId : 'install-input',
			dataType : 'xml',
			success : function(responseXml) {
				var xml = $(xml),
					error = xml.find('message').attr('error'),
					fileName = xml.find('file_name').text();

				console.log('success!');
				console.log('responseXml:' + responseXml);
				console.log('fileName:' + fileName);

				//	upload success!
				//	now install -
				webService.installSoftware({
					'install' : 'Y',
					'filename' : fileName
				}, function() {
					//	install success!
				});
			},
			error : function(responseXml) {
				console.log('error!');
				console.log('responseXml:' + responseXml);
			}
		});
	});

	return updates;
};

$(document).ready(function() {
	window.tvro.updates = new TVRO.Updates();
});