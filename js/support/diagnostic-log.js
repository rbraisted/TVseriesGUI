TVRO.DiagnosticLog = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#diagnostic-log-btn').toggleClass('selected', true);

		$('#operational-btn').click(function() {
			window.location.href = 'logfile.php?file=IPACU.serial.log';
		});

		$('#entry-btn').click(function() {
			window.location.href = 'logfile.php?file=majorError.log';
		});

		$('#start-btn, #restart-btn').click(function() {
			var restart = {
				'start-btn' : 'N',
				'restart-btn' : 'Y'
			}[this.id];
			
			webService.startSerialLog({
				'restart' : restart
			}, function(responseXml) {
				var xml = $(responseXml),
					error = $(xml).find('message').attr('error');
			});
		});
	};

	return self;
};

$(document).ready(function() {
	window.tvro.supportPage.diagnosticLog = new TVRO.DiagnosticLog();
	window.tvro.supportPage.diagnosticLog.init();
});