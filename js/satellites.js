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

TVRO.Satellite = function(satellite) {
	var self = {};

	satellite = $(satellite);
	//	these values can be retrieved from
	//	get_satellite_list and get_satellite_params
	self.listID = satellite.find('listID').text() || undefined;
	self.antSatID = satellite.find('antSatID').text() || undefined;
	self.name = satellite.find('name').text() || undefined;
	self.region = satellite.find('region').text() || undefined;
	self.lon = satellite.find('lon').text() || undefined;
	self.enabled = satellite.find('enabled').text() || undefined;
	self.favorite = satellite.find('favorite').text() || undefined;
	self.select = satellite.find('select').text() || undefined;
	self.triSatID = satellite.find('triSatID').text() || undefined;
	//	these values can only be retrieved with get_satellite_params
	self.skew = satellite.find('skew').text() || undefined;
	self.lo1 = satellite.find('lo1').text() || undefined;
	self.lo2 = satellite.find('lo2').text() || undefined;
	self.kumode = satellite.find('kumode').text() || undefined;
	//	xponders can only be retrieved with get_satellite_params
	self.xponders = [];
	satellite.find('xponder').each(function(index, xponder) {
		self.xponder[$(xponder).find('id').text()] = new TVRO.Xponder(xponder);
	});

//	<satellite>
//		<listID>21</listID>
//		<antSatID>61W</antSatID>
//		<name>Amazonas-2</name>
//		<region>North America</region>
//		<lon>-61.00</lon>
//		<enable>TRUE</enable>
//		<favorite>TRUE</favorite>
//		<select>TRUE</select>
//		<triSatID>FALSE</triSatID>
//	</satellite>

//	<listID>4</listID>
//	<antSatID>99W</antSatID>
//	<name>DTV99</name>
//	<region>North America</region>
//	<lon>-99.00</lon>
//	<skew>0.00</skew>
//	<dt>YYYY-MM-DDTHH:MM:SSZ</dt>
//	<enable>FALSE</enable>
//	<favorite>FALSE</favorite>
//	<select>FALSE</select>
//	<triSatID>FALSE</triSatID>
//	<lo1>OFF</lo1>
//	<lo2>10000</lo2>
//	<kumode>N | W</kumode>

	return self;
};

TVRO.Xponder = function(xponder) {
	var self = {};

	xponder = $(xponder);
	self.id = xponder.find('id').text() || undefined;
	self.pol = xponder.find('pol').text() || undefined;
	self.band = xponder.find('band').text() || undefined;
	self.freq = xponder.find('freq').text() || undefined;
	self.symRate = xponder.find('symRate').text() || undefined;
	self.fec = xponder.find('fec').text() || undefined;
	self.netId = xponder.find('netID').text() || undefined;
	self.modType = xponder.find('modType').text() || undefined;

//	<xponder>
//		<id>1</id>
//		<pol>V</pol>
//		<band>L</band>
//		<freq>11960</freq>
//		<symRate>20000</symRate>
//		<fec>3/4</fec>
//		<netID>0xFFFE</netID>
//		<modType>QDVB</modType>
//	</xponder>

	return self;
}

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
			console.log(data);
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

		webService.request('get_satellite_list', {
			'region_filter' : ''
		}, function(response) {
			satellites = [];
			response.find('satellite').each(function(index, satellite) {
				satellites.push(new TVRO.Satellite(satellite));
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