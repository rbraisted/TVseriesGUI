"use strict";



TVRO.SettingsPage = function() {
	var self = {};

	self.init = function() {
		var menu = $('[id ~= menu ]'),
			menuBtns = $('[id ~= menu-btn ]', menu),
			backBtns = $('[id ~= back-btn ]');

		TVRO.GeneralSettingsView().init();
		TVRO.AdvancedSettingsView().init();
		TVRO.NetworkSettingsView().init();

		TVRO.EditEthernetSettingsView().init();
		TVRO.EditWirelessSettingsView().init();

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

		$(document.body).setClass('at-edit-wireless-settings');
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



TVRO.EditEthernetSettingsView = function() {
	var self = {},
		view = $('[id ~= edit-ethernet-settings-view ]'),
		webService = new TVRO.WebService();

	self.init = function() {
		var staticView = $('[id ~= static-view ]', view),
			modeDropdown = new TVRO.Dropdown('[id ~= ethernet-mode-dropdown', $('[id ~= mode-btn ]', view));
		modeDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', view).text(name);
			staticView.toggle(value === 'STATIC');
		});

		webService.request('get_eth', function(response) {
			var mode = $('mode', response).text();
			modeDropdown.selectValue(mode);

			staticView.toggle(mode === 'STATIC');
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



TVRO.EditWirelessSettingsView = function() {
	var self = {},
		view = $('[id ~= edit-wireless-settings-view ]'),
		webService = TVRO.WebService();

	self.init = function() {
		var modeDropdown = new TVRO.Dropdown('[id ~= wireless-mode-dropdown ]', $('[id ~= mode-btn ]:eq(0)', view)),
			adhocView = $('[id ~= adhoc-view ]', view),
			adhocSecurityView = $('[id ~= security-view ]', adhocView),
			adhocSecurityDropdown = TVRO.Dropdown('[id ~= adhoc-security-dropdown ]', $('[id ~= security-btn ]', adhocView)),
			infrastructureView = $('[id ~= infrastructure-view ]', view),
			infrastructureModeDropdown = new TVRO.Dropdown('[id ~= infrastructure-mode-dropdown ]', $('[id ~= mode-btn ]:eq(0)', infrastructureView)),
			staticView = $('[id ~= static-view ]', infrastructureView),
			staticSecurityView = $('[id ~= security-view ]', staticView),
			staticSecurityDropdown = new TVRO.Dropdown('[id ~= static-security-dropdown ]', $('[id ~= security-btn ]', staticView)),
			dynamicView = $('[id ~= dynamic-view ]', infrastructureView),
			dynamicSecurityView = $('[id ~= security-view ]', dynamicView),
			dynamicSecurityDropdown = new TVRO.Dropdown('[id ~= dynamic-security-dropdown ]', $('[id ~= security-btn ]', dynamicView));

		modeDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', view).text(name);
			adhocView.toggle(value === 'ADHOC');
			infrastructureView.toggle(value === 'IF');
		});

		adhocSecurityDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', adhocView).text(name);
			adhocSecurityView.toggle(value !== 'OFF');
		});

		infrastructureModeDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', infrastructureView).text(name);
			staticView.toggle(value === 'STATIC');
			dynamicView.toggle(value === 'DYNAMIC');
		});

		staticSecurityDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', staticView).text(name);
			staticSecurityView.toggle(value !== 'OFF');
		});

		dynamicSecurityDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', dynamicView).text(name);
			dynamicSecurityView.toggle(value !== 'OFF');
		});

		modeDropdown.selectValue('OFF');
		adhocSecurityDropdown.selectValue('OFF');
		infrastructureModeDropdown.selectValue('OFF');
		staticSecurityDropdown.selectValue('OFF');
		dynamicSecurityDropdown.selectValue('OFF');

		webService.request('get_wlan', function(response) {
			var mode = $('mode:eq(0)', response).text(),
				adhoc = $('adhoc_mode', response),
				infrastructure = $('if_mode', response),
				infrastructureMode = $('mode:eq(0)', infrastructure).text();

			modeDropdown.selectValue(mode);
			infrastructureModeDropdown.selectValue(infrastructureMode);

			if (mode === 'ADHOC') {
				$('[id ~= ip ]', adhocView).val($('ip', adhoc).text());
				adhocSecurityDropdown.selectValue($('security mode', adhoc).text());
				$('[id ~= password ]', adhocView).val($('key', adhoc).text());
			} else if (mode === 'IF') {
				if (infrastructureMode === 'STATIC') {
					$('[id ~= ip ]', staticView).val($('ip', infrastructure).text());
					$('[id ~= subnet ]', staticView).val($('netmask', infrastructure).text());
					$('[id ~= gateway ]', staticView).val($('gateway', infrastructure).text());
					$('[id ~= broadcast ]', staticView).val($('broadcast', infrastructure).text());
					$('[id ~= ssid ]', staticView).val($('essid', infrastructure).text());
					staticSecurityDropdown.selectValue($('security mode', infrastructure).text());
					$('[id ~= password ]', staticSecurityView).val($('key', infrastructure).text());
				} else if (infrastructureMode === 'DYNAMIC') {
					$('[id ~= ip ]', dynamicView).val($('ip', infrastructure).text());
					$('[id ~= ssid ]', dynamicView).val($('essid', infrastructure).text());
					dynamicSecurityDropdown.selectValue($('security mode', infrastructure).text())
					$('[id ~= password ]', dyanmicSecurityView).val($('key', infrastructure).text());
				}
			}
		});

		$('[id ~= cancel-btn ]', view).click(function() {
			$(document.body).setClass('at-network-settings');
		});

		$('[id ~= save-btn ]', view).click(function() {
			// 	ethernetSettings.ip = $('[id ~= ip ]', staticView).val();
			// 	ethernetSettings.netmask = $('[id ~= subnet ]', staticView).val();
			// 	ethernetSettings.gateway = $('[id ~= gateway ]', staticView).val();
			// 	ethernetSettings.broadcast = $('[id ~= broadcast ]', staticView).val();
			var mode = modeDropdown.selectedValue(),
				infrastructureMode = infrastructureModeDropdown.selectedValue(),
				wirelessSettings = { 'mode' : mode };
		
			if (mode === 'ADHOC') {
				wirelessSettings.adhoc_mode = {
					'ip' : $('[id ~= ip ]', adhocView).val(),
					'security' : {
						'mode' : adhocSecurityDropdown.selectedValue(),
						'key' : $('[id ~= password ]', adhocSecurityView).val()
					}
				}
			} else if (mode === 'IF') {
				if (infrastructureMode === 'STATIC') {
					wirelessSettings.if_mode = {
						'mode' : infrastructureMode,
						'ip' : $('[id ~= ip ]', staticView).val(),
						'netmask' : $('[id ~= subnet ]', staticView).val(),
						'gateway' : $('[id ~= gateway ]', staticView).val(),
						'broadcast' : $('[id ~= broadcast ]', staticView).val(),
						'essid' : $('[id ~= ssid ]', staticView).val(),
						'security' : {
							'mode' : staticSecurityDropdown.selectedValue(),
							'key' : $('[id ~= password ]', staticSecurityView).val()
						}
					}
				} else if (infrastructureMode === 'DYNAMIC') {
					wirelessSettings.if_mode = {
						'mode' : infrastructureMode,
						'essid' : $('[id ~= ssid ]', dynamicView).val(),
						'security' : {
							'mode' : dynamicSecurityDropdown.selectedValue(),
							'key' : $('[id ~= password ]', dynamicSecurityView).val()
						}					
					}
				}
			}

			webService.request('set_wlan', wirelessSettings);
			$(document.body).setClass('at-network-settings');
		});

		$('[id ~= reset-btn ]', view).click(function() {
			webService.request('set_wlan_factory');
			$(document.body).setClass('at-network-settings');
		});
	}

	return self;
}



TVRO.page = TVRO.SettingsPage();