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
			webService.request('set_autoswitch_service', {
				//	is-on = manual, send 'N'
				'enabled' : (modeBtn.hasClass('is-on') ? 'N' : 'Y')
			}, function(response) {
				self.refresh();
			});
		});

		dropdown.optionSelected(function(name, value) {
			dropdown.show();
			//	select satellite
			webService.request('select_satellite', {
				'antSatID' : value
			}, function(response) {
				self.refresh();
			});
		});
	}

	self.refresh = function() {
		console.log("!");
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
				dropdownView = $('[id ~= satellite-dropdown ]', view),
				dropdownOptions = $('[id ~= dropdown-option ]', dropdownView),
				satelliteABtn = $('[id ~= satellite-a-btn ]', dropdownView),
				satelliteBBtn = $('[id ~= satellite-b-btn ]', dropdownView),
				satelliteCBtn = $('[id ~= satellite-c-btn ]', dropdownView),
				satelliteDBtn = $('[id ~= satellite-d-btn ]', dropdownView);

			modeBtn.toggleClass('is-on', enabled);
			dropdownView.toggle(enabled);

			satelliteABtn.toggle($('satellites A', response).children().length > 0);
			satelliteABtn.attr('value', $('satellites A antSatID', response).text());
			$('[id ~= name ]', satelliteABtn).text($('satellites A name', response).text());
			$('[id ~= region ]', satelliteABtn).text($('satellites A region', response).text());

			satelliteBBtn.toggle($('satellites B', response).children().length > 0);
			satelliteBBtn.attr('value', $('satellites B antSatID', response).text());
			$('[id ~= name ]', satelliteBBtn).text($('satellites B name', response).text());
			$('[id ~= region ]', satelliteBBtn).text($('satellites B region', response).text());

			satelliteCBtn.toggle($('satellites C', response).children().length > 0);
			satelliteCBtn.attr('value', $('satellites C antSatID', response).text());
			$('[id ~= name ]', satelliteCBtn).text($('satellites C name', response).text());
			$('[id ~= region ]', satelliteCBtn).text($('satellites C region', response).text());

			satelliteDBtn.toggle($('satellites D', response).children().length > 0);
			satelliteDBtn.attr('value', $('satellites D antSatID', response).text());
			$('[id ~= name ]', satelliteDBtn).text($('satellites D name', response).text());
			$('[id ~= region ]', satelliteDBtn).text($('satellites D region', response).text());

			dropdown.setSelectedValue($('satellites '+$('master sat', response).text()+' antSatID', response).text());
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
			//	we may need to check active_list.children().length > 0 instead
			view.toggle($('active_list', response).length > 0);
			view.toggleClass('is-disabled', $('enable:eq(0)', response).text() === 'N');
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage.VesselView = function() {
	var self = {},
		view = $('[id ~= vessel-view ]'),
		webService = TVRO.WebService();

	self.init = function() {
		webService.request('get_product_registration', function(response) {
			$('[id ~= vessel-name ]', view).text($('vessel_name', response).text());
		});
	}

	self.refresh = function() {
		webService.request('antenna_status', function(response) {
			var vesselHeading = Number($('antenna > brst > hdg', response).text()).toFixed(1),
				azBow = Math.round(parseFloat($('az_bow', response).text(), 10));

			$('[id ~= vessel-heading ]', view).text(vesselHeading+'˚');
			if (!isNaN(azBow) && azBow !== 999) {
				$('[id ~= vessel-animation ]', view).css({
					'transform' : 'rotate('+azBow+'deg)',
					'-moz-transform' : 'rotate('+azBow+'deg)',
					'-ms-transform' : 'rotate('+azBow+'deg)',
					'-webkit-transform' : 'rotate('+azBow+'deg)'
				});
			}
		});
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.HomePage();