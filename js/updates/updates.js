var UpdatesPage = function() {

	$.ajaxSetup({
		type: 'post',
		contentType : "text/xml",
		processData : false,
		dataType : 'xml'
	});

	setInterval(func, 2000);

	var url = 'http://www.kvh.com/HD11UpdatesDir/mainUpdate/HD11-110.kvh';

	function func() {
		$.ajax({
			//	we have to make this call in php actually
			url : 'http://www.kvh.com/HD11UpdatesDir/mainUpdate/portalMain.php/latest_software',
			success: function(responseXml) {
				var xml = $(responseXml),
					error = xml.find('latest_software').attr('error'),
					softwareVersion = xml.find('software_version').text();

				url = xml.find('url').text();
				$('#portal').text(softwareVersion);
			}
		});

		$.ajax({
			url : 'dummy/antservice.php',
			data : 	'<ipacu_request>'+
						'<message name="antenna_versions" />'+
					'</ipacu_request>',
			success: function(responseXml) {
				var xml = $(responseXml),
					error = xml.find('message').attr('error'),
					current = xml.find('current').text();
				$('#system').text(current);
			}
		});
	}

	$('#download-button').click(function() {
		window.location = url;
	});

	$('#link-button').click(function() {
		// window.location = "http://google.com";
		window.open("http://google.com");
	});

	$('#tel-button').click(function() {
		window.location = "tel:8189425393";
	});

	$('#mailto-button').click(function() {
		window.location = "mailto:miky@vainmedia.com";
	});
};

$(document).ready(function() {
	window.updatesPage = new UpdatesPage();
});