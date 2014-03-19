!function(exports) {	
	"use strict";

	var OperationalLogView = function(jQ) {
		var self;
		var viewBtn = $('.\\#view-btn', jQ);
		var startBtn = $('.\\#start-btn', jQ);
		var restartBtn = $('.\\#restart-btn', jQ);

		viewBtn.click(function() {
			window.location.href = 'logfile.php?file=IPACU.serial.log';
		});

		startBtn.click(function() {
			tvro.ws.startSerialLog({'restart':'N'});
		});

		restartBtn.click(function() {
			if (confirm('Are you sure you want to restart the antenna?')) {
				tvro.ws.startSerialLog({'restart':'Y'});
			}
		});

		return self = {}
	}

	exports.OperationalLogView = OperationalLogView;
	
}(window);