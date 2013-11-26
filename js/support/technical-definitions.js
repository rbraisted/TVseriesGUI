TVRO.TechnicalDefinitions = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#technical-definitions-btn').toggleClass('selected', true);
	};

	return self;
};

$(document).ready(function() {
	window.tvro.supportPage.technicalDefinitions = new TVRO.TechnicalDefinitions();
	window.tvro.supportPage.technicalDefinitions.init();
});