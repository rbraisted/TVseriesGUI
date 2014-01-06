"use strict";



TVRO.SettingsPage = function() {
	var self = {},
		page,
		menu;

	self.init = function() {
		page = $('[id ~= page ]');
		menu = $('[id ~= menu ]', page);

		var	menuBtns = $('[id ~= menu-btn ]', menu);
		menuBtns.click(function() {
			var menuBtn = $(this);

			$('[id ~= view ]').removeClass('is-active');
			if (menuBtn.hasId('general-settings-btn')) $('[id ~= general-settings-view ]').addClass('is-active');
			else if (menuBtn.hasId('network-settings-btn')) $('[id ~= network-settings-view ]').addClass('is-active');
			else if (menuBtn.hasId('advanced-settings-btn')) $('[id ~= advanced-settings-view ]').addClass('is-active');

			menuBtns.removeClass('is-selected');
			menuBtn.addClass('is-selected');
		});

		TVRO.GeneralSettingsView(page).init();
		// TVRO.NetworkSettingsView(page).init();
		TVRO.AdvancedSettingsView(page).init();
	}

	return self;
}



TVRO.GeneralSettingsView = function(page) {
	var self = {},
		view,
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		view = $('[id ~= general-settings-view ]', page);
		var demoModeBtn = $('[id ~= demo-mode-btn ]', view),
			technicianModeBtn = $('[id ~= technician-mode-btn ]', view);
		
		technicianModeBtn.click(function() {
			if (!cookieManager.removeCookie(TVRO.TECH_MODE)) cookieManager.setCookie(TVRO.TECH_MODE);
			technicianModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.TECH_MODE));
		}).toggleClass('is-on', cookieManager.hasCookie(TVRO.TECH_MODE));

		demoModeBtn.click(function() {
			if (!cookieManager.removeCookie(TVRO.DEMO_MODE)) cookieManager.setCookie(TVRO.DEMO_MODE);
			demoModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.DEMO_MODE));
		}).toggleClass('is-on', cookieManager.hasCookie(TVRO.DEMO_MODE));
	}

	return self;
}



TVRO.NetworkSettingsView = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		webService.request('get_wlan', function(response) {
			var mode = response.find('ipacu_response > mode').text();
			$('#wireless-mode').text(mode);
			$('#if-mode').toggle(mode === 'IF');
			$('#adhoc-mode').toggle(mode === 'ADHOC');
			if (mode === 'IF') {
				$('#wireless-mode').text(response.find('if_mode > mode').text());
				$('#if-ip').text(response.find('if_mode > ip').text());
				$('#if-subnet').text(response.find('if_mode > netmask').text());
				$('#if-gateway').text(response.find('if_mode > gateway').text());
				$('#if-broadcast').text(response.find('if_mode > broadcast').text());
				$('#if-ssid').text(response.find('if_mode > essid').text());
			} else if (mode === 'ADHOC') {
				$('#adhoc-ip').text(response.find('adhoc_mode > ip').text());
				$('#adhoc-security').text(response.find('adhoc_mode > security > mode').text());
				$('#adhoc-password').text(response.find('adhoc_mode > security > key').text());
			}
		});

		webService.request('get_eth', function(response) {
			var mode = response.find('mode').text();
			$('#ethernet-mode').text(mode);
			$('#ethernet-ip').text(response.find('ip').text());
			$('#ethernet-subnet').text(response.find('netmask').text());
			$('#ethernet-gateway').text(response.find('gateway').text());
			$('#ethernet-broadcast').text(response.find('broadcast').text());
			$('#wireless-settings').toggle(mode !== 'OFF');
		});
	}

	return self;
}



TVRO.AdvancedSettingsView = function(page) {
	var self = {},
		view,
		webService = new TVRO.WebService();

	self.init = function() {
		view = $('[id ~= advanced-settings-view ]', page);
		var sleepModeBtn = $('[id ~= sleep-mode-btn ]', view),
			sidelobeModeBtn = $('[id ~= sidelobe-mode-btn ]', view);

		webService.request('get_antenna_config', function(response) {
			sleepModeBtn.toggleClass('is-on', $('sleep', response).text() === 'ON');
			sidelobeModeBtn.toggleClass('is-on', $('sidelobe', response).text() === 'ON');
		});

		$([sleepModeBtn, sidelobeModeBtn]).click(function() {
			$(this).toggleClass('is-on');

			var sleepMode = sleepModeBtn.hasClass('is-on') ? 'ON' : 'OFF',
				sidelobeMode = sidelobeModeBtn.hasClass('is-on') ? 'ON' : 'OFF';

			webService.request('set_antenna_config', {
				'sleep' : sleepMode,
				'sidelobe' : sidelobeMode
			});
		});
	}

	return self;
}



TVRO.page = new TVRO.SettingsPage();