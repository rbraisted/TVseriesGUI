"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

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

		var satellitesTable = TVRO.SatellitesPage.SatellitesTable();
		satellitesTable.init();

		var radio = TVRO.Radio(singleView);
		radio.init();
		radio.click(function(value) {
			console.log(value);
			webService.request('get_satellite_list', {
				'region_filter' : value
			}, function(response) {
				var satellites = [];
				$('satellite', response).each(function(index, satellite) {
					satellites.push(TVRO.Satellite(satellite));
				});
				satellitesTable.setData(satellites);
			});
		});

		var toggleBtn = TVRO.ToggleBtn('[id ~= mode-btn ]', menuView);
		toggleBtn.init();
		toggleBtn.click(function(isSingle) {
			$(document.body).toggleClass('is-single', isSingle);
			$(document.body).toggleClass('is-group', !isSingle);
		});

		radioTable = TVRO.RadioTable('[id ~= group-view ]');
		radioTable.init();
		radioTable.click(function(value) {
			satelliteGroupView.loadGroup(value);
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

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SatellitesPage.SatelliteGroupView = function() {
	var self = {},
		view = $('[id ~= satellite-group-view ]'),
		webService = TVRO.WebService();

	self.init = function() {
		var slots = ['a', 'b', 'c', 'd'];
		for (var i = 0; i < slots.length; i++) {
			var slot = slots[i],
				slotView = $('[id ~= slot-'+slot+'-view ]');

			$('[id ~= select-btn ]', slotView).click(function() {
				webService.request('select_satellite', {
					'antSatID' : this.getAttribute('value')
				});
			});

			$('[id ~= info-btn ]', slotView).click(function() {
				var antSatID = this.getAttribute('value');
				//	show info view with this antSatID
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
		});

		$('[id ~= install-btn ]', view).click(function() {
			webService.request('set_autoswitch_service', {
				'satellite_group' : this.getAttribute('value')
			});
		});
	}

	self.loadGroup = function(value) {
		$('[id ~= name ]', view).text(value);
		$('[id ~= slot-view ]').removeClass('is-selected');
		webService.request('get_satellite_groups', function(response) {
			var group = $('group', response).filter(function() { return $('group_name', this).text() === value; });
			var slots = ['a', 'b', 'c', 'd'];
			for (var i = 0; i < slots.length; i++) {
				var slot = slots[i],
					satellite = $(slot.toUpperCase(), group),
					slotView = $('[id ~= slot-'+slot+'-view ]');
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
				var slot = $('master sat', response).text().toLowerCase();
				$('[id ~= slot-'+slot+'-view ]', view).addClass('is-selected');
			}
		});
	}

	return self;	
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SatellitesPage.SatellitesTable = function() {
	var self = {},
		view = $('[id ~= satellites-table ]'),
		template = $('[id ~= satellite-view ]', view).detach(),
		satellites = [],
		sorted = [],
		sort,
		callbacks = [],
		webService = TVRO.WebService();

	self.init = function() {
		var sortBtns = $('[id ~= sort-btn ]', view);
		sortBtns.click(function() {
			var sortBtn = $(this),
				ascending = false,
				descending = false;

			if (sortBtn.hasClass('is-ascending')) descending = true;
			else if (!sortBtn.hasClass('is-descending')) ascending = true;
			sortBtns.removeClass('is-ascending is-descending');
			sortBtn.toggleClass('is-ascending', ascending);
			sortBtn.toggleClass('is-descending', descending);

			if (ascending || descending) {
				var x = (ascending ? 1 : -1),
					property;

				if (sortBtn.hasId('name-btn')) property = 'name';
				else if (sortBtn.hasId('orbital-slot-btn')) property = 'lon';
				else if (sortBtn.hasId('region-btn')) property = 'region';
				else if (sortBtn.hasId('favorites-btn')) property = 'favorite';

				sort = function(a, b) {
					if (a[property] > b[property]) return 1 * x;
					else if (a[property] < b[property]) return -1 * x;
					else return 0;
				}
			} else {
				sort = undefined;
			}

			self.refresh();
		});
	}

	self.setData = function(data) {
		satellites = data;
		self.refresh();
	}

	self.refresh = function() {
		sorted = satellites.slice().sort(sort);

		$('tbody', view).empty();

		var rows = [];
		for (var i = 0; i < sorted.length; i++) {
			var satellite = sorted[i],
				row = template.clone();
			$('[id ~= name ]', row).text(satellite.name);
			$('[id ~= orbital-slot ]', row).text(satellite.antSatID);
			$('[id ~= region ]', row).text(satellite.region);
			row.toggleClass('is-favorite', satellite.favorite === 'TRUE');
			rows.push(row);
		}
		$('tbody', view).append(rows);

		webService.request('antenna_status', function(response) {
			var antSatID = $('satellite antSatID', response).text(),
				row = undefined;
			for (var i = 0; i < sorted.length; i++) {
				var satellite = sorted[i];
				if (satellite.antSatID === antSatID) {
					row = rows[i];
					break;
				}
			}
			$(row).addClass('is-selected');
		});
	}

	self.click = function(callback) {
		if (typeof callback === 'function') {
			callbacks.push(callback);
		}
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SatellitesPage();

// TVRO.SatelliteDetails = function(satelliteDetails) {
// 	var self = {},
// 		satellite,
// 		webService = new TVRO.WebService(),
// 		satelliteDetails = $(satelliteDetails),
// 		regionDropdown = new TVRO.Dropdown('[id ~= region-dropdown]', '[id ~= region-btn]'),
// 		polarizationDropdown = new TVRO.Dropdown('[id ~= polarization-dropdown]', '[id ~= polarization-btn]'),
// 		fecCodeDropdown = new TVRO.Dropdown('[id ~= fec-code-dropdown]', '[id ~= fec-code-btn]'),
// 		decoderTypeDropdown = new TVRO.Dropdown('[id ~= decoder-type-dropdown]', '[id ~= decoder-type-btn]');

// 	regionDropdown.optionSelected(function(name, value) {
// 		$('[id ~= region][id ~= edit]', satelliteDetails).text(value);
// 	});

// 	(function(xponderIds) {
// 		var xponder;
// 		for (var i = 0; i < xponderIds.length; i++) {
// 			(function(xponderId) {
// 				var xponderDetails = $('[id ~= xponder-'+xponderId+']');
// 				$('[id ~= polarization-btn]', xponderDetails).click(function() {
// 					xponder = satellite.xponders[xponderId];
// 					polarizationDropdown.selectValue(xponder.pol);
// 					polarizationDropdown.show();
// 				});

// 				$('[id ~= fec-code-btn]', xponderDetails).click(function() {
// 					xponder = satellite.xponders[xponderId];
// 					fecCodeDropdown.selectValue(xponder.fec);
// 					fecCodeDropdown.show();
// 				});

// 				$('[id ~= decoder-type-btn]', xponderDetails).click(function() {
// 					xponder = satellite.xponders[xponderId];
// 					decoderTypeDropdown.selectValue(xponder.modType);
// 					decoderTypeDropdown.show();
// 				});
// 			}(xponderIds[i]));
// 		};

// 		polarizationDropdown.optionSelected(function(name, value) {
// 			$('[id ~= xponder-'+xponder.id+'] [id ~= polarization][id ~= edit]', satelliteDetails).text(value);
// 		});

// 		fecCodeDropdown.optionSelected(function(name, value) {
// 			$('[id ~= xponder-'+xponder.id+'] [id ~= fec-code][id ~= edit]', satelliteDetails).text(value);
// 		});

// 		decoderTypeDropdown.optionSelected(function(name, value) {
// 			$('[id ~= xponder-'+xponder.id+'] [id ~= decoder-type][id ~= edit]', satelliteDetails).text(value);
// 		});
// 	}([1, 3, 5, 7]));

// 	self.reload = function() {
// 		$('[id ~= name]', satelliteDetails).text(satellite.name).val(satellite.name);
// 		$('[id ~= region]', satelliteDetails).text(satellite.region).val(satellite.region);
// 		regionDropdown.selectValue(satellite.region);
// 		$('[id ~= orbital-slot]', satelliteDetails).text(satellite.antSatID).val(satellite.antSatID);
// 		//	not sure where to get hemisphere from,
// 		//	using satellite name for now
// 		$('[id ~= hemisphere]', satelliteDetails).text(satellite.name).val(satellite.name);
// 		$('[id ~= sat-id]', satelliteDetails).text(satellite.listID).val(satellite.listID);
// 		$('[id ~= pre-skew]', satelliteDetails).text(satellite.skew).val(satellite.skew);
// 		$('[id ~= tri-sat-id]', satelliteDetails).text(satellite.triSatID).val(satellite.triSatID);
// 		$('[id ~= local-oscillator-1]', satelliteDetails).text(satellite.lo1).val(satellite.lo1);
// 		$('[id ~= local-oscillator-2]', satelliteDetails).text(satellite.lo2).val(satellite.lo2);

// 		$('[id ~= enable-btn]', satelliteDetails).toggleClass('on', satellite.enabled === 'TRUE');
// 		$('[id ~= favorite-btn]', satelliteDetails).toggleClass('on', satellite.favorite === 'TRUE');

// 		var xponders = satellite.xponders;
// 		for (var xponderId in xponders) {
// 			var xponder = xponders[xponderId],
// 				xponderDetails = $('[id ~= xponder-'+xponderId+']', satelliteDetails);

// 			//	values for polarization in html are incorrect
// 			//	TODO: fix that
// 			$('[id ~= polarization]', xponderDetails).text(xponder.pol).val(xponder.pol);
// 			$('[id ~= frequency]', xponderDetails).text(xponder.freq).val(xponder.freq);
// 			$('[id ~= symbol-rate]', xponderDetails).text(xponder.symRate).val(xponder.symRate);
// 			$('[id ~= fec-code]', xponderDetails).text(xponder.fec).val(xponder.fec);
// 			$('[id ~= network-id]', xponderDetails).text(xponder.netID).val(xponder.netID);
// 			$('[id ~= decoder-type]', xponderDetails).text(xponder.modType).val(xponder.modType);
// 		};
// 	};

// 	self.setSatellite = function() {
// 		satellite = arguments[0];
// 		self.reload();
// 	};

// 	$('[id ~= favorite-btn]', satelliteDetails).click(function() {
// 		var favorite = (satellite.favorite === 'TRUE' ? 'FALSE' : 'TRUE');
// 		webService.request('set_satellite_identity', {
// 			'listID' : satellite.listID,
// 			'favorite' : favorite
// 		}, function(response) {
// 			satellite.favorite = favorite;
// 			$('[id ~= favorite-btn]', satelliteDetails).toggleClass('on', favorite === 'TRUE');
// 		});
// 	});

// 	$('[id ~= enable-btn]', satelliteDetails).click(function() {
// 		var enabled = (satellite.enabled === 'TRUE' ? 'FALSE' : 'TRUE');
// 		webService.request('set_satellite_identity', {
// 			'listID' : satellite.listID,
// 			'enabled' : enabled
// 		}, function(response) {
// 			satellite.enabled = enabled;
// 			$('[id ~= enable-btn]', satelliteDetails).toggleClass('on', enabled === 'TRUE');
// 		});
// 	});

// 	$('[id ~= save-btn]', satelliteDetails).click(function() {
// 		var name = $('[id ~= name][id ~= edit]', satelliteDetails).val(),
// 			listID = $('[id ~= sat-id][id ~= edit]', satelliteDetails).val(),
// 			antSatID = $('[id ~= orbital-slot][id ~= edit]', satelliteDetails).val(),
// 			region = $('[id ~= region][id ~= edit]', satelliteDetails).val(),
// 			skew = $('[id ~= pre-skew][id ~= edit]', satelliteDetails).val(),
// 			triSatID = $('[id ~= tri-sat-id][id ~= edit]', satelliteDetails).val(),
// 			lo1 = $('[id ~= local-oscillator-1][id ~= edit]', satelliteDetails).val(),
// 			lo2 = $('[id ~= local-oscillator-2][id ~= edit]', satelliteDetails).val();

// 		webService.request('set_satellite_identity', {
// 			'name' : name,
// 			'listID' : listID,
// 			'antSatID' : antSatID,
// 			'region' : region,
// 			'skew' : skew,
// 			'triSatID' : triSatID,
// 			'lo1' : lo1,
// 			'lo2' : lo2
// 		}, function(response) {
// 			webService.request('set_satellite_params', {
// 				'listID' : listID,
// 				'xponder' : (function(xponderIds) {
// 					var xponders = [];
// 					for (var i = 0; i < xponderIds.length; i++) {
// 						var xponderId = xponderIds[i],
// 							xponderDetails = $('[id ~= xponder-'+xponderId+']');
// 						xponders.push({
// 							'id' : xponderId,
// 							'pol' : $('[id ~= polarization][id ~= edit]', xponderDetails).text(),
// 							'freq' : $('[id ~= frequency][id ~= edit]', xponderDetails).val(),
// 							'symRate' : $('[id ~= symbol-rate][id ~= edit]', xponderDetails).val(),
// 							'fec' : $('[id ~= fec-code][id ~= edit]', xponderDetails).text(),
// 							'netID' : $('[id ~= network-id][id ~= edit]', xponderDetails).val(),
// 							'modType' : $('[id ~= decoder-type][id ~= edit]', xponderDetails).text()
// 						});
// 					}
// 					return xponders;
// 				}([1, 3, 5, 7]))
// 			}, function(response) {
// 				self.showView();
// 			});
// 		});
// 	});

// 	$('[id ~= cancel-btn]', satelliteDetails).click(function() {
// 		self.showView();
// 		self.reload();
// 	});

// 	$('[id ~= edit-btn]', satelliteDetails).click(function() {
// 		self.showEdit();
// 	});

// 	$('[id ~= select-btn]', satelliteDetails).click(function() {
// 		webService.request('select_satellite', {
// 			'listID' : satellite.listID,
//     		'polarization' : '',	//	not set up yet on box
//     		'band' : ''	//	not set up yet on box
// 		}, function(response) {

// 		});
// 	});

// 	self.show = function() {
// 		satelliteDetails.show();
// 	};

// 	self.hide = function() {
// 		satelliteDetails.hide();
// 	};

// 	self.showEdit = function() {
// 		$('[id ~= view]', satelliteDetails).hide();
// 		$('[id ~= edit]', satelliteDetails).show();
// 	};

// 	self.showView = function() {
// 		$('[id ~= edit]', satelliteDetails).hide();
// 		$('[id ~= view]', satelliteDetails).show();
// 	};

// 	self.showView();

// 	return self;
// };

// TVRO.SatellitesTable = function(table) {
// 	var self = {},
// 		table = $(table),
// 		rowTemplate = $('[id ~= table-row]', table),
// 		satellites = [],
// 		sortedSatellites = [],
// 		//	store row clicked callbacks
// 		//	use like so:
// 		//	table.rowClicked(function(row, satellite) {
// 		//		do stuff with the row/satellite
// 		//	});
// 		rowClicked = [];

// 	//	remove the row template from the dom
// 	//	we'll clone it to build out the take later
// 	rowTemplate.detach();

// 	//	redraw the table -
// 	self.reload = function() {
// 		$('[id ~= table-row]', table).remove();
// 		for (var i = 0; i < sortedSatellites.length; i++) {
// 			var satellite = sortedSatellites[i],
// 				row = rowTemplate.clone();

// 			$('[id ~= name]', row).text(satellite.name);
// 			$('[id ~= orbital-slot]', row).text(satellite.antSatID);
// 			$('[id ~= region]', row).text(satellite.region);
// 			row.toggleClass('favorite', satellite.favorite === 'TRUE');
// 			table.append(row);

// 			(function(row, satellite) {
// 				row.click(function() {
// 					for (var i = 0; i < rowClicked.length; i++) {
// 						rowClicked[i](row, satellite);
// 					}
// 				});
// 			}(row, satellite));
// 		}
// 	};

// 	self.setSatellites = function() {
// 		satellites = arguments[0];
// 		sortedSatellites = satellites.slice();
// 		self.reload();
// 	};

// 	self.rowClicked = function() {
// 		if (typeof arguments[0] === 'function') {
// 			rowClicked.push(arguments[0]);
// 		}
// 	};

// 	$('[id ~= sort-btn]', table).click(function() {
// 		var sortBtn = $(this),
// 			property,
// 			ascending = false,
// 			descending = false;

// 		if (sortBtn.hasId('name-sort-btn')) property = 'name';
// 		else if (sortBtn.hasId('orbital-slot-sort-btn')) property = 'lon';
// 		else if (sortBtn.hasId('region-sort-btn')) property = 'region';

// 		if (sortBtn.hasClass('ascending')) descending = true;
// 		else if (!sortBtn.hasClass('descending')) ascending = true;

// 		$('[id ~= sort-btn]', table).removeClass('ascending descending');
// 		sortBtn.toggleClass('ascending', ascending);
// 		sortBtn.toggleClass('descending', descending);

// 		sortedSatellites = satellites.slice();

// 		//	if we're doing a sort
// 		if (ascending || descending) {
// 			var x = (ascending ? 1 : -1);
// 			sortedSatellites.sort(function(a, b) {
// 				if (a[property] > b[property]) return 1 * x;
// 				else if (a[property] < b[property]) return -1 * x;
// 				else return 0;
// 			});
// 		}

// 		self.reload();
// 	});

// 	self.show = function() {
// 		table.show();
// 	};

// 	self.hide = function() {
// 		table.hide();
// 	};

// 	return self;
// };

// TVRO.SatellitesPage = function() {
// 	var self = {},
// 		webService = new TVRO.WebService();

// 	self.init = function() {
// 		$('#satellites-btn').toggleClass('selected', true);

// 		var satelliteDetails = new TVRO.SatelliteDetails('[id ~= satellite-details]');

// 		var satellitesTable = new TVRO.SatellitesTable('[id ~= satellites-table]');
// 		satellitesTable.rowClicked(function(row, satellite) {
// 			webService.request('get_satellite_params', {
// 				'listID' : satellite.listID
// 			}, function(response) {
// 				var satellite = new TVRO.Satellite(response);
// 				satelliteDetails.setSatellite(satellite);
// 				satelliteDetails.show();
// 				satellitesTable.hide();
// 			});
// 		});

// 		satelliteDetails.hide();
// 		satellitesTable.hide();

// 		$('[id ~= add-btn]', '#sb').click(function() {
// 			var satellite = new TVRO.Satellite();
// 			satellite.name = 'New Satellite';
// 			satelliteDetails.setSatellite(satellite);
// 			satelliteDetails.show();
// 			satellitesTable.hide();
// 		});

// 		$('[id ~= filter-btn]', '#sb').click(function() {
// 			console.log("filter-btn clicked");
// 			var filterBtn = $(this),
// 				regionFilter = '',
// 				userChoiceFilter = '';

// 			if (filterBtn.hasId('enabled-btn')) userChoiceFilter = 'enable';
// 			else if (filterBtn.hasId('favorite-btn')) userChoiceFilter = 'favorite';
// 			else if (filterBtn.hasId('africa-btn')) regionFilter = 'Africa';
// 			else if (filterBtn.hasId('asia-btn')) regionFilter = 'Asia';
// 			else if (filterBtn.hasId('australia-btn')) regionFilter = 'Australia';
// 			else if (filterBtn.hasId('central-and-south-america-btn')) regionFilter = 'Central/South America';
// 			else if (filterBtn.hasId('north-america-btn')) regionFilter = 'North America';

// 			$('[id ~= filter-btn]', '#sb').removeClass('selected');
// 			filterBtn.toggleClass('selected', true);

// 			$('#sb, #satellite-details').removeClass('active');
// 			$('#satellites-table').toggleClass('active', true);

// 			satellitesTable.show();
// 			satelliteDetails.hide();

// 			webService.request('get_satellite_list', {
// 				'region_filter' : regionFilter,
// 				'user_choice_filter' : userChoiceFilter
// 			}, function(response) {
// 				var satellites = [];
// 				$('satellite', response).each(function(index, satellite) {
// 					satellites.push(new TVRO.Satellite(satellite));
// 				});
// 				satellitesTable.setSatellites(satellites);
// 				satellitesTable.show();
// 				satelliteDetails.hide();
// 			});
// 		});

// 		$('[id ~= back-btn]', '[id ~= satellites-table]').click(function() {
// 			$('#satellites-table, #satellite-details').removeClass('active');
// 			$('#sb').toggleClass('active', true);
// 			satellitesTable.hide();
// 			satelliteDetails.hide();
// 		});

// 		$('[id ~= back-btn]', '[id ~= satellite-details]').click(function() {
// 			$('#sb, #satellite-details').removeClass('active');
// 			$('#satellites-table').toggleClass('active', true);
// 			satellitesTable.show();
// 			satelliteDetails.hide();
// 		});
// 	};

// 	return self;
// };

// TVRO.page = new TVRO.SatellitesPage();