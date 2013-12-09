"use strict";

TVRO.AboutBlockage = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#about-blockage-btn').toggleClass('selected', true);
	};

	return self;
};

TVRO.page.mc = new TVRO.AboutBlockage();