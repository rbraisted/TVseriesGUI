"use strict";

TVRO.Table = function(tableId, tableRowId, dataHandler, data) {
	var self = {},
		rows = [],
		table = $('#'+tableId),
		tableRow = $('#'+tableRowId),
		numCols = tableRow.find('.table-col').length;

	//	first remove the tableRow from the dom
	tableRow.detach();
	tableRow.removeAttr('id');


	//	using data + dataHandlers set up each row
	//	and set up each col of each row
	//	expected data handler signature:
	//	function (data, row) {
	//		return row;
	//	}
	//	this assumes you know the structure of your table's rows/cols
	//	as defined in html
	self.setData = function(data) {
		table.find('.table-row').remove();
		for (var i = 0; i < data.length; i++) {
			table.append(dataHandler(data[i], tableRow.clone()));
		}
	};

	if (data) {
		self.setData(data);
	}

	return self;
};

TVRO.SatellitesPage = function() {
	var self = {},
		webService = new TVRO.WebService(),
		satellites = [];

	self.init = function() {
		$('#satellites-btn').toggleClass('selected', true);

		$('#sb a').click(function() {
			$('#sb a').removeClass('selected');
			$(this).toggleClass('selected', true);
		});

		var table = TVRO.Table('satellites-table', 'satellites-table-row', function(data, row) {
			//	even though this works
			//	i really don't want to do it this way
			//	it's just not that explicit about how a row is supposed to be
			//	set up - it makes me switch between the html and js files too
			//	often to know what i am doing, and probably later on it will
			//	make me switch between html and css
			row.find('.table-col:nth-child(2)').text(data.region);
			row.find('.table-col:nth-child(3)').text(data.name);
			row.toggleClass('enabled', data.enabled === 'TRUE');
			row.toggleClass('favorite', data.favorite === 'TRUE');
			return row;
		});

		//	note we also have to get the selected satellite here
		//	so that we can check for it when constructing the table

		webService.getSatelliteList({
			'region_filter' : ''
		}, function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');

			satellites = [];

			xml.find('satellite').each(function(index, satellite) {
				satellite = $(satellite);
				satellites.push({
					'listID' : satellite.find('listID').text(),
					'antSatID' : satellite.find('antSatID').text(),
					'triSatID' : satellite.find('triSatID').text(),
					'name' : satellite.find('name').text(),
					'region' : satellite.find('region').text(),
					'lon' : satellite.find('lon').text(),
					'favorite' : satellite.find('favorite').text(),
					'enabled' : satellite.find('enabled').text(),
					'select' : satellite.find('select').text()
				});
			});
			console.log("initial list:");
			console.log(satellites);

			table.setData(satellites);
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

			table.setData(satellites);
		});

		$('#favorite-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.favorite === b.favorite) return 0;
				else if (a.favorite === 'TRUE') return -1;
				else if (b.favorite === 'TRUE') return 1;
				else return 0;
			});
			console.log("'favorite' sort:");
			console.log(satellites);

			table.setData(satellites);
		});

		$('#region-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.region > b.region) return 1;
				else if (a.region < b.region) return -1;
				else return 0;
			});
			console.log("'region' sort:");
			console.log(satellites);

			table.setData(satellites);
		});

		$('#name-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.name > b.name) return 1;
				else if (a.name < b.name) return -1;
				else return 0;
			});
			console.log("'name' sort:");
			console.log(satellites);

			table.setData(satellites);
		});
	};

	return self;
};

TVRO.page = new TVRO.SatellitesPage();