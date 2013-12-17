"use strict";

TVRO.AdvancedSettings = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#advanced-settings-btn').toggleClass('selected', true);

		webService.request('get_antenna_config', function(response) {
			$('#sleep-mode-btn').toggleClass('on', response.find('sleep').text() === 'ON');
			$('#sidelobe-mode-btn').toggleClass('on', response.find('sidelobe').text() === 'ON');
		});

		$('#sleep-mode-btn, #sidelobe-mode-btn').click(function() {
			$(this).toggleClass('on');

			var sleepMode = $('#sleep-mode-btn').hasClass('on') ? 'ON' : 'OFF',
				sidelobeMode = $('#sidelobe-mode-btn').hasClass('on') ? 'ON' : 'OFF';

			webService.request('get_antenna_config', {
				'sleep' : sleepMode,
				'sidelobe' : sidelobeMode
			}, function(responseXml) {
				
			});
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.AdvancedSettings();