TVRO.SettingsPage = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#technician-mode-btn').click(function() {
			var technicianMode = Boolean(cookieManager.getCookie('technician-mode'));
			if (technicianMode) cookieManager.removeCookie('technician-mode');
			else cookieManager.setCookie('technician-mode');
			$('#technician-mode-btn').toggleClass('on', !technicianMode);
		}).toggleClass('on', Boolean(cookieManager.getCookie('technician-mode')));

		$('#demo-mode-btn').click(function() {
			var demoMode = Boolean(cookieManager.getCookie('demo-mode'));
			if (demoMode) cookieManager.removeCookie('demo-mode');
			else cookieManager.setCookie('demo-mode');
			$('#demo-mode-btn').toggleClass('on', !demoMode);
		}).toggleClass('on', Boolean(cookieManager.getCookie('demo-mode')));
	};

	return self;
};

$(document).ready(function() {
	window.tvro.settingsPage = new TVRO.SettingsPage();
	window.tvro.settingsPage.init();
});