"use strict";

TVRO.EthernetSettings = function() {
	var self = {},
		webService = new TVRO.WebService(),
		mode = 'STATIC';	//	OFF, STATIC, DYNAMIC

	self.init = function() {
		$('#network-settings-btn').toggleClass('selected', true);

		$('#off-btn, #static-btn, #dynamic-btn').click(function() {
			mode = {
				'off-btn' : 'OFF',
				'static-btn' : 'STATIC',
				'dynamic-btn' : 'DYNAMIC'
			}[this.id];
			$('#static-settings').toggle(mode === 'STATIC');
			$('#off-btn, #static-btn, #dynamic-btn').removeClass('selected');
			$(this).toggleClass('selected', true);
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

		webService.getEthernetSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');
			mode = xml.find('mode').text();
			if (mode === 'OFF') {
				$('#off-btn').click();
			} else if (mode === 'DYNAMIC') {
				$('#dynamic-btn').click();
			} else if (mode === 'STATIC') {
				$('#static-btn').click();
				var ip = xml.find('ip').text().split('.'),
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
			}
		});
	};

	self.save = function() {
		//	TODO:
		//	validate that all fields are filled

		var ethernetSettings = { 'mode' : mode }
		if (mode === 'STATIC') {
			ethernetSettings.ip = $('#ip-1').val()+'.'+$('#ip-2').val()+'.'+$('#ip-3').val()+'.'+$('#ip-4').val();
			ethernetSettings.netmask = $('#subnet-1').val()+'.'+$('#subnet-2').val()+'.'+$('#subnet-3').val()+'.'+$('#subnet-4').val();
			ethernetSettings.gateway = $('#gateway-1').val()+'.'+$('#gateway-2').val()+'.'+$('#gateway-3').val()+'.'+$('#gateway-4').val();
			ethernetSettings.broadcast = $('#broadcast-1').val()+'.'+$('#broadcast-2').val()+'.'+$('#broadcast-3').val()+'.'+$('#broadcast-4').val();
		}

		webService.setEthernetSettings(ethernetSettings, function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');
			window.location = '/settings/network-settings.php';
		});
	};

	self.cancel = function() {
		window.location = '/settings/network-settings.php';
	};

	self.reset = function() {
		webService.resetEthernetSettings(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');
			window.location = '/settings/network-settings.php';			
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.EthernetSettings();