"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SettingsPage = function() {
	var self = {};

	self.init = function() {
		var menuView = $('[id ~= menu-view ]'),
			menuBtns = $('[id ~= menu-btn ]', menuView),
			backBtns = $('[id ~= back-btn ]'),
			generalSettingsView = TVRO.GeneralSettingsView(),
			advancedSettingsView = TVRO.AdvancedSettingsView(),
			networkSettingsView = TVRO.NetworkSettingsView();

		generalSettingsView.init();
		advancedSettingsView.init();
		networkSettingsView.init();

		menuBtns.click(function() {
			var menuBtn = $(this);

			if (menuBtn.hasClass('is-selected')) return;

			menuBtns.removeClass('is-selected');
			menuBtn.addClass('is-selected');

			if (menuBtn.hasId('general-settings-btn')) {
				$(document.body).setClass('at-general-settings');
				generalSettingsView.refresh();
			} else if (menuBtn.hasId('advanced-settings-btn')) {
				$(document.body).setClass('at-advanced-settings');
				advancedSettingsView.refresh();
			} else if (menuBtn.hasId('network-settings-btn')) {
				$(document.body).setClass('at-network-settings');
				networkSettingsView.refresh();
			}
		});

		backBtns.click(function() {
			$(document.body).setClass('at-menu');
			menuBtns.removeClass('is-selected');
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.GeneralSettingsView = function() {
	var self = {},
		view = $('[id ~= general-settings-view ]'),
		demoModeBtn = $('[id ~= demo-mode-btn ]', view),
		technicianModeBtn = $('[id ~= technician-mode-btn ]', view),
		cookieManager = TVRO.CookieManager();
		
	self.init = function() {		
		demoModeBtn.click(function() {
			if (!cookieManager.removeCookie(TVRO.DEMO_MODE)) cookieManager.setCookie(TVRO.DEMO_MODE);
			demoModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.DEMO_MODE));
		});

		technicianModeBtn.click(function() {
			if (!cookieManager.removeCookie(TVRO.TECH_MODE)) cookieManager.setCookie(TVRO.TECH_MODE);
			technicianModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.TECH_MODE));
		});
	}

	self.refresh = function() {
		demoModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.DEMO_MODE));
		technicianModeBtn.toggleClass('is-on', cookieManager.hasCookie(TVRO.TECH_MODE));
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.AdvancedSettingsView = function(page) {
	var self = {},
		view = $('[id ~= advanced-settings-view ]'),
		sleepModeBtn = $('[id ~= sleep-mode-btn ]', view),
		sidelobeModeBtn = $('[id ~= sidelobe-mode-btn ]', view),
		webService = TVRO.WebService();

	self.init = function() {
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

	self.refresh = function() {
		webService.request('get_antenna_config', function(response) {
			sleepModeBtn.toggleClass('is-on', $('sleep', response).text() === 'ON');
			sidelobeModeBtn.toggleClass('is-on', $('sidelobe', response).text() === 'ON');
		});		
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.NetworkSettingsView = function() {
	var self = {},
		view = $('[id ~= network-settings-view ]'),
		ethernetSettingsView = $('[id ~= ethernet-settings-view ]', view),
		wirelessSettingsView = $('[id ~= wireless-settings-view ]', view),
		editEthernetSettingsView = TVRO.EditEthernetSettingsView(),
		editWirelessSettingsView = TVRO.EditWirelessSettingsView(),
		webService = TVRO.WebService();

	self.init = function() {
		editEthernetSettingsView.init();
		editWirelessSettingsView.init();

		$('[id ~= edit-btn ]', ethernetSettingsView).click(function() {
			$(document.body).setClass('at-edit-ethernet-settings');
			editEthernetSettingsView.refresh();
		});

		$('[id ~= edit-btn ]', wirelessSettingsView).click(function() {
			$(document.body).setClass('at-edit-wireless-settings');
			editWirelessSettingsView.refresh();
		});
	}

	self.refresh = function() {
		webService.request('get_eth', function(response) {
			var mode = $('mode:eq(0)', response).text(),
				staticView = $('[id ~= static-view ]', ethernetSettingsView);

			wirelessSettingsView.toggle(mode !== 'OFF');
			staticView.toggle(mode === 'STATIC');
			$('[id ~= mode ]', ethernetSettingsView).text(mode);

			if (mode === 'STATIC') {
				$('[id ~= ip ]', staticView).text($('ip', response).text());
				$('[id ~= subnet ]', staticView).text($('netmask', response).text());
				$('[id ~= gateway ]', staticView).text($('gateway', response).text());
				$('[id ~= broadcast ]', staticView).text($('broadcast', response).text());
			}
		});

		webService.request('get_wlan', function(response) {
			var mode = $('mode:eq(0)', response).text(),
				adhoc = $('adhoc_mode', response),
				adhocView = $('[id ~= adhoc-view ]', wirelessSettingsView),
				adhocSecurityMode = $('security mode', adhoc).text(),
				adhocSecurityView = $('[id ~= security-view ]', adhocView),
				infrastructure = $('if_mode', response),
				infrastructureMode = $('mode:eq(0)', infrastructure).text(),
				infrastructureView = $('[id ~= infrastructure-view ]', wirelessSettingsView),
				staticView = $('[id ~= static-view ]', infrastructureView),
				staticSecurityMode = $('security mode', infrastructure).text(),
				staticSecurityView = $('[id ~= security-view ]', staticView),
				dynamicView = $('[id ~= dynamic-view ]', infrastructureView),
				dynamicSecurityMode = $('security mode', infrastructure).text(),
				dynamicSecurityView = $('[id ~= security-view ]', dynamicView);

			adhocView.toggle(mode === 'ADHOC');
			adhocSecurityView.toggle(adhocSecurityMode !== 'OFF');
			infrastructureView.toggle(mode === 'IF');
			staticView.toggle(infrastructureMode === 'STATIC');
			staticSecurityView.toggle(staticSecurityMode !== 'OFF');
			dynamicView.toggle(infrastructureMode === 'DYNAMIC');
			dynamicSecurityView.toggle(dynamicSecurityMode !== 'OFF');
			$('[id ~= mode ]', wirelessSettingsView).text(mode);

			if (mode === 'ADHOC') {
				$('[id ~= ip ]', adhocView).text($('ip', adhocMode).text());
				$('[id ~= security ]', adhocView).text($('security mode', adhocMode).text());
				$('[id ~= password ]', adhocView).text($('security key', adhocMode).text());
			} else if (mode === 'IF') {
				$('[id ~= mode ]', infrastructureView).text($('mode:eq(0)', infrastructure).text());
				if (infrastructureMode === 'STATIC') {
					$('[id ~= ip ]', staticView).text($('ip', infrastructure).text());
					$('[id ~= subnet ]', staticView).text($('netmask', infrastructure).text());
					$('[id ~= gateway ]', staticView).text($('gateway', infrastructure).text());
					$('[id ~= broadcast ]', staticView).text($('broadcast', infrastructure).text());
					$('[id ~= ssid ]', staticView).text($('essid', infrastructure).text());
					$('[id ~= security ]', staticView).text(staticSecurityMode);
					$('[id ~= password ]', staticSecurityView).text($('security key', infrastructure).text());
				} else if (infrastructureMode === 'DYNAMIC') {
					$('[id ~= security ]', staticView).text(staticSecurityMode);
					$('[id ~= password ]', staticSecurityView).text($('security key', infrastructure).text());
				}
			} 
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.EditEthernetSettingsView = function() {
	var self = {},
		view = $('[id ~= edit-ethernet-settings-view ]'),
		staticView = $('[id ~= static-view ]', view),
		modeDropdown = TVRO.Dropdown('[id ~= ethernet-mode-dropdown', $('[id ~= mode-btn ]', view)),
		webService = TVRO.WebService();

	self.init = function() {
		modeDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', view).text(name);
			staticView.toggle(value === 'STATIC');
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

	self.refresh = function() {
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
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.EditWirelessSettingsView = function() {
	var self = {},
		view = $('[id ~= edit-wireless-settings-view ]'),
		modeDropdown = TVRO.Dropdown('[id ~= wireless-mode-dropdown ]', $('[id ~= mode-btn ]:eq(0)', view)),
		adhocView = $('[id ~= adhoc-view ]', view),
		adhocSecurityView = $('[id ~= security-view ]', adhocView),
		adhocSecurityDropdown = TVRO.Dropdown('[id ~= adhoc-security-dropdown ]', $('[id ~= security-btn ]', adhocView)),
		infrastructureView = $('[id ~= infrastructure-view ]', view),
		infrastructureModeDropdown = TVRO.Dropdown('[id ~= infrastructure-mode-dropdown ]', $('[id ~= mode-btn ]:eq(0)', infrastructureView)),
		staticView = $('[id ~= static-view ]', infrastructureView),
		staticSecurityView = $('[id ~= security-view ]', staticView),
		staticSecurityDropdown = TVRO.Dropdown('[id ~= static-security-dropdown ]', $('[id ~= security-btn ]', staticView)),
		dynamicView = $('[id ~= dynamic-view ]', infrastructureView),
		dynamicSecurityView = $('[id ~= security-view ]', dynamicView),
		dynamicSecurityDropdown = TVRO.Dropdown('[id ~= dynamic-security-dropdown ]', $('[id ~= security-btn ]', dynamicView)),
		webService = TVRO.WebService();

	self.init = function() {
		modeDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]:eq(0)', view).text(name);
			adhocView.toggle(value === 'ADHOC');
			infrastructureView.toggle(value === 'IF');
		});

		adhocSecurityDropdown.optionSelected(function(name, value) {
			$('[id ~= security ]', adhocView).text(name);
			adhocSecurityView.toggle(value !== 'OFF');
		});

		infrastructureModeDropdown.optionSelected(function(name, value) {
			$('[id ~= mode ]', infrastructureView).text(name);
			staticView.toggle(value === 'STATIC');
			dynamicView.toggle(value === 'DYNAMIC');
		});

		staticSecurityDropdown.optionSelected(function(name, value) {
			$('[id ~= security ]', staticView).text(name);
			staticSecurityView.toggle(value !== 'OFF');
		});

		dynamicSecurityDropdown.optionSelected(function(name, value) {
			$('[id ~= security ]', dynamicView).text(name);
			dynamicSecurityView.toggle(value !== 'OFF');
		});

		modeDropdown.selectValue('OFF');
		adhocSecurityDropdown.selectValue('OFF');
		infrastructureModeDropdown.selectValue('OFF');
		staticSecurityDropdown.selectValue('OFF');
		dynamicSecurityDropdown.selectValue('OFF');

		$('[id ~= cancel-btn ]', view).click(function() {
			$(document.body).setClass('at-network-settings');
		});

		$('[id ~= save-btn ]', view).click(function() {
			var mode = modeDropdown.selectedValue(),
				infrastructureMode = infrastructureModeDropdown.selectedValue(),
				settings = { 'mode' : mode };
		
			if (mode === 'ADHOC') {
				settings.adhoc_mode = {
					'ip' : $('[id ~= ip ]', adhocView).val(),
					'security' : {
						'mode' : adhocSecurityDropdown.selectedValue(),
						'key' : $('[id ~= password ]', adhocSecurityView).val()
					}
				}
			} else if (mode === 'IF') {
				if (infrastructureMode === 'STATIC') {
					settings.if_mode = {
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
					settings.if_mode = {
						'mode' : infrastructureMode,
						'essid' : $('[id ~= ssid ]', dynamicView).val(),
						'security' : {
							'mode' : dynamicSecurityDropdown.selectedValue(),
							'key' : $('[id ~= password ]', dynamicSecurityView).val()
						}					
					}
				}
			}

			webService.request('set_wlan', settings);
			$(document.body).setClass('at-network-settings');
		});

		$('[id ~= reset-btn ]', view).click(function() {
			webService.request('set_wlan_factory');
			$(document.body).setClass('at-network-settings');
		});
	}

	self.refresh = function() {
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
					$('[id ~= password ]', staticSecurityView).val($('security key', infrastructure).text());
				} else if (infrastructureMode === 'DYNAMIC') {
					$('[id ~= ip ]', dynamicView).val($('ip', infrastructure).text());
					$('[id ~= ssid ]', dynamicView).val($('essid', infrastructure).text());
					dynamicSecurityDropdown.selectValue($('security mode', infrastructure).text())
					$('[id ~= password ]', dyanmicSecurityView).val($('security key', infrastructure).text());
				}
			}
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SettingsPage();