var DiagnosticLog = function() {

	$('#operational-button').click(function() {
		window.location.href = 'logfile.php?file=IPACU.serial.log';
	});

	$('#entry-button').click(function() {
		window.location.href = 'logfile.php?file=majorError.log';
	});

	$('#start-button, #restart-button').click(function() {
		var restart = {
			'start-button' : 'N',
			'restart-button' : 'Y'
		}[this.id];
		
		$.ajax({
			type : 'post',
			url : '/dummy/xmlservices.php',
			contentType : 'text/xml',
			processData : false,
			dataType : 'xml',
			data : 	'<ipacu_request>'+
						'<message name="start_serial_log" />'+
						'<restart>'+restart+'</restart>'+
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
	window.DiagnosticLog = new DiagnosticLog();
});