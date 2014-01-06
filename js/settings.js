"use strict";



TVRO.SettingsPage = function() {
	var self = {};

	self.init = function() {
		var page = $('[id ~= page ]'),
			menu = $('[id ~= menu ]', page),
			menuBtns = $('[id ~= menu-btn ]', menu),
			generalSettingsView = TVRO.GeneralSettingsView(),
			networkSettingsView = TVRO.NetworkSettingsView(),
			advancedSettingsView = TVRO.AdvancedSettingsView(),
			activeView;

		generalSettingsView.init();
		networkSettingsView.init();
		advancedSettingsView.init();

		menuBtns.click(function() {
			var menuBtn = $(this);

			if (menuBtn.hasClass('is-selected')) return;

			menuBtns.removeClass('is-selected');
			menuBtn.addClass('is-selected');

			if (activeView) activeView.hide();

			if (menuBtn.hasId('general-settings-btn')) activeView = generalSettingsView;
			else if (menuBtn.hasId('network-settings-btn')) activeView = networkSettingsView;
			else if (menuBtn.hasId('advanced-settings-btn')) activeView = advancedSettingsView;

			activeView.show();
		});
	}

	return self;
}



TVRO.GeneralSettingsView = function(page) {
	var self = {},
		view,
		demoModeBtn,
		technicianModeBtn,
		cookieManager = new TVRO.CookieManager();
		
	self.init = function() {
		view = $('[id ~= general-settings-view ]', page);
		demoModeBtn = $('[id ~= demo-mode-btn ]', view);
		technicianModeBtn = $('[id ~= technician-mode-btn ]', view);
		
		demoModeBtn.click(function() {
			if (!cookieManager.removeCookie(TVRO.DEMO_MODE)) cookieManager.setCookie(TVRO.DEMO_MODE);
			demoModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.DEMO_MODE));
		});

		technicianModeBtn.click(function() {
			if (!cookieManager.removeCookie(TVRO.TECH_MODE)) cookieManager.setCookie(TVRO.TECH_MODE);
			technicianModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.TECH_MODE));
		});
	}

	self.show = function() {
		demoModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.DEMO_MODE));
		technicianModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.TECH_MODE));
		view.addClass('is-active');
	}

	self.hide = function() {
		view.removeClass('is-active');
	}

	return self;
}



TVRO.AdvancedSettingsView = function(page) {
	var self = {},
		view,
		sleepModeBtn,
		sidelobeModeBtn,
		webService = new TVRO.WebService();

	self.init = function() {
		view = $('[id ~= advanced-settings-view ]', page);
		sleepModeBtn = $('[id ~= sleep-mode-btn ]', view);
		sidelobeModeBtn = $('[id ~= sidelobe-mode-btn ]', view);

		$(sleepModeBtn).add(sidelobeModeBtn).click(function() {
			$(this).toggleClass('is-on');

			var sleepMode = sleepModeBtn.hasClass('is-on') ? 'ON' : 'OFF',
				sidelobeMode = sidelobeModeBtn.hasClass('is-on') ? 'ON' : 'OFF';

			webService.request('set_antenna_config', {
				'sleep' : sleepMode,
				'sidelobe' : sidelobeMode
			});
		});
	}

	self.show = function() {
		webService.request('get_antenna_config', function(response) {
			sleepModeBtn.toggleClass('is-on', $('sleep', response).text() === 'ON');
			sidelobeModeBtn.toggleClass('is-on', $('sidelobe', response).text() === 'ON');
		});
		view.addClass('is-active');
	}

	self.hide = function() {
		view.removeClass('is-active');
	}

	return self;
}



TVRO.NetworkSettingsView = function(page) {
	var self = {},
		view,
		webService = new TVRO.WebService();

	self.init = function() {
		view = $('[id ~= network-settings-view ]', page);
		
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

	self.show = function() {

		view.addClass('is-active');
	}

	self.hide = function() {
		view.removeClass('is-active');
	}

	return self;
}



TVRO.WirelessSettingsView = function(view) {
	var self = {},
		view,
		webService = new TVRO.WebService();

	self.init = function() {

	}

	self.show = function() {
		view.addClass('is-active');
	}

	self.hide = function() {
		view.removeClass('is-active');
	}

	return self;
}

TVRO.page = new TVRO.SettingsPage();