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
		table = $('#satellites-table'),
		row = $('#table-row', table);

	//	first remove the tableRow from the dom
	row.detach();

	//	using data + dataHandlers set up each row
	//	and set up each col of each row
	//	expected data handler signature:
	//	function (data, row) {
	//		return row;
	//	}
	//	this assumes you know the structure of your table's rows/cols
	//	as defined in html

	// self.setData = function(data) {
	// 	table.find('.table-row').remove();
	// 	for (var i = 0; i < data.length; i++) {
	// 		table.append(dataHandler(data[i], tableRow.clone()));
	// 	}
	// };

	return self;
};

TVRO.SatellitesPage = function() {
	var self = {},
		webService = new TVRO.WebService(),
		satellites = [];

	self.init = function() {
		$('#satellites-btn').toggleClass('selected', true);

		//	for now
		TVRO.SatelliteEditor();

		$('#sb a').click(function() {
			$('#sb a').removeClass('selected');
			$(this).toggleClass('selected', true);
		});

		// var table = TVRO.Table('satellites-table', 'satellites-table-row', function(data, row) {
		// 	//	even though this works
		// 	//	i really don't want to do it this way
		// 	//	it's just not that explicit about how a row is supposed to be
		// 	//	set up - it makes me switch between the html and js files too
		// 	//	often to know what i am doing, and probably later on it will
		// 	//	make me switch between html and css
		// 	row.find('.table-col:nth-child(2)').text(data.region);
		// 	row.find('.table-col:nth-child(3)').text(data.name);
		// 	row.toggleClass('enabled', data.enabled === 'TRUE');
		// 	row.toggleClass('favorite', data.favorite === 'TRUE');
		// 	return row;
		// });

		//	note we also have to get the selected satellite here
		//	so that we can check for it when constructing the table

		webService.request('get_satellite_list', {
			'region_filter' : ''
		}, function(response) {
			satellites = [];
			response.find('satellite').each(function(index, satellite) {
				satellites.push(new TVRO.Satellite(satellite));
			});
			
			// table.setData(satellites);
		});

		$('#enabled-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.enabled === b.enabled) return 0;
				else if (a.enabled === 'TRUE') return -1;
				else if (b.enabled === 'TRUE') return 1;
				else return 0;
			});
			console.log("'enabled' sort:");
			console.log(satellites);

			// table.setData(satellites);
		});

		$('#favorite-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.favorite === b.favorite) return 0;
				else if (a.favorite === 'TRUE') return -1;
				else if (b.favorite === 'TRUE') return 1;
				else return 0;
			});

			// table.setData(satellites);
		});

		$('#region-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.region > b.region) return 1;
				else if (a.region < b.region) return -1;
				else return 0;
			});

			// table.setData(satellites);
		});

		$('#name-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.name > b.name) return 1;
				else if (a.name < b.name) return -1;
				else return 0;
			});

			// table.setData(satellites);
		});
	};

	return self;
};

TVRO.page = new TVRO.SatellitesPage();