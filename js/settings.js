"use strict";



TVRO.SettingsPage = function() {
	var self = {};

	self.init = function() {
		var page = $(document.body),
			menu = $('[id ~= menu ]', page),
			menuBtns = $('[id ~= menu-btn ]', menu),
			backBtns = $('[id ~= back-btn ]', page);

		TVRO.GeneralSettingsView().init();
		TVRO.AdvancedSettingsView().init();
		TVRO.NetworkSettingsView().init();

		TVRO.EthernetSettingsView().init();
		TVRO.WirelessSettingsView().init();

		menuBtns.click(function() {
			var menuBtn = $(this);

			if (menuBtn.hasClass('is-selected')) return;

			menuBtns.removeClass('is-selected');
			menuBtn.addClass('is-selected');

			if (menuBtn.hasId('general-settings-btn')) $(document.body).setClass('at-general-settings');
			else if (menuBtn.hasId('advanced-settings-btn')) $(document.body).setClass('at-advanced-settings');
			else if (menuBtn.hasId('network-settings-btn')) $(document.body).setClass('at-network-settings');
		});

		backBtns.click(function() {
			$(document.body).setClass('at-menu');
			menuBtns.removeClass('is-selected');
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

		demoModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.DEMO_MODE));
		technicianModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.TECH_MODE));
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

		webService.request('get_antenna_config', function(response) {
			sleepModeBtn.toggleClass('is-on', $('sleep', response).text() === 'ON');
			sidelobeModeBtn.toggleClass('is-on', $('sidelobe', response).text() === 'ON');
		});
	}

	return self;
}



TVRO.NetworkSettingsView = function(page) {
	var self = {},
		view,
		ethernetSettingsView,
		wirelessSettingsView,
		webService = new TVRO.WebService();

	self.init = function() {
		view = $('[id ~= network-settings-view ]', page);
		ethernetSettingsView = $('[id ~= ethernet-settings ]', view);
		wirelessSettingsView = $('[id ~= wireless-settings ]', view);

		$('[id ~= edit-btn ]', ethernetSettingsView).click(function() {
			$(document.body).setClass('at-edit-ethernet-settings');
		});

		$('[id ~= edit-btn ]', wirelessSettingsView).click(function() {
			$(document.body).setClass('at-edit-wireless-settings');
		});		

		webService.request('get_eth', function(response) {
			var mode = $('mode', response).text();

			$('[id ~= mode ]', ethernetSettingsView).text(mode);
			$('[id ~= ip ]', ethernetSettingsView).text($('ip', response).text());
			$('[id ~= subnet ]', ethernetSettingsView).text($('netmask', response).text());
			$('[id ~= gateway ]', ethernetSettingsView).text($('gateway', response).text());
			$('[id ~= broadcast ]', ethernetSettingsView).text($('broadcast', response).text());

			wirelessSettingsView.toggle(mode !== 'OFF');
			if (mode !== 'OFF') {
				webService.request('get_wlan', function(response) {
					var mode = $('mode:eq(0)', response).text(),
						adhocMode = $('adhoc_mode', response),
						adhocView = $('[id ~= adhoc-view ]', wirelessSettingsView),
						infrastructureMode = $('if_mode', response),
						infrastructureView = $('[id ~= infrastructure-view ]', wirelessSettingsView);

					$('[id ~= mode ]', wirelessSettingsView).text(mode);
					adhocView.toggle(mode === 'ADHOC');
					infrastructureView.toggle(mode === 'IF');

					if (mode === 'ADHOC') {
						$('[id ~= ip ]', adhocView).text($('ip', adhocMode).text());
						$('[id ~= security ]', adhocView).text($('security > mode', adhocMode).text());
						$('[id ~= password ]', adhocView).text($('security > key', adhocMode).text());
					} else if (mode === 'IF') {
						$('[id ~= mode ]', view).text($('> mode', infrastructureMode).text());
						$('[id ~= ip ]', infrastructureView).text($('ip', infrastructureMode).text());
						$('[id ~= subnet ]', infrastructureView).text($('netmask', infrastructureMode).text());
						$('[id ~= gateway ]', infrastructureView).text($('gateway', infrastructureMode).text());
						$('[id ~= broadcast ]', infrastructureView).text($('broadcast', infrastructureMode).text());
						$('[id ~= ssid ]', infrastructureView).text($('essid', infrastructureMode).text());
					} 
				});
			}
		});
	}

	return self;
}



TVRO.EthernetSettingsView = function() {
	var self = {},
		view = $('[id ~= edit-ethernet-settings-view ]'),
		webService = new TVRO.WebService();

	self.init = function() {
		var staticView = $('[id ~= static-view ]', view),
			modeDropdown = new TVRO.Dropdown('#ethernet-mode-dropdown', '#mode-btn');
		modeDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]', view).text(name);
			staticView.toggle(value === 'STATIC');
		});

		webService.request('get_eth', function(response) {
			var mode = $('mode', response).text();
			modeDropdown.selectValue(mode);

			staticView.toggleClass(mode === 'STATIC');
			if (mode === 'STATIC') {
				$('[id ~= mode ]', staticView).text(mode);
				$('[id ~= ip ]', staticView).val($('ip', response).text());
				$('[id ~= subnet ]', staticView).val($('netmask', response).text());
				$('[id ~= gateway ]', staticView).val($('gateway', response).text());
				$('[id ~= broadcast ]', staticView).val($('broadcast', response).text());
			}
		});

		$('[id ~= cancel-btn ]', view).click(function() {
			$(document.body).setClass('at-network-settings');
		});

		$('[id ~= save-btn ]', view).click(function() {
			var mode = modeDropdown.selectedValue(),
				ethernetSettings = { 'mode' : mode };
				
			if (mode === 'STATIC') {
				ethernetSettings.ip = $('[id ~= ip ]', staticView).val();
				ethernetSettings.netmask = $('[id ~= subnet ]', staticView).val();
				ethernetSettings.gateway = $('[id ~= gateway ]', staticView).val();
				ethernetSettings.broadcast = $('[id ~= broadcast ]', staticView).val();
			}

			webService.request('set_eth', ethernetSettings);
			$(document.body).setClass('at-network-settings');
		});

		$('[id ~= reset-btn ]', view).click(function() {
			webService.request('set_eth_factory');
			$(document.body).setClass('at-network-settings');
		});
	}

	return self;
}



TVRO.WirelessSettingsView = function() {
	var self = {},
		view = $('[id ~= edit-wireless-settings-view ]'),
		webService = new TVRO.WebService();

	self.init = function() {

	}

	return self;
}



TVRO.page = new TVRO.SettingsPage();