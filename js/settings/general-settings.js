TVRO.GeneralSettings = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#general-settings-btn').toggleClass('selected', true);
		
		$('#technician-mode-btn').click(function() {
			if (cookieManager.hasCookie('technician-mode')) cookieManager.removeCookie('technician-mode');
			else cookieManager.setCookie('technician-mode');
			$('#technician-mode-btn').toggleClass('on', cookieManager.hasCookie('technician-mode'));
		}).toggleClass('on', cookieManager.hasCookie('technician-mode'));

		$('#demo-mode-btn').click(function() {
			if (cookieManager.hasCookie('demo-mode')) cookieManager.removeCookie('demo-mode');
			else cookieManager.setCookie('demo-mode');
			$('#demo-mode-btn').toggleClass('on', cookieManager.hasCookie('demo-mode'));
		}).toggleClass('on', cookieManager.hasCookie('demo-mode'));
	};

	return self;
};

$(document).ready(function() {
	window.tvro.settingsPage.generalSettings = new TVRO.GeneralSettings();
	window.tvro.settingsPage.generalSettings.init();
});