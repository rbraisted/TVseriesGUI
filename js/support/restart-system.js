TVRO.RestartSystem = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#restart-system-btn').toggleClass('selected', true);

		$('#system-btn, #antenna-btn, #all-btn').click(function() {
			var sys = {
				'system-btn' : 'SBC',
				'antenna-btn' : 'ANT',
				'all-btn' : 'ALL'
			}[this.id];

			webService.reboot({
				'sys' : sys
			}, function(responseXml) {
				var xml = $(responseXml),
					error = $(xml).find('message').attr('error');
			});
		});
	};

	return self;
};

$(document).ready(function() {
	window.tvro.supportPage.restartSystem = new TVRO.RestartSystem();
	window.tvro.supportPage.restartSystem.init();
});