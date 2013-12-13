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
			$('#if-mode').toggle(mode === 'IF');
			$('#adhoc-mode').toggle(mode === 'ADHOC');

			if (mode === 'IF') {
				$('#wireless-mode').text(xml.find('if_mode > mode').text());
				$('#if-ip').text(xml.find('if_mode > ip').text());
				$('#if-subnet').text(xml.find('if_mode > netmask').text());
				$('#if-gateway').text(xml.find('if_mode > gateway').text());
				$('#if-broadcast').text(xml.find('if_mode > broadcast').text());
				$('#if-ssid').text(xml.find('if_mode > essid').text());
			} else if (mode === 'ADHOC') {
				$('#adhoc-ip').text(xml.find('adhoc_mode > ip').text());
				$('#adhoc-security').text(xml.find('adhoc_mode > security > mode').text());
				$('#adhoc-password').text(xml.find('adhoc_mode > security > key').text());
			}
		});

		webService.getEthernetSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				mode = xml.find('mode').text();
			$('#ethernet-mode').text(mode);
			$('#ethernet-ip').text(xml.find('ip').text());
			$('#ethernet-subnet').text(xml.find('netmask').text());
			$('#ethernet-gateway').text(xml.find('gateway').text());
			$('#ethernet-broadcast').text(xml.find('broadcast').text());
			$('#wireless-settings').toggle(mode !== 'OFF');
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.NetworkSettings();