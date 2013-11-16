var RestartSystem = function() {

	$('#system-button, #antenna-button, #all-button').click(function() {
		var sys = {
			'system-button' : 'SBC',
			'antenna-button' : 'ANT',
			'all-button' : 'ALL'
		}[this.id];

		$.ajax({
			type : 'post',
			url : '/dummy/antservice.php',
			contentType : 'text/xml',
			processData : false,
			dataType : 'xml',
			data : 	'<ipacu_request>'+
						'<message name="reboot" />'+
						'<sys>'+sys+'</sys>'+
					'</ipacu_request>',
			success: function(responseXml) {
				var xml = $(responseXml),
					error = $(xml).find('message').attr('error');
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
		});
	});	
};

$(document).ready(function() {
	window.RestartSystem = new RestartSystem();
});