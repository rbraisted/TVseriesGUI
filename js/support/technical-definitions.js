"use strict";

TVRO.TechnicalDefinitions = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#technical-definitions-btn').toggleClass('selected', true);
	};

	return self;
};

TVRO.page.mc = new TVRO.TechnicalDefinitions();