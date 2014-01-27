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
		});

		groupRadio.click(function(i) {
			groupView.loadGroup(groups[i]);
		});

		groupTable.build(function(i, row) {
			row.attr('value', i);
			$('[id ~= name ]', row).text(groups[i].name);
		});

		$('[id ~= new-btn ]', self).click(function() {

		});

		return $.extend({}, self, {
			refresh: function() {
				webService.request('get_satellite_groups', function(response) {
					groups = [];
					$('group', response).each(function() {
						groups.push(TVRO.Group(this));
					});

					groupTable.build(groups.length);
					groupRadio.refresh();

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
								groupRadio.click(i);
							}
						}

						modeBtn.setOn(isSingle);
						if (!singleRadio.selectedValue()) singleRadio.click('All');
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
			$(document.body).setClass('???');
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
		favoriteBtn = TVRO.Toggle('[id ~= favorite-btn ]', self),
		regionDropdown = TVRO.Dropdown('[id ~= region-dropdown ]', $('[id ~= region-btn ]', self)),
		hemisphereDropdown = TVRO.Dropdown('[id ~= hemisphere-dropdown ]', $('[id ~= hemisphere-btn ]', self)),
		lnbTypeDropdown = TVRO.Dropdown('[id ~= lnb-type-dropdown ]', $('[id ~= lnb-type-btn ]', self)),
		currentXponder,
		fecCodeDropdown = TVRO.Dropdown('[id ~= fec-code-dropdown ]', $('[id ~= fec-code-btn ]', self)),
		decoderTypeDropdown = TVRO.Dropdown('[id ~= decoder-type-dropdown ]', $('[id ~= decoder-type-btn ]', self)),
		webService = TVRO.WebService(),
		satellite,
		refresh = function() {
			$('[id ~= name ]', self).text(satellite.name).val(satellite.name);
			$('[id ~= region ]', self).text(satellite.region);
			$('[id ~= orbital-slot ]', self).text(satellite.antSatID).val(satellite.antSatID);
			$('[id ~= hemisphere ]', self).text(satellite.name);
			$('[id ~= suffix ]', self).text(satellite.suffix).val(satellite.suffix);
			$('[id ~= pre-skew ]', self).text(satellite.skew).val(satellite.skew);
			$('[id ~= lnb-type ]', self).text(satellite.triSatID);
			$('[id ~= local-oscillator-1 ]', self).text(satellite.lo1).val(satellite.lo1);
			$('[id ~= local-oscillator-2 ]', self).text(satellite.lo2).val(satellite.lo2);

			favoriteBtn.setOn(satellite.favorite === 'TRUE');

			//	TODO: check LNB mode to determine which params we should show
			$('[id ~= circular ]', self).hide();
			$('[id ~= linear ]', self).show();

			if (true) {	//	if we're linear
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
							console.log($('[id ~= fec-code ]', xponderView).text());
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

		favoriteBtn.init();
		favoriteBtn.click(function(isFavorite) {
			webService.request('set_satellite_identity', {
				'antSatID' : satellite.antSatID,
				'favorite' : (isFavorite ? 'TRUE' : 'FALSE')
			});
		});

		regionDropdown.optionSelected(function(name, value) {
			$('[id ~= region ]', self).text(value);
		});

		hemisphereDropdown.optionSelected(function(name, value) {
			$('[id ~= hemisphere ]', self).text(value);
		});

		lnbTypeDropdown.optionSelected(function(name, value) {
			$('[id ~= lnb-type ]', self).text(value);
		});

		fecCodeDropdown.optionSelected(function(name, value) {
			$('[id ~= xponder-'+currentXponder.id+'] [id ~= fec-code ]', self).text(value);
		});

		decoderTypeDropdown.optionSelected(function(name, value) {
			$('[id ~= xponder-'+currentXponder.id+'] [id ~= decoder-type ]', self).text(value);
		});

		$('[id ~= back-btn]', self).click(function() {
			$(document.body).get(0).className = $(document.body).get(0).className.replace('-info', '');
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
			if (confirm('Save '+satellite.name+'?')) {
				var name = $('[id ~= name][id ~= edit]', self).val(),
					antSatID = $('[id ~= orbital-slot][id ~= edit]', self).val(),
					region = $('[id ~= region][id ~= edit]', self).val(),
					suffix = $('[id ~= suffix][id ~= edit]', self).val(),
					skew = $('[id ~= pre-skew][id ~= edit]', self).val(),
					lo1 = $('[id ~= local-oscillator-1][id ~= edit]', self).val(),
					lo2 = $('[id ~= local-oscillator-2][id ~= edit]', self).val();

					//	hemisphere
					//	lnb

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
/*1
TVRO.SatellitesPage = function() {
	var self = {},
		menuView,
		detailsView,
		singleView,
		webService = TVRO.WebService();

	var radioTable;

	self.init = function() {
		menuView = $('[id ~= menu-view ]');
		detailsView = $('[id ~= details-view ]', menuView);
		singleView = $('[id ~= single-view ]', menuView);

		var satelliteGroupView = TVRO.SatellitesPage.SatelliteGroupView();
		satelliteGroupView.init();

		var satelitesTableView = TVRO.SatellitesPage.SatellitesTableView('[id ~= satellites-table-view ]');
		satelitesTableView.init();

		var satelliteInfoView = TVRO.SatellitesPage.SatelliteInfoView();
		satelliteInfoView.init();

		var radio = TVRO.Radio(singleView);
		radio.init();
		radio.click(function(value) {
			satelitesTableView.loadRegion(value);
		});
		radio.click('');

		var toggleBtn = TVRO.Toggle('[id ~= mode-btn ]', menuView);
		toggleBtn.init();
		toggleBtn.click(function(isSingle) {
			if (isSingle) {
				$(document.body).setClass('is-single at-splash');
			} else {
				$(document.body).setClass('is-group at-splash');
			}
		});

		radioTable = TVRO.RadioTable('[id ~= group-view ]');
		radioTable.init();
		radioTable.click(function(value) {
			satelliteGroupView.loadGroup(value);
		});

		$('[id ~= new-btn ]', singleView).click(function() {
			//	need to make a special case for new sats -
			//	need empty sat case in TVRO.Satellite ?
			satelliteInfoView.loadSatellite(TVRO.Satellite('<satellite><listID></listID><suffix></suffix><skew></skew><antSatID></antSatID><triSatID>FALSE</triSatID><name>New Satellite</name><region></region><lon>0.0</lon><favorite>FALSE</favorite><enabled>TRUE</enabled><select>TRUE</select></satellite>'));
			$(document.body).setClass('is-single at-satellites-table-info');
		});

		self.refresh();
	}

	self.refresh = function() {
		webService.request('antenna_status', function(response) {
			$('[id ~= name ]', detailsView).text($('satellite name', response).text());
			$('[id ~= region ]', detailsView).text($('satellite region', response).text());
			$('[id ~= status ]', detailsView).text($('antenna state', response).text());
			$('[id ~= signal ]', detailsView).removeClass('is-0 is-1 is-2 is-3 is-4 is-5');
			$('[id ~= signal ]', detailsView).addClass('is-'+$('antenna rf bars', response).text());
		});

		webService.request('get_satellite_groups', function(response) {
			var groupNames = $('group_name', response).map(function() { return $(this).text(); });
			radioTable.setData(groupNames);
		});

		webService.request('get_autoswitch_status', function(response) {
			//	check the number of satellites in the installed satellite group
			var groupName = $('satellite_group', response).text(),
				isSingle = $('satellites>*', response).map(function() {
								if ($(this).children().length) return this;
								else return null;
							}).length == 1,
				isGroup = !isSingle;

			$('[id ~= mode-btn ]', menuView).toggleClass('is-on', isSingle);
			$(document.body).toggleClass('is-single', isSingle);
			$(document.body).toggleClass('is-group', isGroup);
			radioTable.click(groupName);
		});
	}

	return self;
}
1*/
/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/
/*1
TVRO.SatellitesPage.SatelliteInfoView = function() {
	var self = {};
	if (!TVRO.SatellitesPage.SatelliteInfoView.instance) {
		TVRO.SatellitesPage.SatelliteInfoView.instance = self;
	} else return TVRO.SatellitesPage.SatelliteInfoView.instance;

	var view = $('[id ~= satellite-info-view ]'),
		favoriteBtn = TVRO.Toggle('[id ~= favorite-btn ]', view),
		regionDropdown = TVRO.Dropdown('[id ~= region-dropdown ]', $('[id ~= region-btn ]', view)),
		hemisphereDropdown = TVRO.Dropdown('[id ~= hemisphere-dropdown ]', $('[id ~= hemisphere-btn ]', view)),
		lnbTypeDropdown = TVRO.Dropdown('[id ~= lnb-type-dropdown ]', $('[id ~= lnb-type-btn ]', view)),
		currentXponder,
		fecCodeDropdown = TVRO.Dropdown('[id ~= fec-code-dropdown ]', $('[id ~= fec-code-btn ]', view)),
		decoderTypeDropdown = TVRO.Dropdown('[id ~= decoder-type-dropdown ]', $('[id ~= decoder-type-btn ]', view)),
		webService = TVRO.WebService(),
		satellite;

	self.init = function() {
		if (self.init.inited) return;

		favoriteBtn.init();
		favoriteBtn.click(function(isFavorite) {
			webService.request('set_satellite_identity', {
				'antSatID' : satellite.antSatID,
				'favorite' : (isFavorite ? 'TRUE' : 'FALSE')
			});
		});

		regionDropdown.optionSelected(function(name, value) {
			$('[id ~= region ]', view).text(value);
		});

		hemisphereDropdown.optionSelected(function(name, value) {
			$('[id ~= hemisphere ]', view).text(value);
		});

		lnbTypeDropdown.optionSelected(function(name, value) {
			$('[id ~= lnb-type ]', view).text(value);
		});

		fecCodeDropdown.optionSelected(function(name, value) {
			$('[id ~= xponder-'+currentXponder.id+'] [id ~= fec-code ]', view).text(value);
		});

		decoderTypeDropdown.optionSelected(function(name, value) {
			$('[id ~= xponder-'+currentXponder.id+'] [id ~= decoder-type ]', view).text(value);
		});

		$('[id ~= back-btn]', view).click(function() {
			$(document.body).get(0).className = $(document.body).get(0).className.replace('-info', '');
		});

		$('[id ~= cancel-btn]', view).click(function() {
			self.refresh();
		});

		$('[id ~= edit-btn]', view).click(function() {
			$('[id ~= view ]', view).hide();
			$('[id ~= edit ]', view).show();
		});

		$('[id ~= reset-btn]', view).click(function() {
			webService.request('reset_satellite_params', {
				'antSatID' : antSatID
			}, function(response) {
				self.refresh();
			});
		});

		$('[id ~= save-btn]', view).click(function() {
			var name = $('[id ~= name][id ~= edit]', view).val(),
				antSatID = $('[id ~= orbital-slot][id ~= edit]', view).val(),
				region = $('[id ~= region][id ~= edit]', view).val(),
				suffix = $('[id ~= suffix][id ~= edit]', view).val(),
				skew = $('[id ~= pre-skew][id ~= edit]', view).val(),
				lo1 = $('[id ~= local-oscillator-1][id ~= edit]', view).val(),
				lo2 = $('[id ~= local-oscillator-2][id ~= edit]', view).val();

				//	hemisphere
				//	lnb

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
					self.refresh();
				});
			});
		});

		$('[id ~= edit ]', view).hide();
		$('[id ~= view ]', view).show();

		self.init.inited = true;
	}

	self.refresh = function() {
		$('[id ~= name ]', view).text(satellite.name).val(satellite.name);
		$('[id ~= region ]', view).text(satellite.region);
		$('[id ~= orbital-slot ]', view).text(satellite.antSatID).val(satellite.antSatID);
		$('[id ~= hemisphere ]', view).text(satellite.name);
		$('[id ~= suffix ]', view).text(satellite.suffix).val(satellite.suffix);
		$('[id ~= pre-skew ]', view).text(satellite.skew).val(satellite.skew);
		$('[id ~= lnb-type ]', view).text(satellite.triSatID);
		$('[id ~= local-oscillator-1 ]', view).text(satellite.lo1).val(satellite.lo1);
		$('[id ~= local-oscillator-2 ]', view).text(satellite.lo2).val(satellite.lo2);

		favoriteBtn.setOn(satellite.favorite === 'TRUE');

		//	TODO: check LNB mode to determine which params we should show
		$('[id ~= circular ]', view).hide();
		$('[id ~= linear ]', view).show();

		if (true) {	//	if we're linear
			var xponderIds = [1, 3, 5, 7];
			for (var i = 0; i < xponderIds.length; i++) {
				var xponderId = xponderIds[i],
					xponderView = $('[id ~= xponder-'+xponderId+' ]', view),
					xponder = satellite.xponders[xponderId];

				$('[id ~= frequency ]', xponderView).text(xponder.freq).val(xponder.freq);
				$('[id ~= symbol-rate ]', xponderView).text(xponder.symRate).val(xponder.symRate);
				$('[id ~= fec-code ]', xponderView).text(xponder.fec);
				$('[id ~= satellite-id ]', xponderView).text(xponder.netID).val(xponder.netID);
				$('[id ~= decoder-type ]', xponderView).text(xponder.modType);

				(function(xponder, xponderView) {
					$('[id ~= fec-code-btn ]', xponderView).click(function() {
						currentXponder = xponder;
						console.log($('[id ~= fec-code ]', xponderView).text());
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
		$('[id ~= edit ]', view).hide();
		$('[id ~= view ]', view).show();
	}

	self.loadSatellite = function(antSatID) {
		satellite = arguments[0];
		//	get the satellite params
		webService.request('get_satellite_params', {
			'antSatID' : satellite.antSatID
		}, function(response) {
			satellite = TVRO.Satellite(response);
			self.refresh();
		});
	}

	return self;
}
1*/
/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/
/*1
TVRO.SatellitesPage.EditSatelliteGroupView = function() {
	var self = {},
		view = $('[id ~= edit-satellite-group-view ]'),
		satellites = [],
		currentSlot,
		webService = TVRO.WebService();

	self.init = function() {
		var satellitesTableView = TVRO.SatellitesPage.SatellitesTableView('[id ~= satellites-table-popup-view ]');
		satellitesTableView.popup = true;
		satellitesTableView.onSatelliteSelected = function(name, value) {
			var slotView = $('[id ~= slot-'+currentSlot+'-btn ]', view);
			$('[id ~= name ]', slotView).text(name);
			$(slotView).attr('value', value);
			$(document.body).setClass('is-group at-edit-satellite-group');
		}
		satellitesTableView.init();

		$('[id ~= slot-btn ]', view).click(function() {
			if ($(this).hasId('slot-a-btn')) currentSlot = 'a';
			else if ($(this).hasId('slot-b-btn')) currentSlot = 'b';
			else if ($(this).hasId('slot-c-btn')) currentSlot = 'c';
			else if ($(this).hasId('slot-d-btn')) currentSlot = 'd';

			var antSatID = this.getAttribute('value'),
				satellite = $(satellites).filter(function(index) {
					return this.antSatID === antSatID;
				}).get(0);

			satellitesTableView.loadRegion('');
			$(document.body).setClass('is-group at-satellites-table');
		});

		$('[id ~= cancel-btn ]', view).click(function() {
			$(document.body).setClass('is-group at-satellite-group');
		});

		$('[id ~= save-btn ]', view).click(function() {
			//	each slot will have the antSatID of the satellite it holds
			var slots = ['a', 'b', 'c', 'd'];
			webService.request('set_satellite_group', {

			});

			$(document.body).setClass('is-group at-satellite-group');
		});
	}

	self.loadGroup = function(groupName) {
		$('[id ~= name ]', view).val(groupName);

		satellites = [];
		webService.request('get_satellite_groups', function(response) {
			var group = $('group', response).filter(function() { return $('group_name', this).text() === groupName; });
			var slots = ['a', 'b', 'c', 'd'];
			for (var i = 0; i < slots.length; i++) {
				var slot = slots[i],
					satellite = $(slot.toUpperCase(), group),
					slotBtn = $('[id ~= slot-'+slot+'-btn ]', view);

				satellites.push(TVRO.Satellite(satellite));
				$('[id ~= name ]', slotBtn).text($('name', satellite).text());
				slotBtn.attr('value', $('antSatID', satellite).text());
			}
		});
	}

	return self;
}
1*/
/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/
/*1
TVRO.SatellitesPage.SatelliteGroupView = function() {
	var self = {},
		view = $('[id ~= satellite-group-view ]'),
		editSatelliteGroupView = TVRO.SatellitesPage.EditSatelliteGroupView(),
		satellites = [],
		webService = TVRO.WebService(),
		satelliteInfoView = TVRO.SatellitesPage.SatelliteInfoView();

	self.init = function() {
		satelliteInfoView.init();
		editSatelliteGroupView.init();

		var slots = ['a', 'b', 'c', 'd'];
		for (var i = 0; i < slots.length; i++) {
			var slot = slots[i],
				slotView = $('[id ~= slot-'+slot+'-view ]'),
				selectBtn = TVRO.Toggle('[id ~= select-btn ]', slotView);

			selectBtn.init();
			selectBtn.click(function(isSelected) {
				$('[id ~= slot-view ]', view).removeClass('is-selected');
				$('[id ~= slot-view ]', view).has(this).addClass('is-selected');
				$('[id ~= select-btn ]', view).removeClass('is-on');
				$(this).addClass('is-on');
				webService.request('select_satellite', {
					'antSatID' : this.getAttribute('value')
				});
			});

			$('[id ~= info-btn ]', slotView).click(function() {
				var antSatID = this.getAttribute('value'),
					satellite = $(satellites).filter(function(index) {
						return this.antSatID === antSatID;
					}).get(0);

				//	show info view with this satellite
				$(document.body).setClass('is-group at-satellite-group-info');
				satelliteInfoView.loadSatellite(satellite);
			});
		}

		$('[id ~= delete-btn ]', view).click(function() {
			webService.request('set_satellite_group', {
				'command' : 'DELETE',
				'group_name' : this.getAttribute('value')
			});
		});

		$('[id ~= edit-btn ]', view).click(function() {
			//	go to info view
			editSatelliteGroupView.loadGroup(this.getAttribute('value'));
			$(document.body).setClass('is-group at-edit-satellite-group');
		});

		$('[id ~= install-btn ]', view).click(function() {
			webService.request('set_autoswitch_service', {
				'satellite_group' : this.getAttribute('value')
			});
		});
	}

	self.loadGroup = function(value) {
		$('[id ~= name ]', view).text(value);
		$('[id ~= slot-view ]', view).removeClass('is-selected');
		$('[id ~= select-btn ]', view).removeClass('is-on');

		satellites = [];
		webService.request('get_satellite_groups', function(response) {
			var group = $('group', response).filter(function() { return $('group_name', this).text() === value; });
			var slots = ['a', 'b', 'c', 'd'];
			for (var i = 0; i < slots.length; i++) {
				var slot = slots[i],
					satellite = $(slot.toUpperCase(), group),
					slotView = $('[id ~= slot-'+slot+'-view ]');

				satellites.push(TVRO.Satellite(satellite));
				$('[id ~= name ]', slotView).text($('name', satellite).text());
				$('[id ~= select-btn ], [id ~= info-btn ]', slotView).attr('value', $('antSatID', satellite).text());
			}
			$('[id ~= delete-btn ], [id ~= edit-btn ], [id ~= install-btn ]', view).attr('value', value);
			$('[id ~= delete-btn ], [id ~= edit-btn ]', view).toggle($('predefined', group).text() === 'N');
		});

		webService.request('get_autoswitch_status', function(response) {
			var groupName = $('satellite_group', response).text();
			$('[id ~= install-btn ]', view).toggle(groupName !== value);
			if (groupName === value) {
				var slot = $('master sat', response).text().toLowerCase(),
					slotView = $('[id ~= slot-'+slot+'-view ]', view)
				slotView.addClass('is-selected');
				$('[id ~= select-btn ]', slotView).addClass('is-on');
			}
		});
	}

	return self;
}
1*/
/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/
/*1
TVRO.SatellitesPage.SatellitesTable = function(selector, context) {
	var self = TVRO.Table(selector, context),
		uber = $.extend({}, self),
		view = $(selector, context),
		data,
		sort,
		sorted,
		webService = TVRO.WebService(),
		satelliteInfoView = TVRO.SatellitesPage.SatelliteInfoView();

	self.init = function() {
		satelliteInfoView.init();

		var sortBtns = $('[id ~= sort-btn ]', view);

		sortBtns.click(function() {
			var sortBtn = $(this),
				sortOrder = 0,
				sortProperty = '';

			if (sortBtn.hasClass('is-ascending')) sortOrder = -1;
			else if (!sortBtn.hasClass('is-descending')) sortOrder = 1;

			sortBtns.removeClass('is-ascending is-descending');
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

			self.setData(data);
		});

		uber.init();
	}

	self.setData = function() {
		data = arguments[0];
		sorted = data.slice().sort(sort);

		uber.setData(sorted);

		$('[id ~= table-row ]', view).each(function(i) {
			var row = this;
			//	unexpected jquery behavior where
			//	.each index and element are correct, this value is correct,
			//	but when performing [id ~= id-name ] selector with this or element
			//	as the context, we end up getting all the [id ~= id-name ] in
			//	table-rows instead of just in the one table-row
			//	that's why we use eq() here - pretty hacky
			$('[id ~= name ]', row).eq(i).text(sorted[i].name);
			$('[id ~= orbital-slot ]', row).eq(i).text(sorted[i].antSatID);
			$('[id ~= region ]', row).eq(i*2).text(sorted[i].region);
			$('[id ~= region ]', row).eq(i*2+1).text(sorted[i].region);
			$('[id ~= select-btn ]', row).eq(i).attr('value', sorted[i].antSatID);
			$('[id ~= favorite-btn ]', row).eq(i).attr('value', sorted[i].antSatID);
			$('[id ~= info-btn ]', row).eq(i).attr('value', sorted[i].antSatID);

			var selectBtn = TVRO.Toggle('[id ~= select-btn ]:eq('+i+')', row);
			selectBtn.init();
			selectBtn.click(function(isSelected) {
				$('[id ~= table-row ]', view).removeClass('is-selected');
				$(row).addClass('is-selected');

				$('[id ~= table-row] [id ~= select-btn]', view).removeClass('is-on');
				selectBtn.setOn(true);

				webService.request('select_satellite', {
					'antSatID' : this.getAttribute('value')
				});
			});

			var favoriteBtn = TVRO.Toggle('[id ~= favorite-btn ]:eq('+i+')', row);
			favoriteBtn.init();
			favoriteBtn.setOn(sorted[i].favorite === 'TRUE');
			favoriteBtn.click(function(isFavorite) {
				webService.request('set_satellite_identity', {
					'antSatID' : this.getAttribute('value'),
					'favorite' : isFavorite
				});
			});

			$('[id ~= info-btn ]', row).eq(i).click(function() {
				var antSatID = this.getAttribute('value'),
					satellite = $(sorted).filter(function(index) {
						return this.antSatID === antSatID;
					}).get(0);

				//	show info view with this satellite
				$(document.body).get(0).className = $(document.body).get(0).className.replace('at-splash', 'at-satellites-table').replace('at-satellites-table', 'at-satellites-table-info');
				satelliteInfoView.loadSatellite(satellite);
			});
		});

		//	this should really be broken out into a
		//	table.setSelected function
		webService.request('antenna_status', function(response) {
			var antSatID = $('satellite antSatID', response).text();
			for (var i = 0; i < sorted.length; i++) {
				if (sorted[i].antSatID === antSatID) {
					var row = $('[id ~= table-row ]', view).eq(i);
					row.addClass('is-selected');
					$('[id ~= select-btn ]', row).eq(i).addClass('is-on');
					break;
				}
			}
		});
	}

	return self;
}
1*/
/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/
/*1
TVRO.SatellitesPage.SatellitesTableView = function(selector, context) {
	var self = {},
		view,
		satellitesTable,
		webService = TVRO.WebService();

	self.popup = false;

	self.init = function() {
		view = $(selector, context);
		satellitesTable = TVRO.SatellitesPage.SatellitesTable('[id ~= satellites-table ]', view);
		satellitesTable.init();
	}

	self.loadRegion = function(region) {
		webService.request('get_satellite_list', {
			'region_filter' : region
		}, function(response) {
			var satellites = [];
			$('satellite', response).each(function(index, satellite) {
				satellites.push(TVRO.Satellite(satellite));
			});
			satellitesTable.setData(satellites);
			if (self.popup && self.onSatelliteSelected) {
				$('[id ~= table-row ]', view).click(function() {
					console.log(this);
					var name = $('[id ~= name ]', this).eq(0).text();
					var value = $('[id ~= select-btn ]', this).eq(0).attr('value');
					self.onSatelliteSelected(name, value);
				});
			}
		});
	}

	return self;
}
1*/
/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SatellitesPage();