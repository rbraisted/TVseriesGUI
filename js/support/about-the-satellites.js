"use strict";

TVRO.AboutTheSatellites = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#about-the-satellites-btn').toggleClass('selected', true);
	};

	return self;
};

TVRO.page.mc = new TVRO.AboutTheSatellites();