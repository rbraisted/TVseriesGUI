"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.AutoswitchPage = function() {
	var webService = TVRO.WebService(),

		satelliteTrackingView,

		autoswitchesTableView,
		AutoswitchesTableView = function() {
			var self = $.apply($, arguments),
				receivers = [],
				masterReceiver = {},
				activeReceivers = [],
				table = TVRO.Table.apply(this, arguments),
				refresh = function() {
					var	getReceivers = function() {
						return {
							sn: $('sn', this).text(),
							name: $('name', this).text(),
							ip: $('ip_address', this).text()
						}
					},

					populateTable = function() {
						table.setData(receivers);

						$('[id ~= table-row ]', table).each(function(i) {
							$(this).toggleClass('is-master', receivers[i].sn === masterReceiver.sn)
								.toggleClass('is-active', Boolean($(activeReceivers).filter(function() { return receivers[i].sn === this.sn; }).length));

							$('[id ~= name ]', this).eq(i).text(receivers[i].name);
							$('[id ~= serial-number ]', this).eq(i).text(receivers[i].sn);
							$('[id ~= ip ]', this).eq(i).text(receivers[i].sn);

							$('[id ~= edit-btn ]', this).eq(i).click(function() {
								editView.loadReceiver(receivers[i]);
								$(document.body).setClass('at-edit');
							});

							$('[id ~= select-btn ]', this).eq(i).click(function() {
								$('[id ~= table-row ]', table)
									.removeClass('is-master')
									.has(this)
									.addClass('is-master');

								webService.request('set_autoswitch_master', {
									sn: receivers[i].sn
								}, refresh);
							});
						});
					}

					//	using get_autoswitch_configured_names,
					//	get the full list of devices
					webService.request('get_autoswitch_configured_names', function(response) {
						receivers = $('autoswitch', response).map(getReceivers).toArray();

						//	using get_autoswitch_status, get the active subset
						webService.request('get_autoswitch_status', function(response) {
							masterReceiver = getReceivers.call($('master', response));
							activeReceivers = $('autoswitch', response).map(getReceivers).toArray();
							populateTable();
						});
					});
				}

			return $.extend({}, self, {
				refresh: refresh
			});
		},

		editView,
		EditView = function() {
			var self = $.apply($, arguments),
				receiver = {},
				isNew = false,
				refresh = function() {
					$('[id ~= delete-btn ]', self).toggle(!isNew);
					$('[id ~= serial-number ]', self).val(receiver.sn);
					$('[id ~= name ]', self).val(receiver.name);
					$('[id ~= ip ]', self).val(receiver.ip);
				}

			$('[id ~= delete-btn ]', self).click(function() {
				webService.request('set_autoswitch_configured_names', {
					sn: receiver.sn,
					name: receiver.name
				}, function() {
					autoswitchesTableView.refresh();
					$(document.body).setClass('at-receivers-table-view');
				});
			});

			$('[id ~= cancel-btn ]', self).click(function() {
				if (isNew) $(document.body).setClass('at-menu');
				else $(document.body).setClass('at-autoswitches');
			});

			$('[id ~= save-btn ]', self).click(function() {
				webService.request('set_autoswitch_configured_names', {
					sn: receiver.sn,
					name: receiver.name
				}, function() {
					autoswitchesTableView.refresh();
					$('[id ~= cancel-btn ]', self).click();
				});
			});

			return $.extend({}, self, {
				loadReceiver: function() {
					isNew = false;
					receiver = arguments[0];
					refresh();
				},
				loadNew: function() {
					isNew = true;
					receiver = {};
					refresh();
				}
			});
		}

	return {
		init: function() {
			satelliteTrackingView = TVRO.SatelliteTrackingView('[id ~= satellite-view ]');
			autoswitchesTableView = AutoswitchesTableView('[id ~= autoswitches-view ]');
			editView = EditView('[id ~= edit-view ]');

			$('[id ~= new-btn ]', self).click(function() {
				//	show the popup
				editView.loadNew();
				$(document.body).setClass('at-edit');
			});

			this.refresh();
		},
		refresh: function() {
			satelliteTrackingView.refresh();
			autoswitchesTableView.refresh();
		}
	}
}

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
			enabled: (isManual ? 'N' : 'Y')
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