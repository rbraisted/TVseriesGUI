"use strict";

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
		});

		$('#enabled-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.enabled === b.enabled) return 0;
				else if (a.enabled === 'TRUE') return 1;
				else if (b.enabled === 'TRUE') return -1;
				else return 0;
			});
			console.log("'enabled' sort:");
			console.log(satellites);
		});

		$('#favorite-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.favorite === b.favorite) return 0;
				else if (a.favorite === 'TRUE') return 1;
				else if (b.favorite === 'TRUE') return -1;
				else return 0;
			});
			console.log("'favorite' sort:");
			console.log(satellites);
		});

		$('#region-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.region > b.region) return 1;
				else if (a.region < b.region) return -1;
				else return 0;
			});
			console.log("'region' sort:");
			console.log(satellites);
		});

		$('#name-btn').click(function() {
			satellites.sort(function(a, b) {
				if (a.name > b.name) return 1;
				else if (a.name < b.name) return -1;
				else return 0;
			});
			console.log("'name' sort:");
			console.log(satellites);
		});
	};

	return self;
};

TVRO.page = new TVRO.SatellitesPage();