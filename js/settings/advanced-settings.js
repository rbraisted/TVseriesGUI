"use strict";

TVRO.AdvancedSettings = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#advanced-settings-btn').toggleClass('selected', true);

		webService.getAntennaConfig(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				sleepMode = xml.find('sleep').text() == 'ON',
				sidelobeMode = xml.find('sidelobe').text() == 'ON';
			$('#sleep-mode-btn').toggleClass('on', sleepMode);
			$('#sidelobe-mode-btn').toggleClass('on', sidelobeMode);
		});

		$('#sleep-mode-btn, #sidelobe-mode-btn').click(function() {
			$(this).toggleClass('on');

			var sleepMode = $('#sleep-mode-btn').hasClass('on') ? 'ON' : 'OFF',
				sidelobeMode = $('#sidelobe-mode-btn').hasClass('on') ? 'ON' : 'OFF';

			webService.setAntennaConfig({
				'sleep' : sleepMode,
				'sidelobe' : sidelobeMode
			}, function(responseXml) {
				var xml = $(responseXml),
					error = xml.find('message').attr('error');
			});
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.AdvancedSettings();