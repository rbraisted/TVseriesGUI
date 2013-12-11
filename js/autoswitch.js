"use strict";

TVRO.AutoswitchPage = function() {
	var self = {};

	self.init = function() {
		$('#autoswitch-btn').toggleClass('selected', true);
	};

	return self;
};

TVRO.page = new TVRO.AutoswitchPage();