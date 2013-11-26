TVRO.AboutBlockage = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#about-blockage-btn').toggleClass('selected', true);
	};

	return self;
};

$(document).ready(function() {
	window.tvro.supportPage.aboutBlockage = new TVRO.AboutBlockage();
	window.tvro.supportPage.aboutBlockage.init();
});