"use strict";

TVRO.NetworkSettings = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#network-settings-btn').toggleClass('selected', true);

		webService.request('get_wlan', function(response) {
			var mode = response.find('ipacu_response > mode').text();
			$('#wireless-mode').text(mode);
			$('#if-mode').toggle(mode === 'IF');
			$('#adhoc-mode').toggle(mode === 'ADHOC');
			if (mode === 'IF') {
				$('#wireless-mode').text(response.find('if_mode > mode').text());
				$('#if-ip').text(response.find('if_mode > ip').text());
				$('#if-subnet').text(response.find('if_mode > netmask').text());
				$('#if-gateway').text(response.find('if_mode > gateway').text());
				$('#if-broadcast').text(response.find('if_mode > broadcast').text());
				$('#if-ssid').text(response.find('if_mode > essid').text());
			} else if (mode === 'ADHOC') {
				$('#adhoc-ip').text(response.find('adhoc_mode > ip').text());
				$('#adhoc-security').text(response.find('adhoc_mode > security > mode').text());
				$('#adhoc-password').text(response.find('adhoc_mode > security > key').text());
			}
		});

		webService.request('get_eth', function(response) {
			var mode = response.find('mode').text();
			$('#ethernet-mode').text(mode);
			$('#ethernet-ip').text(response.find('ip').text());
			$('#ethernet-subnet').text(response.find('netmask').text());
			$('#ethernet-gateway').text(response.find('gateway').text());
			$('#ethernet-broadcast').text(response.find('broadcast').text());
			$('#wireless-settings').toggle(mode !== 'OFF');
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.NetworkSettings();