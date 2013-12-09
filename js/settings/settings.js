"use strict";

TVRO.SettingsPage = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#settings-btn').toggleClass('selected', true);

		if (self.mc && self.mc.init) {
			self.mc.init();
		} 
	};

	return self;
};

TVRO.page = new TVRO.SettingsPage();