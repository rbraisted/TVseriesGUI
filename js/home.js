"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.HomePage = function() {
	var
	webService = TVRO.WebService(),

	menuView,
	MenuView = function() {	
		var
		self = $.apply($, arguments),
		satelliteTrackingView = TVRO.SatelliteTrackingView('[id ~= satellite-view ]', self);

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
						azBow = Math.round(parseFloat($('az_bow', response).text(), 10));

					$('[id ~= vessel-heading ]', self).text(heading+'˚');
					if (!isNaN(azBow) && azBow !== 999) {
						$('[id ~= vessel-animation ]', self).css({
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