"use strict";

TVRO.EthernetSettings = function() {
	var self = {},
		webService = new TVRO.WebService(),
		mode = 'STATIC';	//	OFF, STATIC, DYNAMIC

	self.init = function() {
		$('#network-settings-btn').toggleClass('selected', true);

		TVRO.Dropdown('mode-dropdown', 'mode-btn', function(optionText, optionValue) {
			mode = optionValue;
			$('#static-mode').toggle(mode === 'STATIC');
			$('#mode-btn').text(optionText);
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

		webService.request('get_eth', function(response) {
			mode = response.find('mode').text();
			$('#mode-dropdown .dropdown-option[value='+mode+']').click();

			if (mode === 'STATIC') {
				var ip = response.find('ip').text().split('.'),
					subnet = response.find('netmask').text().split('.'),
					gateway = response.find('gateway').text().split('.'),
					broadcast = response.find('broadcast').text().split('.');
				for (var i = 0; i < 4; i++) {
					$('#static-ip input:eq('+i+')').val(ip[i]);
					$('#static-subnet input:eq('+i+')').val(subnet[i]);
					$('#static-gateway input:eq('+i+')').val(gateway[i]);
					$('#static-broadcast input:eq('+i+')').val(broadcast[i]);
				}
			}
		});
	};

	self.save = function() {
		//	TODO:
		//	validate that all fields are filled

		var ethernetSettings = {
			'mode' : mode
		};

		if (mode === 'STATIC') {
			ethernetSettings.ip = $('#static-ip input').map(function() { return this.value; }).get().join('.'),
			ethernetSettings.netmask = $('#static-subnet input').map(function() { return this.value; }).get().join('.'),
			ethernetSettings.gateway = $('#static-gateway input').map(function() { return this.value; }).get().join('.'),
			ethernetSettings.broadcast = $('#static-broadcast input').map(function() { return this.value; }).get().join('.')
		}

		webService.request('set_eth', ethernetSettings, function(response) {
			window.location = '/settings/network-settings.php';
		});
	};

	self.cancel = function() {
		window.location = '/settings/network-settings.php';
	};

	self.reset = function() {
		webService.request('set_eth_factory', function(response) {
			window.location = '/settings/network-settings.php';			
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.EthernetSettings();