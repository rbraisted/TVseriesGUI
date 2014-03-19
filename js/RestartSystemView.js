!function(exports) {
	var RestartSystemView = function(jQ) {
		var self;
		var systemBtn = $('.\\#system-btn', jQ);
		var antennaBtn = $('.\\#antenna-btn', jQ);
		var allBtn = $('.\\#all-btn', jQ);

		systemBtn.click(function() {
			if (confirm('Are you sure you want to restart the system?')) {
				tvro.ws.reboot({'sys':'SBC'});
			}
		});

		antennaBtn.click(function() {
			if (confirm('Are you sure you want to restart the antenna?')) {
				tvro.ws.reboot({'sys':'ANT'});
			}
		});

		allBtn.click(function() {
			if (confirm('Are you sure you want to restart the system and the antenna?')) {
				tvro.ws.reboot({'sys':'ALL'});
			}
		});

		return self = {}
	}

	exports.RestartSystemView = RestartSystemView;
}(window);