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

		$('#save-btn').click(function() {
			self.save();
		});

		$('#cancel-btn').click(function() {
			self.cancel();
		});

		$('#reset-btn').click(function() {
			self.reset();
		});	

		webService.getWirelessSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');
			mode = xml.find('ipacu_response > mode').text();
			$('#mode-dropdown .dropdown-option[value='+mode+']').click();
			if (mode === 'ADHOC') {
				adhocSecurityMode = xml.find('adhoc_mode > security > mode').text();
				$('#adhoc-security-dropdown .dropdown-option[value='+adhocSecurityMode+']').click();
				$('#adhoc-password').val(xml.find('adhoc_mode > security > key').text());
				$('#adhoc-ip').text(xml.find('adhoc_mode > ip').text());
			} else if (mode === 'IF') {
				ifMode = xml.find('if_mode > mode').text();
				$('#if-mode-dropdown .dropdown-option[value='+ifMode+']').click();
				if (ifMode === 'STATIC') {
					staticSecurityMode = xml.find('if_mode > security > mode').text();
					$('#static-security-dropdown .dropdown-option[value='+staticSecurityMode+']').click();
					$('#static-password').val(xml.find('if_mode > security > key').text());
					$('#static-ssid').val(xml.find('if_mode > essid').text());

					var ip = xml.find('if_mode > ip').text().split('.'),
						subnet = xml.find('if_mode > netmask').text().split('.'),
						gateway = xml.find('if_mode > gateway').text().split('.'),
						broadcast = xml.find('if_mode > broadcast').text().split('.'),
						arrays = [ip, subnet, gateway, broadcast],
						types = ['ip', 'subnet', 'gateway', 'broadcast'];

					for (var i = 0; i < arrays.length; i++) {
						var array = arrays[i], type = types[i];
						for (var k = 0; k < array.length; k++) {
							$('#static-'+type+' input:eq('+k+')').val(array[k]);
						}
					}
				} else if (ifMode === 'DYNAMIC') {
					dynamicSecurityMode = xml.find('if_mode > security > mode').text();
					$('#dynamic-security-dropdown .dropdown-option[value='+dynamicSecurityMode+']').click();
					$('#dynamic-password').val(xml.find('if_mode > security > key').text());
					$('#dynamic-ssid').val(xml.find('if_mode > essid').text());
				}
			}
		});
	};

	self.save = function() {
		//	TODO:
		//	validation, password validation, etc

		var wirelessSettings = {
			'mode' : mode
		};
		
		if (mode === 'ADHOC') {
			wirelessSettings.adhoc_mode = {
				security : {
					mode : adhocSecurityMode,
					key : (adhocSecurityMode ? $('#adhoc-security-password').val() : '')
				}
			}
		} else if (mode === 'IF') {
			if (ifMode === 'STATIC') {
				wirelessSettings.if_mode = {
					mode : ifMode,
					ip : $('#static-ip input').map(function() { return this.value; }).join('.'),
					netmask : $('#subnet-ip input').map(function() { return this.value; }).join('.'),
					gateway : $('#gateway-ip input').map(function() { return this.value; }).join('.'),
					broadcast : $('#broadcast-ip input').map(function() { return this.value; }).join('.'),
					essid : $('#static-ssid').val(),
					security : {
						mode : staticSecurityMode,
						key : (staticSecurityMode ? $('#static-password').val() : '')
					}
				}
			} else if (ifMode === 'DYNAMIC') {
				wirelessSettings.if_mode = {
					mode : ifMode,
					essid : $('#dynamic-ssid').val(),
					security : {
						mode : dynamicSecurityMode,
						key : (dynamicSecurityMode ? $('#dynamic-password').val() : '')
					}					
				}
			}
		}

		webService.setWirelessSettings(wirelessSettings, function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');
			window.location = '/settings/network-settings.php';
		});
	};

	self.cancel = function() {
		window.location = '/settings/network-settings.php';
	};

	self.reset = function() {
		webService.resetWirelessSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');
			window.location = '/settings/network-settings.php';
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.WirelessSettings();