"use strict";



TVRO.SettingsPage = function() {
	var self = {};

	self.init = function() {
		var page = $('[id ~= page ]'),
			menu = $('[id ~= menu ]', page),
			menuBtns = $('[id ~= menu-btn ]', menu),
			backBtns = $('[id ~= back-btn ]', page),
			generalSettingsView = new TVRO.GeneralSettingsView(),
			networkSettingsView = new TVRO.NetworkSettingsView(),
			advancedSettingsView = new TVRO.AdvancedSettingsView(),
			activeView;

		generalSettingsView.init();
		networkSettingsView.init();
		advancedSettingsView.init();

		menuBtns.click(function() {
			var menuBtn = $(this);

			if (menuBtn.hasClass('is-selected')) return;

			menuBtns.removeClass('is-selected');
			menuBtn.addClass('is-selected');
			menu.removeClass('is-active');

			if (activeView) activeView.hide();

			if (menuBtn.hasId('general-settings-btn')) activeView = generalSettingsView;
			else if (menuBtn.hasId('network-settings-btn')) activeView = networkSettingsView;
			else if (menuBtn.hasId('advanced-settings-btn')) activeView = advancedSettingsView;

			activeView.show();
		});

		backBtns.click(function() {
			if (activeView) activeView.hide();
			activeView = undefined;
			menuBtns.removeClass('is-selected');
			menu.addClass('is-active');
		});

		// $('[id ~= network-settings-btn ]', menu).click();
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
		ethernetSettingsView,
		wirelessSettingsView,
		webService = new TVRO.WebService();

	self.init = function() {
		view = $('[id ~= network-settings-view ]', page);
		ethernetSettingsView = new TVRO.EthernetSettingsView(view);
		wirelessSettingsView = new TVRO.WirelessSettingsView(view);

		ethernetSettingsView.init();
		wirelessSettingsView.init();
	}

	self.show = function() {
		ethernetSettingsView.show();
		webService.request('get_eth', function(response) {
			if ($('mode', response).text() === 'OFF') wirelessSettingsView.hide();
			else wirelessSettingsView.show();
		});
		view.addClass('is-active');
	}

	self.hide = function() {
		view.removeClass('is-active');
	}

	return self;
}



TVRO.EthernetSettingsView = function(view) {
	var self = {},
		editingView,
		webService = new TVRO.WebService();

	self.init = function() {
		view = $('[id ~= ethernet-settings-view ]', view);
		editingView = $('[id ~= edit-ethernet-settings-view ]', view);

		var editBtn = $('[id ~= edit-btn ]', view),
			saveBtn = $('[id ~= save-btn ]', view),
			cancelBtn = $('[id ~= cancel-btn ]', view),
			resetBtn = $('[id ~= reset-btn ]', view);

		editBtn.click(function() {
			editingView.addClass('is-active');
		});

		cancelBtn.click(function() {
			self.show();
		});

		saveBtn.click(function() {
			webService.request('set_eth', {

			}, function(response) {
				self.show();
			});
		});

		resetBtn.click(function() {
			webService.request('set_eth_factory', function(response) {
				self.show();
			});
		});
	}

	self.show = function() {
		webService.request('get_eth', function(response) {
			$('[id ~= mode ]', view).text($('mode', response).text());
			$('[id ~= ip ]', view).text($('ip', response).text());
			$('[id ~= subnet ]', view).text($('netmask', response).text());
			$('[id ~= gateway ]', view).text($('gateway', response).text());
			$('[id ~= broadcast ]', view).text($('broadcast', response).text());
		});
		editingView.removeClass('is-active');
		view.addClass('is-active');

		// $('[id ~= edit-btn ]', view).click();
	}

	self.hide = function() {
		view.removeClass('is-active');
	}

	return self;
}



TVRO.WirelessSettingsView = function(view) {
	var self = {},
		adhocView,
		infrastructureView,
		editingView,
		editingAdhocView,
		editingInfrastructureView,		
		webService = new TVRO.WebService();

	self.init = function() {
		view = $('[id ~= wireless-settings-view ]', view);
		adhocView = $('[id ~= adhoc-view ]', view);
		infrastructureView = $('[id ~= infrastructure-view ]', view);

		editingView = $('[id ~= edit-wireless-settings-view ]', view);
		editingAdhocView = $('[id ~= adhoc-view ]', editingView);
		editingInfrastructureView = $('[id ~= infrastructure-view ]', editingView);
	}

	self.show = function() {
		webService.request('get_wlan', function(response) {
			var mode = $('ipacu_response > mode', response).text(),
				adhocMode = $('adhoc_mode', response),
				infrastructureMode = $('if_mode', response);

			$('[id ~= mode ]', view).text(mode);
			$('[id ~= adhoc-view ]', view).toggle(mode === 'ADHOC');
			$('[id ~= infrastructure-view ]', view).toggle(mode === 'IF');

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
		view.addClass('is-active');
	}

	self.hide = function() {
		view.removeClass('is-active');
	}

	return self;
}



// TVRO.EthernetSettingsPopup = function(view) {
// 	var self = {},
// 		popup,
// 		webService = new TVRO.WebService();

// 	return self;
// }




// TVRO.WirelessSettingsPopup = function(view) {
// 	var self = {},
// 		popup,
// 		webService = new TVRO.WebService();

// 	self.init = function() {

// 	}

// 	self.show = function() {
// 		view.addClass('is-active');
// 	}

// 	self.hide = function() {
// 		view.removeClass('is-active');
// 	}

// 	return self;
// }



TVRO.page = new TVRO.SettingsPage();