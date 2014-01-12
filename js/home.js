"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage = function() {
	 var self = {},
		updateInterval,
		cookieManager = TVRO.CookieManager(),
		webService = TVRO.WebService();

	self.init = function() {
		$('#autoswitch-button').click(function() {
			var autoswitchEnabled = $('#autoswitch-button').hasClass('on');
			webService.request('set_autoswitch_service', {
				'enable' : (autoswitchEnabled ? 'N' : 'Y')
			}, function(response) {
				$('#autoswitch-button').toggleClass('on');
			});
		});

		$('#master-button').click(function() {
			$('#master-list').show();
		});

		$('.master-list-item').click(function() {
			$('#master-list').hide();
		});

		$('#sat-button').click(function() {
			window.location = '/satellites.php';
		});

		var demoMode = cookieManager.hasCookie(TVRO.DEMO_MODE);
		$('#demo-mode').toggle(demoMode);

		$('[id ~= group ]', '#menu').hide();
		$('[id ~= manual ]', '#menu').show();

		self.startUpdating();
	};

	self.startUpdating = function() {
		self.update();
		updateInterval = setInterval(self.update, 2000);
	};

	self.stopUpdating = function() {
		clearInterval(updateInterval);
	};

	self.update = function() {
		webService.request('antenna_status', function(response) {
			var lat = Number(response.find('gps > lat').text()).toFixed(3),
				lon = Number(response.find('gps > lon').text()).toFixed(3),
				vesselHeading = Number(response.find('antenna > brst > hdg').text()).toFixed(1),
				azBow = Math.round(parseFloat(response.find('az_bow').text(), 10));

			$('#latitude').text((lat > 0.0) ? lat+' N' : Math.abs(lat)+' S');
			$('#longitude').text((lon > 0.0) ? lon+' E' : Math.abs(lon)+' W');
			$('#vessel-heading').text(vesselHeading+'˚');
			if (!isNaN(azBow) && azBow !== 999) {
				$('#vessel-animation').css({
					'transform' : 'rotate('+azBow+'deg)',
					'-moz-transform' : 'rotate('+azBow+'deg)',
					'-ms-transform' : 'rotate('+azBow+'deg)',
					'-webkit-transform' : 'rotate('+azBow+'deg)'
				});
			}

			$('[id ~= satellite-name ]').text(response.find('satellite > name').text());
			$('[id ~= satellite-id ]').text(response.find('satellite > antSatID').text());
			$('[id ~= satellite-signal ]').removeClass('sat-signal-0 sat-signal-1 sat-signal-2 sat-signal-3 sat-signal-4 sat-signal-5');
			$('[id ~= satellite-signal ]').addClass('sat-signal-'+response.find('antenna > rf > bars').text());
		});

		webService.request('antenna_versions', function(response) {
			$('#antenna').text(response.find('au model').text());
		});

		webService.request('get_autoswitch_service', function(response) {
			$('#autoswitch-button').toggleClass('on', response.find('ipacu_response > enable').text() === 'Y');
		});

		webService.request('get_product_registration', function(response) {
			$('#vessel-name').text(response.find('product vessel_name').text());
		});
	}

	return self;
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.HomePage();