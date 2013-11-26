TVRO.AboutTheApp = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#about-the-app-btn').toggleClass('selected', true);
	};

	return self;
};

$(document).ready(function() {
	window.tvro.supportPage.aboutTheApp = new TVRO.AboutTheApp();
	window.tvro.supportPage.aboutTheApp.init();
});