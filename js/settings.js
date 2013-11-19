TVRO.Settings = function() {
	var self = {},
		cookies = new TVRO.Cookies();

	self.init = function() {
		$('#technician-mode-button').click(function() {
			cookies.setCookie('technician-mode');
			updateButtons();
		});

		$('#user-mode-button').click(function() {
			cookies.removeCookie('technician-mode');
			updateButtons();
		});

		function updateButtons() {
			var technicianMode = cookies.getCookie('technician-mode');
			$('#technician-mode-button, #user-mode-button').removeClass('selected');
			if (technicianMode) $('#technician-mode-button').toggleClass('selected', true);
			else $('#user-mode-button').toggleClass('selected', true);
		}

		updateButtons();
	};

	return self;
};

$(document).ready(function() {
	window.tvro.settings = new TVRO.Settings();
	window.tvro.settings.init();
});