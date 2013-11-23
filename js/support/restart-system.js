TVRO.RestartSystem = function() {
	var self = {},
		webService = new TVRO.WebService();

	$('#system-button, #antenna-button, #all-button').click(function() {
		var sys = {
			'system-button' : 'SBC',
			'antenna-button' : 'ANT',
			'all-button' : 'ALL'
		}[this.id];

		webService.reboot({
			'sys' : sys
		}, function(responseXml) {
			var xml = $(responseXml),
				error = $(xml).find('message').attr('error');
		});
	});	

	return self;
};

$(document).ready(function() {
	window.tvro.restartSystem = new TVRO.RestartSystem();
});