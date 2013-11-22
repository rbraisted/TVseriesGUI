TVRO.Settings = function() {
	var self = {},
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#technician-mode-button').click(function() {
			cookieManager.setCookie('technician-mode');
			updateButtons();
		});

		$('#user-mode-button').click(function() {
			cookieManager.removeCookie('technician-mode');
			updateButtons();
		});

		function updateButtons() {
			console.log('updateButtons');
			var technicianMode = Boolean(cookieManager.getCookie('technician-mode'));
			$('#technician-mode-button').toggleClass('selected', technicianMode);
			$('#user-mode-button').toggleClass('selected', !technicianMode);
		}

		updateButtons();
	};

	return self;
};

$(document).ready(function() {
	window.tvro.settings = new TVRO.Settings();
	window.tvro.settings.init();
});