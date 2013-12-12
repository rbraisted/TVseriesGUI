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
			$('#adhoc-settings').toggle(mode === 'ADHOC');
			$('#if-settings').toggle(mode === 'IF');
			$('#mode-btn').text(optionText);
		});

		TVRO.Dropdown('adhoc-security-dropdown', 'adhoc-security-btn', function(optionText, optionValue) {
			adhocSecurityMode = optionValue;
			$('#adhoc-password-setting').toggle(adhocSecurityMode === 'WEP');
			$('#adhoc-security-btn').text(optionText);
		});

		TVRO.Dropdown('if-mode-dropdown', 'if-mode-btn', function(optionText, optionValue) {
			ifMode = optionValue;
			$('#static-settings').toggle(ifMode === 'STATIC');
			$('#dynamic-settings').toggle(ifMode === 'DYNAMIC');
			$('#if-mode-btn').text(optionText);
		});

		TVRO.Dropdown('static-security-dropdown', 'static-security-btn', function(optionText, optionValue) {
			staticSecurityMode = optionValue;
			$('#static-password-setting').toggle(staticSecurityMode === 'WPA_PSK');
			$('#static-security-btn').text(optionText);
		});

		TVRO.Dropdown('dynamic-security-dropdown', 'dynamic-security-btn', function(optionText, optionValue) {
			dynamicSecurityMode = optionValue;
			$('#dynamic-password-setting').toggle(dynamicSecurityMode === 'WPA_PSK');
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

		//	this block is too big and unreadable,
		//	break it down into smaller functions
		//	possibly reuseable functions since there is
		//	some repeated code in the adhoc/static/dynamic
		//	security settings
		webService.getWirelessSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');

			mode = xml.find('ipacu_response > mode').text();
			if (mode === 'OFF') {
				$('#off-btn').click();
			} else if (mode === 'ADHOC') {
				$('#adhoc-btn').click();
				var adhocIp = xml.find('message').attr('error');
				$('#adhoc-ip').text(adhocIp);
				adhocSecurityMode = xml.find('adhoc_mode > security > mode').text();
				if (adhocSecurityMode === 'OFF') {
					$('#adhoc-security-off-btn').click();
				} else if (adhocSecurityMode === 'WEP') {
					$('#adhoc-security-wep-btn').click();
					var adhocPassword = xml.find('adhoc_mode > security > key').text();
					$('#adhoc-security-password').val(adhocPassword);
				}
			} else if (mode === 'IF') {
				$('#if-btn').click();
				ifMode = xml.find('if_mode > mode').text();
				if (ifMode === 'STATIC') {
					$('#static-btn').click();
					var staticSsid = xml.find('if_mode > essid').text(),
						ip = xml.find('ip').text().split('.'),
						subnet = xml.find('netmask').text().split('.'),
						gateway = xml.find('gateway').text().split('.'),
						broadcast = xml.find('broadcast').text().split('.'),
						arrays = [ip, subnet, gateway, broadcast],
						names = ['ip', 'subnet', 'gateway', 'broadcast'];
					for (var i = 0; i < arrays.length; i++) {
						var array = arrays[i],
							name = names[i];
						for (var k = 0; k < array.length; k++) {
							$('#'+name+'-'+(k+1)).val(array[k]);
						}
					}

					$('#static-ssid').val(staticSsid);
					staticSecurityMode = xml.find('if_mode > security > mode').text();
					if (staticSecurityMode == 'OFF') {
						$('#static-security-off-btn').click();
					} else if (staticSecurityMode == 'WPA_PSK') {
						$('#static-security-wpa-psk-btn').click();
						var staticPassword = xml.find('if_mode > security > key').text();
						$('#static-security-password').val(staticPassword);
					}

				} else if (ifMode === 'DYNAMIC') {
					$('#dynamic-btn').click();
					var dynamicSsid = xml.find('if_mode > essid').text();
					$('#dynamic-ssid').val(dynamicSsid);
					dynamicSecurityMode = xml.find('if_mode > security > mode').text();
					if (dynamicSecurityMode == 'OFF') {
						$('#dynamic-security-off-btn').click();
					} else if (dynamicSecurityMode == 'WPA_PSK') {
						$('#dynamic-security-wpa-psk-btn').click();
						var dynamicPassword = xml.find('if_mode > security > key').text();
						$('#dynamic-security-password').val(dynamicPassword);						
					}
				}
			}
		});
	};

	self.save = function() {
		//	TODO:
		//	validation, password validation, etc

		var wirelessSettings = { 'mode' : mode }
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
					ip : $('#ip-1').val()+'.'+$('#ip-2').val()+'.'+$('#ip-3').val()+'.'+$('#ip-4').val(),
					netmask : $('#subnet-1').val()+'.'+$('#subnet-2').val()+'.'+$('#subnet-3').val()+'.'+$('#subnet-4').val(),
					gateway : $('#gateway-1').val()+'.'+$('#gateway-2').val()+'.'+$('#gateway-3').val()+'.'+$('#gateway-4').val(),
					broadcast : $('#broadcast-1').val()+'.'+$('#broadcast-2').val()+'.'+$('#broadcast-3').val()+'.'+$('#broadcast-4').val(),
					essid : $('#static-ssid').val(),
					security : {
						mode : staticSecurityMode,
						key : (staticSecurityMode ? $('#static-security-password').val() : '')
					}
				}
			} else if (ifMode === 'DYNAMIC') {
				wirelessSettings.if_mode = {
					mode : ifMode,
					essid : $('#dynamic-ssid').val(),
					security : {
						mode : dynamicSecurityMode,
						key : (dynamicSecurityMode ? $('#dynamic-security-password').val() : '')
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