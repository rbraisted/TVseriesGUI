"use strict";

TVRO.SatelliteEditor = function() {
	var self = {};

	TVRO.Dropdown('region-dropdown', 'region-btn', function(optionText, optionValue) {});

	TVRO.Dropdown('suffix-dropdown', 'suffix-btn', function(optionText, optionValue) {});

	TVRO.Dropdown('pol-dropdown', 'pol-btn', function(optionText, optionValue) {});

	TVRO.Dropdown('fec-dropdown', 'fec-btn', function(optionText, optionValue) {});

	TVRO.Dropdown('mod-type-dropdown', 'mod-type-btn', function(optionText, optionValue) {});

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

		//	for now
		TVRO.SatelliteEditor();

		$('#sb a').click(function() {
			$('#sb a').removeClass('selected');
			$(this).toggleClass('selected', true);
		});

		var table = new TVRO.SatellitesTable();
		table.rowClicked(function(row, satellite) {
			//	show satellite details with this row
		});

		webService.request('get_satellite_list', {
			'region_filter' : ''
		}, function(response) {
			var satellites = [];
			$('satellite', response).each(function(index, satellite) {
				satellites.push(new TVRO.Satellite(satellite));
			});
			table.setSatellites(satellites);
		});
	};

	return self;
};

TVRO.page = new TVRO.SatellitesPage();