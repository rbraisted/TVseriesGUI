"use strict";

TVRO.SatelliteDetails = function(satelliteDetails) {
	var self = {},
		satellite,
		webService = new TVRO.WebService(),
		satelliteDetails = $(satelliteDetails),
		regionDropdown = new TVRO.Dropdown('[id ~= region-dropdown]', '[id ~= region-btn]'),
		polarizationDropdown = new TVRO.Dropdown('[id ~= polarization-dropdown]', '[id ~= polarization-btn]'),
		fecCodeDropdown = new TVRO.Dropdown('[id ~= fec-code-dropdown]', '[id ~= fec-code-btn]'),
		decoderTypeDropdown = new TVRO.Dropdown('[id ~= decoder-type-dropdown]', '[id ~= decoder-type-btn]');

	regionDropdown.optionSelected(function(name, value) {
		$('[id ~= region][id ~= edit]', satelliteDetails).text(value);
	});

	(function(xponderIds) {
		var xponder;
		for (var i = 0; i < xponderIds.length; i++) {
			(function(xponderId) {
				var xponderDetails = $('[id ~= xponder-'+xponderId+']');
				$('[id ~= polarization-btn]', xponderDetails).click(function() {
					xponder = satellite.xponders[xponderId];
					polarizationDropdown.selectValue(xponder.pol);
					polarizationDropdown.show();
				});

				$('[id ~= fec-code-btn]', xponderDetails).click(function() {
					xponder = satellite.xponders[xponderId];
					fecCodeDropdown.selectValue(xponder.fec);
					fecCodeDropdown.show();
				});

				$('[id ~= decoder-type-btn]', xponderDetails).click(function() {
					xponder = satellite.xponders[xponderId];
					decoderTypeDropdown.selectValue(xponder.modType);
					decoderTypeDropdown.show();
				});
			}(xponderIds[i]));
		};

		polarizationDropdown.optionSelected(function(name, value) {
			$('[id ~= xponder-'+xponder.id+'] [id ~= polarization][id ~= edit]', satelliteDetails).text(value);
		});

		fecCodeDropdown.optionSelected(function(name, value) {
			$('[id ~= xponder-'+xponder.id+'] [id ~= fec-code][id ~= edit]', satelliteDetails).text(value);
		});

		decoderTypeDropdown.optionSelected(function(name, value) {
			$('[id ~= xponder-'+xponder.id+'] [id ~= decoder-type][id ~= edit]', satelliteDetails).text(value);
		});
	}([1, 3, 5, 7]));

	self.reload = function() {
		$('[id ~= name]', satelliteDetails).text(satellite.name).val(satellite.name);
		$('[id ~= region]', satelliteDetails).text(satellite.region).val(satellite.region);
		regionDropdown.selectValue(satellite.region);
		$('[id ~= orbital-slot]', satelliteDetails).text(satellite.antSatID).val(satellite.antSatID);
		//	not sure where to get hemisphere from,
		//	using satellite name for now
		$('[id ~= hemisphere]', satelliteDetails).text(satellite.name).val(satellite.name);
		$('[id ~= sat-id]', satelliteDetails).text(satellite.listID).val(satellite.listID);
		$('[id ~= pre-skew]', satelliteDetails).text(satellite.skew).val(satellite.skew);
		$('[id ~= tri-sat-id]', satelliteDetails).text(satellite.triSatID).val(satellite.triSatID);
		$('[id ~= local-oscillator-1]', satelliteDetails).text(satellite.lo1).val(satellite.lo1);
		$('[id ~= local-oscillator-2]', satelliteDetails).text(satellite.lo2).val(satellite.lo2);

		$('[id ~= enable-btn]', satelliteDetails).toggleClass('on', satellite.enabled === 'TRUE');
		$('[id ~= favorite-btn]', satelliteDetails).toggleClass('on', satellite.favorite === 'TRUE');

		var xponders = satellite.xponders;
		for (var xponderId in xponders) {
			var xponder = xponders[xponderId],
				xponderDetails = $('[id ~= xponder-'+xponderId+']', satelliteDetails);

			//	values for polarization in html are incorrect
			//	TODO: fix that
			$('[id ~= polarization]', xponderDetails).text(xponder.pol).val(xponder.pol);
			$('[id ~= frequency]', xponderDetails).text(xponder.freq).val(xponder.freq);
			$('[id ~= symbol-rate]', xponderDetails).text(xponder.symRate).val(xponder.symRate);
			$('[id ~= fec-code]', xponderDetails).text(xponder.fec).val(xponder.fec);
			$('[id ~= network-id]', xponderDetails).text(xponder.netID).val(xponder.netID);
			$('[id ~= decoder-type]', xponderDetails).text(xponder.modType).val(xponder.modType);
		};
	};

	self.setSatellite = function() {
		satellite = arguments[0];
		self.reload();
	};

	$('[id ~= favorite-btn]', satelliteDetails).click(function() {
		var favorite = (satellite.favorite === 'TRUE' ? 'FALSE' : 'TRUE');
		webService.request('set_satellite_identity', {
			'listID' : satellite.listID,
			'favorite' : favorite
		}, function(response) {
			satellite.favorite = favorite;
			$('[id ~= favorite-btn]', satelliteDetails).toggleClass('on', favorite === 'TRUE');
		});
	});

	$('[id ~= enable-btn]', satelliteDetails).click(function() {
		var enabled = (satellite.enabled === 'TRUE' ? 'FALSE' : 'TRUE');
		webService.request('set_satellite_identity', {
			'listID' : satellite.listID,
			'enabled' : enabled
		}, function(response) {
			satellite.enabled = enabled;
			$('[id ~= enable-btn]', satelliteDetails).toggleClass('on', enabled === 'TRUE');
		});
	});

	$('[id ~= save-btn]', satelliteDetails).click(function() {
		var name = $('[id ~= name][id ~= edit]', satelliteDetails).val(),
			listID = $('[id ~= sat-id][id ~= edit]', satelliteDetails).val(),
			antSatID = $('[id ~= orbital-slot][id ~= edit]', satelliteDetails).val(),
			region = $('[id ~= region][id ~= edit]', satelliteDetails).val(),
			skew = $('[id ~= pre-skew][id ~= edit]', satelliteDetails).val(),
			triSatID = $('[id ~= tri-sat-id][id ~= edit]', satelliteDetails).val(),
			lo1 = $('[id ~= local-oscillator-1][id ~= edit]', satelliteDetails).val(),
			lo2 = $('[id ~= local-oscillator-2][id ~= edit]', satelliteDetails).val();

		webService.request('set_satellite_identity', {
			'name' : name,
			'listID' : listID,
			'antSatID' : antSatID,
			'region' : region,
			'skew' : skew,
			'triSatID' : triSatID,
			'lo1' : lo1,
			'lo2' : lo2
		}, function(response) {
			webService.request('set_satellite_params', {
				'listID' : listID,
				'xponder' : (function(xponderIds) {
					var xponders = [];
					for (var i = 0; i < xponderIds.length; i++) {
						var xponderId = xponderIds[i],
							xponderDetails = $('[id ~= xponder-'+xponderId+']');
						xponders.push({
							'id' : xponderId,
							'pol' : $('[id ~= polarization][id ~= edit]', xponderDetails).text(),
							'freq' : $('[id ~= frequency][id ~= edit]', xponderDetails).val(),
							'symRate' : $('[id ~= symbol-rate][id ~= edit]', xponderDetails).val(),
							'fec' : $('[id ~= fec-code][id ~= edit]', xponderDetails).text(),
							'netID' : $('[id ~= network-id][id ~= edit]', xponderDetails).val(),
							'modType' : $('[id ~= decoder-type][id ~= edit]', xponderDetails).text()
						});
					}
					return xponders;
				}([1, 3, 5, 7]))
			}, function(response) {
				$('[id ~= edit]', satelliteDetails).hide();
				$('[id ~= view]', satelliteDetails).show();
			});
		});
	});

	$('[id ~= cancel-btn]', satelliteDetails).click(function() {
		$('[id ~= edit]', satelliteDetails).hide();
		$('[id ~= view]', satelliteDetails).show();
		self.reload();
	});

	$('[id ~= edit-btn]', satelliteDetails).click(function() {
		$('[id ~= view]', satelliteDetails).hide();
		$('[id ~= edit]', satelliteDetails).show();
	});

	$('[id ~= select-btn]', satelliteDetails).click(function() {
		webService.request('select_satellite', {
			'listID' : satellite.listID,
    		'polarization' : '',	//	not set up yet on box
    		'band' : ''	//	not set up yet on box
		}, function(response) {

		});
	});

	self.show = function() {
		satelliteDetails.show();
	};

	self.hide = function() {
		satelliteDetails.hide();
	};

	return self;
};

TVRO.SatellitesTable = function(table) {
	var self = {},
		table = $(table),
		rowTemplate = $('[id ~= table-row]', table),
		satellites = [],
		sortedSatellites = [],
		//	store row clicked callbacks
		//	use like so:
		//	table.rowClicked(function(row, satellite) {
		//		do stuff with the row/satellite
		//	});
		rowClicked = [];

	//	remove the row template from the dom
	//	we'll clone it to build out the take later
	rowTemplate.detach();

	//	redraw the table -
	self.reload = function() {
		$('[id ~= table-row]', table).remove();
		for (var i = 0; i < sortedSatellites.length; i++) {
			var satellite = sortedSatellites[i],
				row = rowTemplate.clone();

			$('[id ~= name]', row).text(satellite.name);
			$('[id ~= orbital-slot]', row).text(satellite.antSatID);
			$('[id ~= region]', row).text(satellite.region);
			row.toggleClass('favorite', satellite.favorite === 'TRUE');
			table.append(row);

			(function(row, satellite) {
				row.click(function() {
					for (var i = 0; i < rowClicked.length; i++) {
						rowClicked[i](row, satellite);
					}
				});
			}(row, satellite));
		}
	};

	self.setSatellites = function() {
		satellites = arguments[0];
		sortedSatellites = satellites.slice();
		self.reload();
	};

	self.rowClicked = function() {
		if (typeof arguments[0] === 'function') {
			rowClicked.push(arguments[0]);
		}
	};

	$('[id ~= sort-btn]', table).click(function() {
		var sortBtn = $(this),
			property,
			ascending = false,
			descending = false;

		if (sortBtn.hasId('name-sort-btn')) property = 'name';
		else if (sortBtn.hasId('orbital-slot-sort-btn')) property = 'lon';
		else if (sortBtn.hasId('region-sort-btn')) property = 'region';

		if (sortBtn.hasClass('ascending')) descending = true;
		else if (!sortBtn.hasClass('descending')) ascending = true;

		$('[id ~= sort-btn]', table).removeClass('ascending descending');
		sortBtn.toggleClass('ascending', ascending);
		sortBtn.toggleClass('descending', descending);

		sortedSatellites = satellites.slice();

		//	if we're doing a sort
		if (ascending || descending) {
			var x = (ascending ? 1 : -1);
			sortedSatellites.sort(function(a, b) {
				if (a[property] > b[property]) return 1 * x;
				else if (a[property] < b[property]) return -1 * x;
				else return 0;
			});
		}

		self.reload();
	});

	self.show = function() {
		table.show();
	};

	self.hide = function() {
		table.hide();
	};

	return self;
};

TVRO.SatellitesPage = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#satellites-btn').toggleClass('selected', true);

		$('[id ~= satellites-table], [id ~= satellite-details], [id ~= satellite-details] [id ~= edit]').hide();

		var satelliteDetails = new TVRO.SatelliteDetails('[id ~= satellite-details]');

		var satellitesTable = new TVRO.SatellitesTable('[id ~= satellites-table]');
		satellitesTable.rowClicked(function(row, satellite) {
			webService.request('get_satellite_params', {
				'listID' : satellite.listID
			}, function(response) {
				var satellite = new TVRO.Satellite(response);
				satelliteDetails.setSatellite(satellite);
				satelliteDetails.show();
				satellitesTable.hide();
			});
		});

		$('[id ~= add-btn]', '#sb').click(function() {
			var satellite = new TVRO.Satellite();
			satellite.name = 'New Satellite';
			satelliteDetails.setSatellite(satellite);
			satelliteDetails.show();
			satellitesTable.hide();
		});

		$('[id ~= filter-btn]', '#sb').click(function() {
			var filterBtn = $(this),
				regionFilter = '',
				userChoiceFilter = '';

			if (filterBtn.hasId('enabled-btn')) userChoiceFilter = 'enable';
			else if (filterBtn.hasId('favorite-btn')) userChoiceFilter = 'favorite';
			else if (filterBtn.hasId('africa-btn')) regionFilter = 'Africa';
			else if (filterBtn.hasId('asia-btn')) regionFilter = 'Asia';
			else if (filterBtn.hasId('australia-btn')) regionFilter = 'Australia';
			else if (filterBtn.hasId('central-and-south-america-btn')) regionFilter = 'Central and South America';
			else if (filterBtn.hasId('north-america-btn')) regionFilter = 'North America';

			$('[id ~= filter-btn]', '#sb').removeClass('selected');
			filterBtn.toggleClass('selected', true);

			webService.request('get_satellite_list', {
				'region_filter' : regionFilter,
				'user_choice_filter' : userChoiceFilter
			}, function(response) {
				var satellites = [];
				$('satellite', response).each(function(index, satellite) {
					satellites.push(new TVRO.Satellite(satellite));
				});
				satellitesTable.setSatellites(satellites);
				satellitesTable.show();
				satelliteDetails.hide();
			});
		});
	};

	return self;
};

TVRO.page = new TVRO.SatellitesPage();