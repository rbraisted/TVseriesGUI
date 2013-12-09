"use strict";

TVRO.NetworkSettings = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#network-settings-btn').toggleClass('selected', true);

		webService.getWirelessSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				mode = xml.find('ipacu_response > mode').text();

			$('#wireless-mode').text(mode);

			if (mode == 'OFF') {
				$('#wireless-settings, #if-mode-settings, #adhoc-mode-settings').hide();
			} else {
				$('#wireless-settings').show();
				if (mode == 'IF') {
					var ifModeXml = xml.find('if_mode'),
						mode = ifModeXml.find('> mode').text(),
						ip = ifModeXml.find('ip').text(),
						subnet = ifModeXml.find('netmask').text(),
						gateway = ifModeXml.find('gateway').text(),
						broadcast = ifModeXml.find('broadcast').text(),
						ssid = ifModeXml.find('essid').text();
					$('#wireless-mode').text(mode);
					$('#if-mode-ip').text(ip);
					$('#if-mode-subnet').text(subnet);
					$('#if-mode-gateway').text(gateway);
					$('#if-mode-broadcast').text(broadcast);
					$('#if-mode-ssid').text(ssid);
					$('#adhoc-mode-settings').hide();
					$('#if-mode-settings').show();
				} else if (mode == 'ADHOC') {
					var adhocModeXml = xml.find('adhoc_mode'),
						ip = adhocModeXml.find('ip').text(),
						security = adhocModeXml.find('security > mode').text(),
						password = adhocModeXml.find('security > key').text();
					$('#adhoc-mode-ip').text(ip);
					$('#adhoc-mode-security').text(security);
					$('#adhoc-mode-password').text(password);
					$('#if-mode-settings').hide();
					$('#adhoc-mode-settings').show();
				}
			}
		});

		webService.getEthernetSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				mode = xml.find('mode').text(),
				ip = xml.find('ip').text(),
				subnet = xml.find('netmask').text(),
				gateway = xml.find('gateway').text(),
				broadcast = xml.find('broadcast').text();
			$('#ethernet-mode').text(mode);
			$('#ethernet-ip').text(ip);
			$('#ethernet-subnet').text(subnet);
			$('#ethernet-gateway').text(gateway);
			$('#ethernet-broadcast').text(broadcast);
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.NetworkSettings();