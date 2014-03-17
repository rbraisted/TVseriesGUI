"use strict";

TVRO.SatellitesPage = function() {
	var
	webService = TVRO.WebService(),

	service = '',
	enable = '',
	satellites = [],
	selectedSatellite = {},
	groups = [],
	selectedGroup = {},

	menuView,
	MenuView = function() {	
		var
		self = $.apply($, arguments),
		satelliteTrackingView = TVRO.SatelliteTrackingView('[id ~= tracking-view ]', self),
		modeBtn = TVRO.Toggle('[id ~= mode-btn ]', self),
		singleRadio = TVRO.Radio('[id ~= single-view ]', self),
		groupRadio = TVRO.Radio('[id ~= group-view ]', self),
		groupTable = TVRO.Table('[id ~= group-view ]', self);

		modeBtn.click(function(isSingle) {
			if (isSingle) $(document.body).setClass('is-single at-splash');
			else $(document.body).setClass('is-group at-splash');
		});

		singleRadio.click(function(region) {
			singleTableView.loadRegion(region);
			$(document.body).setClass('is-single at-satellites-table');
		});

		groupRadio.click(function(i) {
			groupView.loadGroup(groups[i]);
			$(document.body).setClass('is-group at-satellite-group');
		});

		groupTable.build(function(i, row) {
			var group = groups[i];

			row.attr('value', i);
			row.toggleClass('is-installed', group.name === selectedGroup.name);

			$('[id ~= name ]', row).text(group.name);

			$('[id ~= select-btn ]', row).click(function() {
				event.stopPropagation();
				if (confirm('Install '+group.name+'?')) {
					webService.request('set_autoswitch_service', {
						enable: enable,
						service: service,
						satellite_group: group.name
					}, function() {
						$('[id ~= table-row ]', groupTable).removeClass('is-installed');
						row.addClass('is-installed');
						selectedGroup = group;
						menuView.refresh();
					});
				}
			});
		});

		$('[id ~= new-btn ]', self).click(function() {
			var group = TVRO.Group();
			group.predefined = 'N';
			editView.loadGroup(group);
			$(document.body).setClass('is-group at-edit-satellite-group');
		});

		return $.extend({}, self, {
			refresh: function() {
				var isSingle =
					(selectedGroup.satelliteA ? selectedGroup.satelliteA.antSatID : 0) +
					(selectedGroup.satelliteB ? selectedGroup.satelliteB.antSatID : 0) +
					(selectedGroup.satelliteC ? selectedGroup.satelliteC.antSatID : 0) +
					(selectedGroup.satelliteD ? selectedGroup.satelliteD.antSatID : 0) === 1;

				modeBtn.setOn(isSingle);
				$(document.body).toggleClass('is-single', isSingle).toggleClass('is-group', !isSingle);

				if (!singleRadio.selectedValue()) {
					singleTableView.loadRegion('All');
					singleRadio.setSelectedValue('All');
				}

				groupView.loadGroup(selectedGroup);
				groupTable.build(groups.length);
				groupRadio.refresh();
				groupRadio.setSelectedValue(groups.indexOf(selectedGroup));

				satelliteTrackingView.refresh();
			}
		});
	},
	
	groupView,
	GroupView = function() {
		var
		self = $.apply($, arguments),
		group = {},
		SlotView = function() {
			var
			self = $.apply($, arguments),
			satellite = {};

			$('[id ~= info-btn ]', self).click(function() {
				infoView.loadSatellite(satellite);
			});

			$('[id ~= select-btn ]', self).click(function() {
				if (confirm('Select '+satellite.name+'?')) {
					webService.request('select_satellite', {
						antSatID: satellite.antSatID
					}, function() {
						$([slotAView[0], slotBView[0], slotCView[0], slotDView[0]]).removeClass('is-selected');
						self.addClass('is-selected');
						selectedSatellite = satellite;
						menuView.refresh();
					});
				}
			});

			return $.extend({}, self, {
				loadSatellite: function() {
					satellite = arguments[0];
					$('[id ~= name ]', self).text(satellite.name || 'N/A');
					$('[id ~= region ]', self).text(satellite.region);
					$('[id ~= select-btn ], [id ~= info-btn ]', self).toggle(Boolean(satellite.antSatID));
				}
			});
		},
		slotAView = SlotView('[id ~= slot-a-view ]', self),
		slotBView = SlotView('[id ~= slot-b-view ]', self),
		slotCView = SlotView('[id ~= slot-c-view ]', self),
		slotDView = SlotView('[id ~= slot-d-view ]', self);

		$('[id ~= back-btn ]', self).click(function() {
			$(document.body).setClass('is-group at-splash');
		});

		$('[id ~= delete-btn ]', self).click(function() {
			if (confirm('Delete '+group.name+'?')) {
				webService.request('set_satellite_group', {
					command: 'DELETE',
					group_name: group.name
				}, function() {
					groups.splice(groups.indexOf(group), 1);
					menuView.refresh();
				});
			}
		});

		$('[id ~= edit-btn ]', self).click(function() {
			editView.loadGroup(group);
			$(document.body).setClass('is-group at-edit-satellite-group');
		});

		$('[id ~= install-btn ]', self).click(function() {
			if (confirm('Install '+group.name+'?')) {
				webService.request('set_autoswitch_service', {
					service: service,
					enable: enable,
					satellite_group: group.name
				}, function() {
					selectedGroup = group;
					menuView.refresh();
				});
			}
		});

		return $.extend({}, self, {
			loadGroup: function() {
				group = arguments[0];
				$('[id ~= name ]', self).text(group.name);
				$('[id ~= delete-btn ], [id ~= edit-btn ]', self).toggle(group.predefined === 'N');
				$('[id ~= install-btn ]', self).toggle(group.name !== selectedGroup.name);				

				slotAView.loadSatellite(group.satelliteA);
				slotBView.loadSatellite(group.satelliteB);
				slotCView.loadSatellite(group.satelliteC);
				slotDView.loadSatellite(group.satelliteD);

				$('[id ~= slot-view ]', self).removeClass('is-selected');
				if (group.name === selectedGroup.name) {
					if (group.satelliteA.antSatID === selectedSatellite.antSatID) slotAView.addClass('is-selected');
					if (group.satelliteB.antSatID === selectedSatellite.antSatID) slotBView.addClass('is-selected');
					if (group.satelliteC.antSatID === selectedSatellite.antSatID) slotCView.addClass('is-selected');
					if (group.satelliteD.antSatID === selectedSatellite.antSatID) slotDView.addClass('is-selected');
				}
			}
		});
	},

	editView,
	EditView = function() {
		var
		self = $.apply($, arguments),
		group = {},
		slotABtn = $('[id ~= slot-a-btn ]', self).click(function() { slot = 'A'; }),
		slotBBtn = $('[id ~= slot-b-btn ]', self).click(function() { slot = 'B'; }),
		slotCBtn = $('[id ~= slot-c-btn ]', self).click(function() { slot = 'C'; }),
		slotDBtn = $('[id ~= slot-d-btn ]', self).click(function() { slot = 'D'; }),
		slot;

		$('[id ~= slot-btn ]', self).click(function() {
			groupTableView.loadRegion('All');
			$(document.body).setClass('is-group at-satellites-table');
		});

		$('[id ~= cancel-btn ]', self).click(function() {
			$(document.body).setClass('is-group at-satellite-group');
		});

		$('[id ~= save-btn ]', self).click(function() {
			var groupName = $('[id ~= name ]', self).val(),
				addGroup = function() {
					webService.request('set_satellite_group', {
						command: 'ADD',
						group_name: groupName,
						A: group.satelliteA.antSatID,
						B: group.satelliteB.antSatID,
						C: group.satelliteC.antSatID,
						D: group.satelliteD.antSatID
					}, function() {
						groups.push(group);
						group.name = groupName;
						groupView.loadGroup(group);
						menuView.refresh();
					});
				}

			if (confirm('Save '+groupName+'?')) {
				//	check if this is a new group
				if (groups.indexOf(group) === -1) {
					addGroup();
				} else {
					webService.request('set_satellite_group', {
						command: 'DELETE',
						group_name: group.name
					}, function() {
						groups.splice(groups.indexOf(group), 1);
						addGroup();
					});	
				}

				$(document.body).setClass('is-group at-satellite-group');
			}
		});

		return $.extend({}, self, {
			loadGroup: function() {
				group = arguments[0];
				$('[id ~= name ]', self).val(group.name);
				$('[id ~= name ]', slotABtn).text(group.satelliteA.name);
				$('[id ~= name ]', slotBBtn).text(group.satelliteB.name);
				$('[id ~= name ]', slotCBtn).text(group.satelliteC.name);
				$('[id ~= name ]', slotDBtn).text(group.satelliteD.name);
			},
			setSatellite: function() {
				group['satellite'+slot] = arguments[0];
				this.loadGroup(group);
			}
		});
	},

	singleTableView,
	groupTableView,
	TableView = function() {
		var
		self = $.apply($, arguments),
		radio = TVRO.Radio('[id ~= satellites-table ]', self),
		table = TVRO.Table('[id ~= satellites-table ]', self),
		filter,
		filtered = [],
		sort,
		sorted = [],
		refresh = function() {
			filtered = $(satellites).filter(filter).toArray();
			sorted = filtered.slice().sort(sort);

			table.build(sorted.length);
			radio.refresh();
		}

		radio.click(function(i) {
			editView.setSatellite(sorted[i]);
			$(document.body).setClass('is-group at-edit-satellite-group');
		});

		table.build(function(i, row) {
			var satellite = sorted[i],
				favoriteBtn = TVRO.Toggle('[id ~= favorite-btn ]', row);

			row.attr('value', i);
			$('[id ~= name ]', row).text(satellite.name);
			$('[id ~= region ]', row).text(satellite.region);
			$('[id ~= orbital-slot ]', row).text(satellite.antSatID);

			$('[id ~= select-btn ]', row).click(function() {
				event.stopPropagation();
				if (confirm('Select '+satellite.name+'?')) {
					$('[id ~= table-row ]', table).removeClass('is-selected');
					$(row).addClass('is-selected');
					selectedSatellite = satellite;
					webService.request('select_satellite', {
						antSatID: satellite.antSatID
					});	
				}
			});

			$('[id ~= info-btn ]', row).click(function() {
				event.stopPropagation();
				infoView.loadSatellite(satellite);
			});

			favoriteBtn.setOn(satellite.favorite === 'TRUE');
			favoriteBtn.click(function(isFavorite) {
				event.stopPropagation();
				webService.request('set_satellite_identity', {
					listID: satellite.listID,
					antSatID: satellite.antSatID,
					favorite: (isFavorite ? 'TRUE' : 'FALSE')
				});
			});

			if (satellite.antSatID === selectedSatellite.antSatID) row.addClass('is-selected');
		});

		$('[id ~= back-btn ]', self).click(function() {
			$(document.body).setClass('is-single at-splash');
		});

		$('[id ~= cancel-btn ]', self).click(function() {
			$(document.body).setClass('is-group at-edit-satellite-group');
		});

		$('[id ~= sort-btn ]', self).click(function() {
			var sortBtn = $(this),
				sortOrder = 0,
				sortProperty = '';

			if (sortBtn.hasClass('is-descending')) sortOrder = 1;
			else sortOrder = -1;

			$('[id ~= sort-btn ]', self).removeClass('is-ascending is-descending');
			if (sortOrder === 1) sortBtn.addClass('is-ascending');
			else sortBtn.addClass('is-descending');

			if (sortBtn.hasId('name-btn')) sortProperty = 'name';
			else if (sortBtn.hasId('orbital-slot-btn')) sortProperty = 'lon';
			else if (sortBtn.hasId('region-btn')) sortProperty = 'region';
			else if (sortBtn.hasId('favorites-btn')) sortProperty = 'favorite';

			sort = function(a, b) {
				if (a[sortProperty] > b[sortProperty]) return -1 * sortOrder;
				else if (a[sortProperty] < b[sortProperty]) return 1 * sortOrder;
				return 0;
			}

			refresh();
		});

		return $.extend({}, self, {
			refresh: refresh,
			loadRegion: function(region) {
				if (region === 'All') filter = function() { return true; }
				else filter = function() { return this.region === region; }
				refresh();
			}
		});
	},

	infoView,
	InfoView = function() {
		var
		self = $.apply($, arguments),
		satellite = {},
		currentXponder,
		favoriteBtn = TVRO.Toggle('[id ~= favorite-btn ]', self),
		regionDropdown = TVRO.Dropdown('[id ~= region-dropdown ]'),
		hemisphereDropdown = TVRO.Dropdown('[id ~= hemisphere-dropdown ]'),
		lnbTypeDropdown = TVRO.Dropdown('[id ~= lnb-type-dropdown ]'),
		fecCodeDropdown = TVRO.Dropdown('[id ~= fec-code-dropdown ]'),
		decoderTypeDropdown = TVRO.Dropdown('[id ~= decoder-type-dropdown ]'),
		webService = TVRO.WebService(),
		refresh = function() {
			favoriteBtn.setOn(satellite.favorite === 'TRUE' || satellite.favorite === 'Y');
			$('[id ~= name ]', self).text(satellite.name).val(satellite.name);
			regionDropdown.click(satellite.region);
			$('[id ~= orbital-slot ]', self).text(satellite.antSatID).val(satellite.antSatID);
			hemisphereDropdown.click(satellite.lon > 0 ? 'East' : 'West');
			$('[id ~= suffix ]', self).text(satellite.suffix).val(satellite.suffix);
			$('[id ~= pre-skew ]', self).text(satellite.skew).val(satellite.skew);
			lnbTypeDropdown.click((satellite.preferredPolarity === 'R' || satellite.preferredPolarity === 'L') ? 'Linear' : 'Circular');
			$('[id ~= local-oscillator-1 ]', self).text(satellite.lo1).val(satellite.lo1);
			$('[id ~= local-oscillator-2 ]', self).text(satellite.lo2).val(satellite.lo2);

			$('[id ~= circular ]', self).toggle(lnbTypeDropdown.selectedValue() === 'Circular');
			$('[id ~= linear ]', self).toggle(lnbTypeDropdown.selectedValue() === 'Linear');

			if (lnbTypeDropdown.selectedValue() === 'Linear') {	//	if we're linear
				var xponderIds = [1, 3, 5, 7];
				for (var i = 0; i < xponderIds.length; i++) {
					var xponderId = xponderIds[i],
						xponderView = $('[id ~= xponder-'+xponderId+' ]', self),
						xponder = satellite.xponders[xponderId];

					$('[id ~= frequency ]', xponderView).text(xponder.freq).val(xponder.freq);
					$('[id ~= symbol-rate ]', xponderView).text(xponder.symRate).val(xponder.symRate);
					$('[id ~= fec-code ]', xponderView).text(xponder.fec);
					$('[id ~= satellite-id ]', xponderView).text(xponder.netID).val(xponder.netID);
					$('[id ~= decoder-type ]', xponderView).text(xponder.modType);

					(function(xponder, xponderView) {
						$('[id ~= fec-code-btn ]', xponderView).click(function() {
							currentXponder = xponder;
							fecCodeDropdown.setSelectedValue($('[id ~= fec-code ][id ~= edit ]', xponderView).text());
							fecCodeDropdown.show();
							$('[id ~= dropdown-content ]', fecCodeDropdown).offset($(this).offset());
						});

						$('[id ~= decoder-type-btn ]', xponderView).click(function() {
							currentXponder = xponder;
							decoderTypeDropdown.setSelectedValue($('[id ~= decoder-type ][id ~= edit ]', xponderView).text());
							decoderTypeDropdown.show();
							$('[id ~= dropdown-content ]', decoderTypeDropdown).offset($(this).offset());
						});
					}(xponder, xponderView));
				}
			} else {	//	if we're circular

			}

			//	refresh always goes back to view mode
			$('[id ~= edit ]', self).hide();
			$('[id ~= view ]', self).show();
		}

		favoriteBtn.click(function(isFavorite) {
			webService.request('set_satellite_identity', {
				listID: satellite.listID,
				antSatID: satellite.antSatID,
				favorite: (isFavorite ? 'TRUE' : 'FALSE')
			});
		});

		regionDropdown.setButtons($('[id ~= region-btn ]', self));
		regionDropdown.click(function(value) {
			$('[id ~= region ]', self).text(value);
		});

		hemisphereDropdown.setButtons($('[id ~= hemisphere-btn ]', self));
		hemisphereDropdown.click(function(value) {
			$('[id ~= hemisphere ]', self).text(value);
		});

		lnbTypeDropdown.setButtons($('[id ~= lnb-type-btn ]', self));
		lnbTypeDropdown.click(function(value) {
			$('[id ~= lnb-type ]', self).text(value);
		});

		fecCodeDropdown.click(function(value) {
			$('[id ~= xponder-'+currentXponder.id+'] [id ~= fec-code ]', self).text(value);
		});

		decoderTypeDropdown.click(function(value) {
			$('[id ~= xponder-'+currentXponder.id+'] [id ~= decoder-type ]', self).text(value);
		});

		$('[id ~= cancel-btn]', self).click(function() {
			refresh();
		});

		$('[id ~= back-btn ]', self).click(function() {
			$(document.body).removeClass('at-info');
		});

		$('[id ~= edit-btn]', self).click(function() {
			$('[id ~= view ]', self).hide();
			$('[id ~= edit ]', self).show();
			if (satellite.antSatID.substr(0, 4) !== 'USER') {
				$('[id ~= name ]', self).toggle();
				$('[id ~= region ], [id ~= region-btn ]', self).toggle();
				$('[id ~= hemisphere ], [id ~= hemisphere-btn ]', self).toggle();
				$('[id ~= suffix ]', self).toggle();
				$('[id ~= pre-skew ]', self).toggle();
				$('[id ~= lnb-type ], [id ~= lnb-type-btn ]', self).toggle();
				$('[id ~= local-oscillator-1 ]', self).toggle();
				$('[id ~= local-oscillator-2 ]', self).toggle();
			}
		});

		$('[id ~= reset-btn]', self).click(function() {
			if (confirm('Reset '+satellite.name+'?')) {
				webService.request('reset_satellite_params', {
					antSatID: antSatID
				}, refresh);
			}
		});

		$('[id ~= save-btn]', self).click(function() {
			if (confirm('Are you sure you want to change the parameters for this satellite?')) {
				var name = $('[id ~= name ][id ~= edit ]', self).val(),
					region = $('[id ~= region][id ~= edit]', self).val(),
					suffix = $('[id ~= suffix][id ~= edit]', self).val(),
					skew = $('[id ~= pre-skew][id ~= edit]', self).val(),
					lo1 = $('[id ~= local-oscillator-1][id ~= edit]', self).val(),
					lo2 = $('[id ~= local-oscillator-2][id ~= edit]', self).val();

				webService.request('set_satellite_identity', {
					listID: satellite.listID,
					antSatID: satellite.antSatID,
					name: name,
					region: region,
					skew: skew,
					suffix: suffix,
					lo1: lo1,
					lo2: lo2
				}, function(response) {
					webService.request('set_satellite_params', {
						listID: satellite.listID,
						antSatID: satellite.antSatID,
						xponder: (function(xponderIds) {
							var xponders = [];
							for (var i = 0; i < xponderIds.length; i++) {
								var xponderId = xponderIds[i],
									xponderView = $('[id ~= xponder-'+xponderId+']');
								xponders.push({
									id: xponderId,
									freq: $('[id ~= frequency][id ~= edit]', xponderView).val(),
									symRate: $('[id ~= symbol-rate][id ~= edit]', xponderView).val(),
									fec: $('[id ~= fec-code][id ~= edit]', xponderView).text(),
									netID: $('[id ~= satellite-id][id ~= edit]', xponderView).val(),
									modType: $('[id ~= decoder-type][id ~= edit]', xponderView).text()
								});
							}
							return xponders;
						}([1, 3, 5, 7]))
					}, function(response) {
						refresh();
					});
				});
			}
		});

		$('[id ~= edit ]', self).hide();
		$('[id ~= view ]', self).show();

		return $.extend({}, self, {
			loadSatellite: function() {
				satellite = arguments[0];

				webService.request('get_satellite_params', {
					antSatID: satellite.antSatID
				}, function(response) {
					satellite = TVRO.Satellite(response);
					refresh();
				});

				$(document.body).addClass('at-info');
			}
		});
	}

	return {
		init: function() {
			menuView = MenuView('[id ~= menu-view ]');
			groupView = GroupView('[id ~= satellite-group-view ]');
			editView = EditView('[id ~= edit-satellite-group-view ]');
			singleTableView = TableView('[id ~= satellites-table-view ]');
			groupTableView = TableView('[id ~= satellites-table-popup-view ]');
			infoView = InfoView('[id ~= satellite-info-view ]');

			webService.request('get_satellite_groups', function(response) {
				$('group', response).each(function() {
					groups.push(TVRO.Group(this));
				});

				webService.request('get_autoswitch_status', function(response) {
					var name = $('satellite_group', response).text(),
						slot = $('master sat', response).text();

					service = $('service', response).text();
					enable = $('enable:eq(0)', response).text();

					$(groups).each(function() {
						if (this.name === name) {
							selectedGroup = this;
							selectedSatellite = selectedGroup['satellite'+slot]
						}
					});

					menuView.refresh();
				});
			});

			webService.request('get_satellite_list', function(response) {
				// satellites = [];
				$('satellite', response).each(function(i, satellite) {
					satellites.push(TVRO.Satellite(satellite));
				});
			});
		}
	}
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SatellitesPage();