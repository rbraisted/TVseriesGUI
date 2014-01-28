"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SatellitesPage = function() {
	var
	webService = TVRO.WebService(),

	satellites = [], // updated by TableView
	selectedSatellite = {}, // updated by MenuView
	groups = [], // ditto
	selectedGroup = {}, // ditto

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
					$('[id ~= table-row ]', groupTable).removeClass('is-installed');
					row.addClass('is-installed');
					selectedGroup = group;
					webService.request('set_autoswitch_service', {
						'satellite_group' : group.name
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
				webService.request('get_satellite_groups', function(response) {
					groups = [];
					$('group', response).each(function() {
						groups.push(TVRO.Group(this));
					});

					webService.request('get_autoswitch_status', function(response) {
						var groupName = $('satellite_group', response).text(),
							selectedSlot = $('master sat', response).text(),
							isSingle = $('satellites>*', response).filter(function() { return $(this).children().length; }).length === 1;

						for (var i = 0; i < groups.length; i++) {
							if (groups[i].name === groupName) {
								selectedGroup = groups[i];
								selectedSatellite = {
									A: selectedGroup.satelliteA,
									B: selectedGroup.satelliteB,
									C: selectedGroup.satelliteC,
									D: selectedGroup.satelliteD
								}[selectedSlot];
								groupView.loadGroup(groups[i]);
								groupTable.build(groups.length);
								groupRadio.refresh();
								groupRadio.setSelectedValue(i);
							}
						}

						modeBtn.setOn(isSingle);
						if (!singleRadio.selectedValue()) {
							singleTableView.loadRegion('All');
							singleRadio.setSelectedValue('All');
						}
						$(document.body).toggleClass('is-single', isSingle).toggleClass('is-group', !isSingle);
					});
				});
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
					$([slotAView[0], slotBView[0], slotCView[0], slotDView[0]]).removeClass('is-selected');
					self.addClass('is-selected');
					selectedSatellite = satellite;
					webService.request('select_satellite', {
						'antSatID' : satellite.antSatID
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
					'command' : 'DELETE',
					'group_name' : group.name
				});
			}
		});

		$('[id ~= edit-btn ]', self).click(function() {
			editView.loadGroup(group);
			$(document.body).setClass('is-group at-edit-satellite-group');
		});

		$('[id ~= install-btn ]', self).click(function() {
			if (confirm('Install '+group.name+'?')) {
				selectedGroup = group;
				webService.request('set_autoswitch_service', {
					'satellite_group' : group.name
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
		slotABtn = $('[id ~= slot-a-btn ]', self),
		slotBBtn = $('[id ~= slot-b-btn ]', self),
		slotCBtn = $('[id ~= slot-c-btn ]', self),
		slotDBtn = $('[id ~= slot-d-btn ]', self),
		slotBeingEdited;

		slotABtn.click(function() { slotBeingEdited = 'A'; });
		slotBBtn.click(function() { slotBeingEdited = 'B'; });
		slotCBtn.click(function() { slotBeingEdited = 'C'; });
		slotDBtn.click(function() { slotBeingEdited = 'D'; });

		$('[id ~= slot-btn ]', self).click(function() {
			groupTableView.loadRegion('All');
			$(document.body).setClass('is-group at-satellites-table');
		});

		$('[id ~= cancel-btn ]', self).click(function() {
			$(document.body).setClass('is-group at-satellite-group');
		});

		$('[id ~= save-btn ]', self).click(function() {
			var groupName = $('[id ~= name ]', self).val();
			if (confirm('Save '+groupName+'?')) {
				group.name = groupName;
				groupView.loadGroup(group);
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
				group['satellite'+slotBeingEdited] = arguments[0];
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
			webService.request('get_satellite_list', function(response) {
				satellites = [];
				$('satellite', response).each(function(i, satellite) {
					satellites.push(TVRO.Satellite(satellite));
				});

				filtered = $(satellites).filter(filter).toArray();
				sorted = filtered.slice().sort(sort);

				table.build(sorted.length);
				radio.refresh();
			});
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

			if (sortBtn.hasClass('is-ascending')) sortOrder = -1;
			else if (!sortBtn.hasClass('is-descending')) sortOrder = 1;

			$('[id ~= sort-btn ]', self).removeClass('is-ascending is-descending');
			if (sortOrder === 1) sortBtn.addClass('is-ascending');
			else if (sortOrder === -1) sortBtn.addClass('is-descending');

			if (sortBtn.hasId('name-btn')) sortProperty = 'name';
			else if (sortBtn.hasId('orbital-slot-btn')) sortProperty = 'lon';
			else if (sortBtn.hasId('region-btn')) sortProperty = 'region';
			else if (sortBtn.hasId('favorites-btn')) sortProperty = 'favorite';

			sort = function(a, b) {
				if (a[sortProperty] > b[sortProperty]) return 1 * sortOrder;
				else if (a[sortProperty] < b[sortProperty]) return -1 * sortOrder;
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
		regionDropdown = TVRO.Dropdown('[id ~= region-dropdown ]'),//$('[id ~= region-btn ]', self)),
		hemisphereDropdown = TVRO.Dropdown('[id ~= hemisphere-dropdown ]'),//$('[id ~= hemisphere-btn ]', self)),
		lnbTypeDropdown = TVRO.Dropdown('[id ~= lnb-type-dropdown ]'),//$('[id ~= lnb-type-btn ]', self)),
		fecCodeDropdown = TVRO.Dropdown('[id ~= fec-code-dropdown ]'),//$('[id ~= fec-code-btn ]', self)),
		decoderTypeDropdown = TVRO.Dropdown('[id ~= decoder-type-dropdown ]'),//$('[id ~= decoder-type-btn ]', self)),
		webService = TVRO.WebService(),
		refresh = function() {
			$('[id ~= name ]', self).text(satellite.name).val(satellite.name);
			regionDropdown.click(satellite.region);// $('[id ~= region ]', self).text(satellite.region);
			$('[id ~= orbital-slot ]', self).text(satellite.antSatID).val(satellite.antSatID);
			hemisphereDropdown.click(satellite.lon > 0 ? 'East' : 'West');// $('[id ~= hemisphere ]', self).text(satellite.lon > 0 ? 'EAST' : 'WEST');
			$('[id ~= suffix ]', self).text(satellite.suffix).val(satellite.suffix);
			$('[id ~= pre-skew ]', self).text(satellite.skew).val(satellite.skew);
			lnbTypeDropdown.click((satellite.preferredPolarity === 'R' || satellite.preferredPolarity === 'L') ? 'Linear' : 'Circular');// $('[id ~= lnb-type ]', self).text(satellite.triSatID);
			$('[id ~= local-oscillator-1 ]', self).text(satellite.lo1).val(satellite.lo1);
			$('[id ~= local-oscillator-2 ]', self).text(satellite.lo2).val(satellite.lo2);

			favoriteBtn.setOn(satellite.favorite === 'TRUE' || satellite.favorite === 'Y');

			//	TODO: check LNB mode to determine which params we should show
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
						});

						$('[id ~= decoder-type-btn ]', xponderView).click(function() {
							currentXponder = xponder;
							decoderTypeDropdown.setSelectedValue($('[id ~= decoder-type ][id ~= edit ]', xponderView).text());
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
				'antSatID' : satellite.antSatID,
				'favorite' : (isFavorite ? 'TRUE' : 'FALSE')
			});
		});

		$('[id ~= region-btn ]', self).click(function() {
			regionDropdown.show();
			$('[id ~= dropdown-content ]', regionDropdown).offset($(this).offset());
		});

		regionDropdown.click(function(value) {
			regionDropdown.hide();
			$('[id ~= region ]', self).text(value);
		});

		$('[id ~= hemisphere-btn ]', self).click(function() {
			hemisphereDropdown.show();
			$('[id ~= dropdown-content ]', hemisphereDropdown).offset($(this).offset());
		});

		hemisphereDropdown.click(function(value) {
			hemisphereDropdown.hide();
			$('[id ~= hemisphere ]', self).text(value);
		});

		$('[id ~= lnb-type-btn ]', self).click(function() {
			lnbTypeDropdown.show();
			$('[id ~= dropdown-content ]', lnbTypeDropdown).offset($(this).offset());
		});

		lnbTypeDropdown.click(function(value) {
			lnbTypeDropdown.hide();
			$('[id ~= lnb-type ]', self).text(value);
		});

		$('[id ~= fec-code-btn ]', self).click(function() {
			fecCodeDropdown.show();
			$('[id ~= dropdown-content ]', fecCodeDropdown).offset($(this).offset());
		});

		fecCodeDropdown.click(function(value) {
			fecCodeDropdown.hide();
			$('[id ~= xponder-'+currentXponder.id+'] [id ~= fec-code ]', self).text(value);
		});

		$('[id ~= decoder-type-btn ]', self).click(function() {
			decoderTypeDropdown.show();
			$('[id ~= dropdown-content ]', decoderTypeDropdown).offset($(this).offset());
		});

		decoderTypeDropdown.click(function(value) {
			decoderTypeDropdown.hide();
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
		});

		$('[id ~= reset-btn]', self).click(function() {
			if (confirm('Reset '+satellite.name+'?')) {
				webService.request('reset_satellite_params', {
					'antSatID' : antSatID
				}, function(response) {
					refresh();
				});
			}
		});

		$('[id ~= save-btn]', self).click(function() {
			if (confirm('Are you sure you want to change the parameters for this satellite?')) {
				var name = $('[id ~= name][id ~= edit]', self).val(),
					antSatID = $('[id ~= orbital-slot][id ~= edit]', self).val(),
					region = $('[id ~= region][id ~= edit]', self).val(),
					suffix = $('[id ~= suffix][id ~= edit]', self).val(),
					skew = $('[id ~= pre-skew][id ~= edit]', self).val(),
					lo1 = $('[id ~= local-oscillator-1][id ~= edit]', self).val(),
					lo2 = $('[id ~= local-oscillator-2][id ~= edit]', self).val();

				webService.request('set_satellite_identity', {
					'name' : name,
					'antSatID' : antSatID,
					'region' : region,
					'skew' : skew,
					'suffix' : suffix,
					'lo1' : lo1,
					'lo2' : lo2
				}, function(response) {
					webService.request('set_satellite_params', {
						'antSatID' : antSatID,
						'xponder' : (function(xponderIds) {
							var xponders = [];
							for (var i = 0; i < xponderIds.length; i++) {
								var xponderId = xponderIds[i],
									xponderView = $('[id ~= xponder-'+xponderId+']');
								xponders.push({
									'id' : xponderId,
									'freq' : $('[id ~= frequency][id ~= edit]', xponderView).val(),
									'symRate' : $('[id ~= symbol-rate][id ~= edit]', xponderView).val(),
									'fec' : $('[id ~= fec-code][id ~= edit]', xponderView).text(),
									'netID' : $('[id ~= satellite-id][id ~= edit]', xponderView).val(),
									'modType' : $('[id ~= decoder-type][id ~= edit]', xponderView).text()
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
					'antSatID' : satellite.antSatID
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

			menuView.refresh();
		}
	}
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SatellitesPage();