"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.AutoswitchPage = function() {
	var webService = TVRO.WebService(),

		menuView,
		MenuView = function() {
			var self = $.apply($, arguments),
				satelliteTrackingView = TVRO.SatelliteTrackingView('[id ~= satellite-view ]', self);

			$('[id ~= new-btn ]', self).click(function() {
				//	show the popup
			});

			return $.extend({}, self, {});
		},

		autoswitchesView,
		AutoswitchesView = function() {
			var self = $.apply($, arguments),
				autoswitchesTable = TVRO.Table('[id ~= autoswitches-table ]', self),
				autoswitchesRadio = TVRO.Radio('[id ~= autoswitches-table ]', self),
				refresh = function() {
					webService.request('get_autoswitch_status', function(response) {
						autoswitchesTable.setData([1, 2, 3]);
						autoswitchesRadio.refresh();
					});
				};

			autoswitchesRadio.click(function(value) {
				$('[id ~= table-row ]', autoswitchesTable)
					.removeClass('is-master')
					.has(this)
					.addClass('is-master');
			});

			return $.extend({}, self, {
				refresh: refresh
			});
		};



	return {
		init: function() {
			menuView = MenuView('[id ~= menu-view ]');
			autoswitchesView = AutoswitchesView('[id ~= autoswitches-view ]');

			this.refresh();
		},
		refresh: function() {
			autoswitchesView.refresh();
		}
	}
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SatelliteTrackingView = function() {
	var self = $.apply($, arguments),
		webService = TVRO.WebService(),
		switchingModeBtn = TVRO.ToggleBtn('[id ~= mode-btn ]', self),
		satellitesRadio = TVRO.Radio('[id ~= satellite-dropdown ]', self),
		refresh = function() {
			webService.request('antenna_status', function(response) {
				var detailsView = $('[id ~= details-view ]', self);
				$('[id ~= name ]', detailsView).text($('satellite name', response).text());
				$('[id ~= region ]', detailsView).text($('satellite region', response).text());
				$('[id ~= status ]', detailsView).text($('antenna state', response).text());
				$('[id ~= signal ]', detailsView).removeClass('is-0 is-1 is-2 is-3 is-4 is-5');
				$('[id ~= signal ]', detailsView).addClass('is-'+$('antenna rf bars', response).text());
			});

			webService.request('get_autoswitch_status', function(response) {
				var isManual = $('enable:eq(0)', response).text() === 'Y';

				if (isManual) {
					var slots = ['a', 'b', 'c', 'd'],
						selectedSlot = $('master sat', response).text(),
						selectedSatellite = $('satellites '+selectedSlot, response);

					for (var i = 0; i < slots.length; i++) {
						var satellite = $('satellites '+slots[i].toUpperCase(), response),
							slotBtn = $('[id ~= slot-'+slots[i]+'-btn ]', satellitesRadio);

						slotBtn.toggle(satellite.children().length > 0);
						slotBtn.attr('value', $('antSatID', satellite).text());
						$('[id ~= name ]', slotBtn).text($('name', satellite).text());
						$('[id ~= region ]', slotBtn).text($('region', satellite).text());
					}

					satellitesRadio.setSelectedValue($('antSatID', selectedSatellite).text());
				}

				switchingModeBtn.toggleClass('is-on', isManual);
				satellitesRadio.toggle(isManual);
			});
		};

	switchingModeBtn.click(function(isManual) {
		webService.request('set_autoswitch_service', {
			'enabled' : (isManual ? 'N' : 'Y')
		}, refresh);
	});

	satellitesRadio.click(function(antSatID) {
		webService.request('select_satellite', {
			antSatID: antSatID
		}, refresh);
	});

	refresh();

	return $.extend({}, self, {
		refresh: refresh
	});
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.AutoswitchPage();

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

/*

TVRO.Autoswitch = function(xml) {
	var self = {},
		xml = $(xml);

	self.name = $('name', xml).text();
	self.ip = $('ip', xml).text();
	self.sn = $('sn', xml).text();

	return self;
};

// TVRO.AutoswitchView = function(view, autoswitch) {
// 	var self = {},
// 		view = $(view),
// 		autoswitch = new TVRO.Autoswitch(autoswitch);
// 	return self;
// };

TVRO.AutoswitchView = function(view, autoswitch) {
	var self = {},
		autoswitch = new TVRO.Autoswitch(autoswitch);

	$('[id ~= save-btn]', view).click(function() {
		self.showView();
	});

	$('[id ~= cancel-btn]', view).click(function() {
		self.showView();
	});

	$('[id ~= edit-btn]', view).click(function() {
		self.showEdit();
	});

	$('[id ~= remove-btn]', view).click(function() {
		self.showEdit();
	});

	$('[id ~= name]', view).text(autoswitch.name).val(autoswitch.name);
	$('[id ~= ip]', view).text(autoswitch.ip).val(autoswitch.ip);
	$('[id ~= sn]', view).text(autoswitch.sn).val(autoswitch.sn);

	$('#mc').append(view);

	self.showEdit = function() {
		$('[id ~= edit]', view).show();
		$('[id ~= view]', view).hide();
	};

	self.showView = function() {
		$('[id ~= view]', view).show();
		$('[id ~= edit]', view).hide();
	};

	return self;
};

TVRO.AutoswitchPage = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#autoswitch-btn').toggleClass('selected', true);

		//	so
		//	first off
		//	check if autoswitch is like avail or not

		webService.request('get_autoswitch_status', function(response) {
			console.log(response);

			var available = $('available', response).text() === 'Y',
				enabled = $('ipacu_response > enable', response).text() === 'Y',
				autoswitches = $('active_list > autoswitch', response),
				master = $('master', response);

			if (!available) {
				//	show something else, redirect maybe?
			} else if (!enabled) {
				//	no screen set up yet, not sure what to do
				//	in this case (available && !enabled)
			} else {
				var template = $('[id ~= autoswitch]').detach();
				$('[id ~= edit]', template).hide();
				autoswitches.each(function(index, autoswitch) {
					var g = new TVRO.AutoswitchView(template.clone(true), autoswitch);
				});
			}
		});		
	};

	return self;
};

TVRO.page = new TVRO.AutoswitchPage();

*/