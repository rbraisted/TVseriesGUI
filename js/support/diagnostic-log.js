"use strict";

TVRO.DiagnosticLog = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#diagnostic-log-btn').toggleClass('selected', true);

		//	TODO:
		//	operational and entry btns should send us
		//	to a demo file if we are in demo mode
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
			
			webService.request('start_serial_log', {
				'restart' : restart
			}, function(response) {
				
			});
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.DiagnosticLog();