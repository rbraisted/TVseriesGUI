TVRO.SettingsPage = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#settings-btn').toggleClass('selected', true);
	};

	return self;
};

$(document).ready(function() {
	window.tvro.settingsPage = new TVRO.SettingsPage();
	window.tvro.settingsPage.init();
});