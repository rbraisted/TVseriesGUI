"use strict";

TVRO.SatelliteDetails = function() {
	var self = {},
		webService = new TVRO.WebService(),
		satelliteDetails = $('[id ~= satellite-details]'),
		satellite;

	TVRO.Dropdown('region-dropdown', 'region-btn', function(optionText, optionValue) {});
	TVRO.Dropdown('polarization-dropdown', 'polarization-btn', function(optionText, optionValue) {});
	TVRO.Dropdown('fec-code-dropdown', 'fec-code-btn', function(optionText, optionValue) {});
	TVRO.Dropdown('decoder-type-dropdown', 'decoder-type-btn', function(optionText, optionValue) {});

	self.reload = function() {
		console.log(satellite);
		$('[id ~= name]', satelliteDetails).text(satellite.name).val(satellite.name);
		$('[id ~= region]', satelliteDetails).text(satellite.region).val(satellite.region);
		$('[id ~= orbital-slot]', satelliteDetails).text(satellite.antSatID).val(satellite.antSatID);
		$('[id ~= hemisphere]', satelliteDetails).text(satellite.name).val(satellite.name);
		$('[id ~= sat-id]', satelliteDetails).text(satellite.listID).val(satellite.listID);
		$('[id ~= pre-skew]', satelliteDetails).text(satellite.skew).val(satellite.skew);
		$('[id ~= tri-sat-id]', satelliteDetails).text(satellite.triSatID).val(satellite.triSatID);

		$('[id ~= enable-btn]', satelliteDetails).toggleClass('on', satellite.enabled === 'TRUE');
		$('[id ~= favorite-btn]', satelliteDetails).toggleClass('on', satellite.favorite === 'TRUE');

		var xponders = satellite.xponders;
		for (var xponderID in xponders) {
			var xponder = xponders[xponderID],
				xponderDetails = $('[id ~= xponder-'+xponderID+']', satelliteDetails);

			$('[id ~= polarization]', xponderDetails).text(xponder.pol).val(xponder.pol);
			$('[id ~= frequency]', xponderDetails).text(xponder.freq).val(xponder.freq);
			$('[id ~= symbol-rate]', xponderDetails).text(xponder.symRate).val(xponder.symRate);
			$('[id ~= fec-code]', xponderDetails).text(xponder.fec).val(xponder.fec);
			$('[id ~= network-id]', xponderDetails).text(xponder.netID).val(xponder.netID);
			$('[id ~= decoder-type]', xponderDetails).text(xponder.modType).val(xponder.modType);
		};

		// name
		// region
		// orbital-slot
		// hemisphere
		// sat-id
		// pre-skew
		// tri-sat
		// xponder-1 (3, 5, 7)
		// 	frequency
		// 	symbol-rate
		// 	fec-code
		// 	network-id
		// 	decoder-type
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
			triSatID = $('[id ~= tri-sat-id][id ~= edit]', satelliteDetails).val();

		webService.request('set_satellite_identity', {
			'name' : name,
			'listID' : listID,
			'antSatID' : antSatID,
			'region' : region,
			'skew' : skew,
			'triSatID' : triSatID
		}, function(response) {
			webService.request('set_satellite_params', {
				'listID' : listID
			}, function(response) {
				$('[id ~= view], [id ~= edit]').toggle();
			});
		});
	});

	$('[id ~= cancel-btn]', satelliteDetails).click(function() {
		$('[id ~= view], [id ~= edit]').toggle();
		self.reload();
	});

	$('[id ~= edit-btn]', satelliteDetails).click(function() {
		$('[id ~= view], [id ~= edit]').toggle();
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


//	region
//	suffix
//	xponders:
//		pol (polatization)
//		fec (fec code)
//		mod-type (decoder type)

//	listID			can't edit, don't show
//	antSatID		can't edit, don't show
//	name 			text
//	region 			dropdown
//	lon				text
//	suffix			dropdown
//	skew			text
//	dt 				can't edit, don't show
//	enable 			toggle
//	favorite 		toggle
//	select 			can't edit, don't show
//	triSatID 		text but can be "false"
//	lo1 			text
//	lo2 			text
//	kumode 			can't edit, don't show
//
//	xponder 		
//		id 			can't edit, don't show
//		pol 		dropdown
//		band 		can't edit, don't show
//		freq 		text
//		symRate 	text
//		fec 		dropdown
//		netID 		text
//		modType 	dropdown

	return self;
};

TVRO.SatellitesTable = function() {
	var self = {},
		table = $('[id ~= satellites-table]'),
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

	return self;
};

TVRO.SatellitesPage = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#satellites-btn').toggleClass('selected', true);

		$('#sb a').click(function() {
			$('#sb a').removeClass('selected');
			$(this).toggleClass('selected', true);
		});

		var satelliteDetails = TVRO.SatelliteDetails();

		var satellitesTable = new TVRO.SatellitesTable();
		satellitesTable.rowClicked(function(row, satellite) {
			webService.request('get_satellite_params', {
				'listId' : satellite.listID
			}, function(response) {
				var satellite = new TVRO.Satellite(response);
				satelliteDetails.setSatellite(satellite);
				$('#satellites-table, #satellite-details').toggle();
			});
		});

		webService.request('get_satellite_list', {
			'region_filter' : ''
		}, function(response) {
			var satellites = [];
			$('satellite', response).each(function(index, satellite) {
				satellites.push(new TVRO.Satellite(satellite));
			});
			satellitesTable.setSatellites(satellites);
		});
	};

	return self;
};

TVRO.page = new TVRO.SatellitesPage();