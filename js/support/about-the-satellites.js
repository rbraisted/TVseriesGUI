TVRO.AboutTheSatellites = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#about-the-satellites-btn').toggleClass('selected', true);
	};

	return self;
};

$(document).ready(function() {
	window.tvro.supportPage.aboutTheSatellites = new TVRO.AboutTheSatellites();
	window.tvro.supportPage.aboutTheSatellites.init();
});