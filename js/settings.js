"use strict";

TVRO.SettingsPage = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#settings-btn').toggleClass('selected', true);

		$('[id ~= menu-btn ]').click(function() {
			var btn = $(this),
				view = '';
			
			if (btn.hasId('general-settings-btn')) view = 'general-settings-view';
			else if (btn.hasId('network-settings-btn')) view = 'network-settings-view';
			else if (btn.hasId('advanced-settings-btn')) view = 'advanced-settings-view';

			$('[id ~= general-settings-view ], [id ~= network-settings-view ], [id ~= advanced-settings-view ], #menu').removeClass('is-active');
			$('[id ~= '+view+' ]').toggleClass('is-active', true);

			$('[id ~= menu-btn ]').removeClass('is-selected');
			btn.toggleClass('is-selected', true);
		});


		if (self.mc && self.mc.init) {
			self.mc.init();
		}

		TVRO.GeneralSettingsView().init();
	};

	

	return self;
};

TVRO.GeneralSettingsView = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('[id ~= back-btn ]').click(function() {
			$('[id ~= menu-btn ]').removeClass('is-selected');
			$('#general-settings-view, #network-settings-view, #advanced-settings-view').removeClass('is-active');
			$('#menu').toggleClass('is-active', true);
		});
		
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


TVRO.page = new TVRO.SettingsPage();