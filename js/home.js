"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage = function() {
	var self = {};

	self.init = function() {
		var menuView = TVRO.HomePage.MenuView(),
			vesselView = TVRO.HomePage.VesselView();
			
		menuView.init();
		menuView.refresh();
		vesselView.init();
		vesselView.refresh();
		setInterval(function() {
			menuView.refresh();
			vesselView.refresh();
		}, 2000);
	}

	self.update = function() {
		// webService.request('antenna_status', function(response) {
		// 	var lat = Number(response.find('gps > lat').text()).toFixed(3),
		// 		lon = Number(response.find('gps > lon').text()).toFixed(3),
		// 		vesselHeading = Number(response.find('antenna > brst > hdg').text()).toFixed(1),
		// 		azBow = Math.round(parseFloat(response.find('az_bow').text(), 10));

		// 	$('#latitude').text((lat > 0.0) ? lat+' N' : Math.abs(lat)+' S');
		// 	$('#longitude').text((lon > 0.0) ? lon+' E' : Math.abs(lon)+' W');
		// 	$('#vessel-heading').text(vesselHeading+'˚');
		// 	if (!isNaN(azBow) && azBow !== 999) {
		// 		$('#vessel-animation').css({
		// 			'transform' : 'rotate('+azBow+'deg)',
		// 			'-moz-transform' : 'rotate('+azBow+'deg)',
		// 			'-ms-transform' : 'rotate('+azBow+'deg)',
		// 			'-webkit-transform' : 'rotate('+azBow+'deg)'
		// 		});
		// 	}

		// 	$('[id ~= satellite-name ]').text(response.find('satellite > name').text());
		// 	$('[id ~= satellite-id ]').text(response.find('satellite > antSatID').text());
		// 	$('[id ~= satellite-signal ]').removeClass('sat-signal-0 sat-signal-1 sat-signal-2 sat-signal-3 sat-signal-4 sat-signal-5');
		// 	$('[id ~= satellite-signal ]').addClass('sat-signal-'+response.find('antenna > rf > bars').text());
		// });

		// webService.request('antenna_versions', function(response) {
		// 	$('#antenna').text(response.find('au model').text());
		// });

		// webService.request('get_autoswitch_service', function(response) {
		// 	$('#autoswitch-button').toggleClass('on', response.find('ipacu_response > enable').text() === 'Y');
		// });

		// webService.request('get_product_registration', function(response) {
		// 	$('#vessel-name').text(response.find('product vessel_name').text());
		// });
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage.MenuView = function() {
	var self = {},
		view = $('[id ~= menu-view ]'),
		satelliteView = TVRO.HomePage.SatelliteView(),
		autoswitchView = TVRO.HomePage.AutoswitchView(),
		antennaView = $('[id ~= antenna-view ]', view),
		locationView = $('[id ~= location-view ]', view),
		webService = TVRO.WebService();

	self.init = function() {
		satelliteView.init();
		autoswitchView.init();
	}

	self.refresh = function() {
		satelliteView.refresh();
		autoswitchView.refresh();

		webService.request('antenna_status', function(response) {
			var latitude = Number($('gps lat', response).text()).toFixed(3),
				longitude = Number($('gps lon', response).text()).toFixed(3);

			if (latitude > 0.0) latitude += 'N';
			else latitude = Math.abs(latitude)+'S';

			if (longitude > 0.0) longitude += 'E';
			else longitude = Math.abs(longitude)+'W';

			$('[id ~= latitude ]', locationView).text(latitude);
			$('[id ~= longitude ]', locationView).text(longitude);
		});

		webService.request('antenna_versions', function(response) {
			$('[id ~= antenna ]').text($('au model', response).text());
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage.SatelliteView = function() {
	var self = {},
		view = $('[id ~= satellite-view ]'),
		modeView = $('[id ~= mode-view ]', view),
		modeBtn = $('[id ~= mode-btn ]', modeView),
		detailsView = $('[id ~= details-view ]', view),
		dropdown = TVRO.Dropdown('[id ~= satellite-dropdown ]', view),
		webService = TVRO.WebService();

	self.init = function() {
		modeBtn.click(function() {
			modeBtn.toggleClass('is-on');
			//	i don't think this is the right call (???)
			webService.request('get_autoswitch_status', {
				//	is-on = manual, send 'N'
				'enabled' : (modeBtn.hasClass('is-on') ? 'N' : 'Y')
			}, function(response) {
				self.refresh();
			});
		});

		dropdown.optionSelected(function(name, value) {
			dropdown.show();
			//	select satellite
			self.refresh();
		});
	}

	self.refresh = function() {
		webService.request('antenna_status', function(response) {
			$('[id ~= name ]', detailsView).text($('satellite name', response).text());
			$('[id ~= region ]', detailsView).text($('satellite region', response).text());
			$('[id ~= status ]', detailsView).text($('antenna state', response).text());
			$('[id ~= signal ]', detailsView).removeClass('is-0 is-1 is-2 is-3 is-4 is-5');
			$('[id ~= signal ]', detailsView).addClass('is-'+$('antenna rf bars', response).text());
		});

		//	not sure about this one either (???)
		webService.request('get_autoswitch_status', function(response) {
			var enabled = $('enable:eq(0)', response).text() === 'Y',
				satelliteAView = $('[id ~= satellite-a ]', view),
				satelliteBView = $('[id ~= satellite-b ]', view),
				satelliteCView = $('[id ~= satellite-c ]', view),
				satelliteDView = $('[id ~= satellite-d ]', view);

			modeBtn.toggleClass('is-on', enabled);
			dropdown.setSelectedValue($('master sat', response).text());
			if (enabled) dropdown.show();
			else dropdown.hide();

			$('[id ~= name ]', satelliteAView).text($('satellites A name', response).text());
			$('[id ~= region ]', satelliteAView).text($('satellites A region', response).text());
			$('[id ~= name ]', satelliteBView).text($('satellites B name', response).text());
			$('[id ~= region ]', satelliteBView).text($('satellites B region', response).text());
			$('[id ~= name ]', satelliteCView).text($('satellites C name', response).text());
			$('[id ~= region ]', satelliteCView).text($('satellites C region', response).text());
			$('[id ~= name ]', satelliteDView).text($('satellites D name', response).text());
			$('[id ~= region ]', satelliteDView).text($('satellites D region', response).text());
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage.AutoswitchView = function() {
	var self = {},
		view = $('[id ~= autoswitch-view ]'),
		webService = TVRO.WebService();

	self.init = function() {
		$('[id ~= change-btn ]', view).click(function() {
			//	show dropdown?
		});
	}

	self.refresh = function() {
		webService.request('get_autoswitch_status', function(response) {
			var masterSn = $('master sn', response).text(),
				masterName = $('autoswitch:contains('+masterSn+') name', response).text();
			$('[id ~= name ]', view).text(masterName);
			view.toggle($('available', response).text() === 'Y');
			view.toggleClass('is-disabled', $('enable:eq(0)', response).text() === 'N');
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage.VesselView = function() {
	var self = {},
		view = $('[id ~= menu-view ]'),
		webService = TVRO.WebService();

	self.init = function() {
		
	}

	self.refresh = function() {
		
	}

	return self;	
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.HomePage();