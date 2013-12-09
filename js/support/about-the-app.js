"use strict";

TVRO.AboutTheApp = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#about-the-app-btn').toggleClass('selected', true);
	};

	return self;
};

TVRO.page.mc = new TVRO.AboutTheApp();