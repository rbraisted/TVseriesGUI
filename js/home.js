"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage = function() {
	var
	webService = TVRO.WebService(),

	menuView,
	MenuView = function() {	
		var
		self = $.apply($, arguments),
		satelliteTrackingView = TVRO.SatelliteTrackingView('[id ~= satellite-view ]', self),
		autoswitches = [],
		autoswitchTable = TVRO.Table('[id ~= autoswitch-dropdown ]'),
		autoswitchDropdown = TVRO.Dropdown('[id ~= autoswitch-dropdown ]');

		autoswitchTable.build(function(i, row) {
			var autoswitch = autoswitches[i];
			$('[id ~= name ]', row).text(autoswitch.name);
			row.attr('value', i);
		});

		autoswitchDropdown.setButtons('[id ~= autoswitch-btn ]', self);
		autoswitchDropdown.click(function(i) {
			var autoswitch = autoswitches[i];
			$('[id ~= master ]', self).text(autoswitch.name);
			webService.request('set_autoswitch_master', {
				sn: autoswitch.sn
			});
		});

		webService.request('antenna_versions', function(response) {
			$('[id ~= antenna ]', self).text($('au model', response).text());
		});

		return $.extend({}, self, {
			refresh: function() {
				satelliteTrackingView.refresh();
				webService.request('antenna_status', function(response) {
					var latitude = Number($('gps lat', response).text()).toFixed(3),
						longitude = Number($('gps lon', response).text()).toFixed(3);

					$('[id ~= latitude ]', self).text(latitude > 0.0 ? latitude+'N' : Math.abs(latitude)+'S');
					$('[id ~= longitude ]', self).text(longitude > 0.0 ? longitude+'E' : Math.abs(longitude)+'W');
				});

				webService.request('get_autoswitch_status', function(response) {
					var view = $('[id ~= autoswitch-view ]', self),
						masterSn = $('master sn', response).text(),
						masterName = $('autoswitch:contains('+masterSn+') name', response).text();

					autoswitches = $('autoswitch', response).map(function() { return TVRO.Autoswitch(this); }).toArray();
					autoswitchTable.build(autoswitches.length);
					autoswitchDropdown.refresh();

					for (var i = 0; i < autoswitches.length; i++) {
						if (autoswitches[i].name === masterName) autoswitchDropdown.setSelectedValue(i);
					}

					$('[id ~= master ]', view).text(masterName);
					//	we may need to check active_list.children().length > 0 instead
					view.toggle($('active_list', response).length > 0);
					view.toggleClass('is-disabled', $('enable:eq(0)', response).text() === 'N');

					var isManual = $('enable:eq(0)', response).text() === 'Y';
					if (isManual) {
						view.hide();
					} else {
						view.show();
					}
				});
			}
		});
	},

	vesselView,
	VesselView = function() {
		var
		self = $.apply($, arguments);

		webService.request('get_product_registration', function(response) {
			$('[id ~= vessel-name ]', self).text($('vessel_name', response).text());
		});

		return $.extend({}, self, {
			refresh: function() {
				webService.request('antenna_status', function(response) {
					var heading = Number($('antenna brst hdg', response).text()).toFixed(1),
						azBow = Math.round(parseFloat($('az_bow', response).text(), 10)),
						state = $('antenna state', response).text(),
						animation = $('[id ~= vessel-animation ]', self);

					animation.removeClass('is-green is-orange is-red');
					animation.addClass({
						'INITIALIZING': 'is-orange',
						'SEARCHING': 'is-orange',
						'TRACKING': 'is-green',
						'IDLE': 'is-orange',
						'ERROR': 'is-red',
						'CABLE UNWRAP': 'is-orange'
					}[state]);

					$('[id ~= vessel-heading ]', self).text(heading+'˚');
					if (!isNaN(azBow) && azBow !== 999) {
						animation.css({
							'transform' : 'rotate('+azBow+'deg)',
							'-moz-transform' : 'rotate('+azBow+'deg)',
							'-ms-transform' : 'rotate('+azBow+'deg)',
							'-webkit-transform' : 'rotate('+azBow+'deg)'
						});
					}
				});
			}
		});
	}

	return {
		init: function() {
			menuView = MenuView('[id ~= menu-view ]');
			vesselView = VesselView('[id ~= vessel-view ]');



			menuView.refresh();
			vesselView.refresh();
			setInterval(function() {
				menuView.refresh();
				vesselView.refresh();
			}, 5000);
		}
	}
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.HomePage();