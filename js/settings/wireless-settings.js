"use strict";

TVRO.WirelessSettings = function() {
	var self = {},
		webService = new TVRO.WebService(),
		mode = 'OFF',	//	OFF, ADHOC, IF
		ifMode = 'STATIC',	//	STATIC, DYNAMIC
		adhocSecurityMode = 'OFF', //	OFF, WEP
		staticSecurityMode = 'OFF', //	OFF, WPA_PSK
		dynamicSecurityMode = 'OFF'; //	OFF, WPA_PSK

	self.init = function() {
		$('#network-settings-btn').toggleClass('selected', true);

		TVRO.Dropdown('mode-dropdown', 'mode-btn', function(optionText, optionValue) {
			mode = optionValue;
			$('#adhoc-mode').toggle(mode === 'ADHOC');
			$('#if-mode').toggle(mode === 'IF');
			$('#mode-btn').text(optionText);
		});

		TVRO.Dropdown('adhoc-security-dropdown', 'adhoc-security-btn', function(optionText, optionValue) {
			adhocSecurityMode = optionValue;
			$('#adhoc-security').toggle(adhocSecurityMode === 'WEP');
			$('#adhoc-security-btn').text(optionText);
		});

		TVRO.Dropdown('if-mode-dropdown', 'if-mode-btn', function(optionText, optionValue) {
			ifMode = optionValue;
			$('#static-mode').toggle(ifMode === 'STATIC');
			$('#dynamic-mode').toggle(ifMode === 'DYNAMIC');
			$('#if-mode-btn').text(optionText);
		});

		TVRO.Dropdown('static-security-dropdown', 'static-security-btn', function(optionText, optionValue) {
			staticSecurityMode = optionValue;
			$('#static-security').toggle(staticSecurityMode === 'WPA_PSK');
			$('#static-security-btn').text(optionText);
		});

		TVRO.Dropdown('dynamic-security-dropdown', 'dynamic-security-btn', function(optionText, optionValue) {
			dynamicSecurityMode = optionValue;
			$('#dynamic-security').toggle(dynamicSecurityMode === 'WPA_PSK');
			$('#dynamic-security-btn').text(optionText);
		});

		$('#save-btn').click(self.save);
		$('#cancel-btn').click(self.cancel);
		$('#reset-btn').click(self.reset);

		webService.request('get_wlan', function(response) {
			mode = response.find('ipacu_response > mode').text();
			$('#mode-dropdown .dropdown-option[value='+mode+']').click();
			if (mode === 'ADHOC') {
				adhocSecurityMode = response.find('adhoc_mode > security > mode').text();
				$('#adhoc-security-dropdown .dropdown-option[value='+adhocSecurityMode+']').click();
				$('#adhoc-password').val(response.find('adhoc_mode > security > key').text());
				$('#adhoc-ip').text(response.find('adhoc_mode > ip').text());
			} else if (mode === 'IF') {
				ifMode = response.find('if_mode > mode').text();
				$('#if-mode-dropdown .dropdown-option[value='+ifMode+']').click();
				if (ifMode === 'STATIC') {
					staticSecurityMode = response.find('if_mode > security > mode').text();
					$('#static-security-dropdown .dropdown-option[value='+staticSecurityMode+']').click();
					$('#static-password').val(response.find('if_mode > security > key').text());
					$('#static-ssid').val(response.find('if_mode > essid').text());
					var ip = response.find('if_mode > ip').text().split('.'),
						subnet = response.find('if_mode > netmask').text().split('.'),
						gateway = response.find('if_mode > gateway').text().split('.'),
						broadcast = response.find('if_mode > broadcast').text().split('.');
					for (var i = 0; i < 4; i++) {
						$('#static-ip input:eq('+i+')').val(ip[i]);
						$('#static-subnet input:eq('+i+')').val(subnet[i]);
						$('#static-gateway input:eq('+i+')').val(gateway[i]);
						$('#static-broadcast input:eq('+i+')').val(broadcast[i]);
					}
				} else if (ifMode === 'DYNAMIC') {
					dynamicSecurityMode = response.find('if_mode > security > mode').text();
					$('#dynamic-security-dropdown .dropdown-option[value='+dynamicSecurityMode+']').click();
					$('#dynamic-password').val(response.find('if_mode > security > key').text());
					$('#dynamic-ssid').val(response.find('if_mode > essid').text());
				}
			}
		});
	};

	self.save = function() {
		//	TODO:
		//	validation, password validation, etc

		//	also note that this whole block is really ugly but
		//	i'm not sure what to do about it

		var wirelessSettings = {
			'mode' : mode
		};
		
		if (mode === 'ADHOC') {
			wirelessSettings.adhoc_mode = {
				'security' : {
					'mode' : adhocSecurityMode,
					'key' : (adhocSecurityMode !== 'OFF' ? $('#adhoc-security-password').val() : '')
				}
			}
		} else if (mode === 'IF') {
			if (ifMode === 'STATIC') {
				wirelessSettings.if_mode = {
					'mode' : ifMode,
					'ip' : $('#static-ip input').map(function() { return this.value; }).get().join('.'),
					'netmask' : $('#static-subnet input').map(function() { return this.value; }).get().join('.'),
					'gateway' : $('#static-gateway input').map(function() { return this.value; }).get().join('.'),
					'broadcast' : $('#static-broadcast input').map(function() { return this.value; }).get().join('.'),
					'essid' : $('#static-ssid').val(),
					'security' : {
						'mode' : staticSecurityMode,
						'key' : (staticSecurityMode !== 'OFF' ? $('#static-password').val() : '')
					}
				}
			} else if (ifMode === 'DYNAMIC') {
				wirelessSettings.if_mode = {
					'mode' : ifMode,
					'essid' : $('#dynamic-ssid').val(),
					'security' : {
						'mode' : dynamicSecurityMode,
						'key' : (dynamicSecurityMode !== 'OFF' ? $('#dynamic-password').val() : '')
					}					
				}
			}
		}

		webService.request('set_wlan', wirelessSettings, function(response) {
			window.location = '/settings/network-settings.php';
		});
	};

	self.cancel = function() {
		window.location = '/settings/network-settings.php';
	};

	self.reset = function() {
		webService.request('set_wlan_factory', function(response) {
			window.location = '/settings/network-settings.php';
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.WirelessSettings();