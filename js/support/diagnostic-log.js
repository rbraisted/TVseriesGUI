TVRO.DiagnosticLog = function() {
	var self = {},
		webService = new TVRO.WebService();

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
		
		webService.startSerialLog({
			'restart' : restart
		}, function(responseXml) {
			var xml = $(responseXml),
				error = $(xml).find('message').attr('error');
		});
	});

	return self;
};

$(document).ready(function() {
	window.tvro.diagnosticLog = new TVRO.DiagnosticLog();
});