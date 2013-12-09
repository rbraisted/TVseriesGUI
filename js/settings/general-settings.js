"use strict";

TVRO.GeneralSettings = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#general-settings-btn').toggleClass('selected', true);
		
		$('#technician-mode-btn').click(function() {
			if (cookieManager.hasCookie(TVRO.TECH_MODE)) cookieManager.removeCookie(TVRO.TECH_MODE);
			else cookieManager.setCookie(TVRO.TECH_MODE);
			$('#technician-mode-btn').toggleClass('on', cookieManager.hasCookie(TVRO.TECH_MODE));
		}).toggleClass('on', cookieManager.hasCookie(TVRO.TECH_MODE));

		$('#demo-mode-btn').click(function() {
			if (cookieManager.hasCookie(TVRO.DEMO_MODE)) cookieManager.removeCookie(TVRO.DEMO_MODE);
			else cookieManager.setCookie(TVRO.DEMO_MODE);
			$('#demo-mode-btn').toggleClass('on', cookieManager.hasCookie(TVRO.DEMO_MODE));
		}).toggleClass('on', cookieManager.hasCookie(TVRO.DEMO_MODE));
	};

	return self;
};

TVRO.page.mc = new TVRO.GeneralSettings();