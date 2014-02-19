"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.GpsPage = function() {
	var
	antType,
	webService = TVRO.WebService(),

	vesselLocationView,
	backupGpsSourceView,
	GpsSourceView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self);

		radio.click(function(value) {
			if (value === 'COORDINATES') {
				coordinatesView.setCoordinates({
					latitude: $('#latitude', self).val(),
					longitude: $('#longitude', self).val()
				});
				$(document.body).setClass('at-coordinates-view');
			}
		});

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue(),
				latitude = $('#latitude', self).val(),
				longitude = $('#longitude', self).val(),
				city = cityDropdown.selectedValue();

			//	this block is very ugly, but basically:
			//	/*1*/	if no value selected, alert
			//	/*2*/	if NONE is selected, go to heading source view
			//	/*3*/	if an NMEA choice is selected, set_gps_config then
			//			go to heading source view
			//	/*4*/ 	if COORDINATES selected, check valid values and go to
			//			coordinates view if necessary
			//			otherwise set_gps lat lon and go to heaving source view
			//	/*5*/	if CITY is selected, check for valid city and then go
			//			to heading source view
	/*1*/	if (!selectedValue) alert('You must select an option to proceed.'); 
	/*2*/	else if (selectedValue === 'NONE') $(document.body).setClass('at-heading-source-view');
	/*3*/	else if (selectedValue === 'NMEA0183' || selectedValue === 'NMEA2000') {
				webService.request('set_gps_config', {
					nmea0183: { enable: (selectedValue === 'NMEA0183' ? 'Y' : 'N') },
					nmea2000: { enable: (selectedValue === 'NMEA2000' ? 'Y' : 'N') }
				});
				$(document.body).setClass('at-heading-source-view');
	/*4*/	} else if (selectedValue === 'COORDINATES') {
				if (!latitude.length) {
					alert('You must enter a latitude to proceed.');
					$(document.body).setClass('at-coordinates-view');
				} else if (!longitude.length) {
					alert('You must enter a longitude to proceed.');
					$(document.body).setClass('at-coordinates-view');
				} else {
					webService.request('set_gps', {
						lat: latitude,
						lon: longitude,
					});
					$(document.body).setClass('at-heading-source-view');
				}
	/*5*/	} else if (selectedValue === 'CITY') {
				if (!city) {
					alert('You must select a city to proceed.');
					$('#city-btn', self).click();
				} else {
					webService.request('set_gps', { city: city });
					$(document.body).setClass('at-heading-source-view');
				}
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			window.location = '/wizard/registration.php';
		});

		return $.extend({}, self, {
			setCoordinates: function(coordinates) {
				if (coordinates) {
					if (coordinates.latitude) $('#latitude', self).val(coordinates.latitude);
					if (coordinates.longitude) $('#longitude', self).val(coordinates.longitude);
				}
			}
		});
	},

	coordinatesView,
	CoordinatesView = function() {
		var self = $.apply($, arguments);

		$('[id ~= back-btn ]', self).click(function() {
			vesselLocationView.setCoordinates({
				latitude: $('#latitude', self).val(),
				longitude: $('#longitude', self).val()
			});
			$(document.body).setClass('at-vessel-location-view');
		});

		return $.extend({}, self, {
			setCoordinates: function(coordinates) {
				if (coordinates) {
					if (coordinates.latitude) $('#latitude', self).val(coordinates.latitude);
					if (coordinates.longitude) $('#longitude', self).val(coordinates.longitude);
				}
			}
		});
	},

	cityDropdown,
	CityDropdown = function() {
		var self = $.apply($, arguments),
			dropdown = TVRO.Dropdown('#city-dropdown'),
			table = TVRO.Table('#city-dropdown');

		dropdown.setButtons('[id ~= city-btn ]');

		webService.request('get_gps_cities', function(response) {
			var cities = $('city', response).map(function() { return $(this).text(); }).get();
			table.build(function(i, row) {
				row.attr('value', cities[i]);
				$('#name', row).text(cities[i]);
			});
			table.build(cities.length);
			dropdown.refresh();
		});

		return $.extend({}, self, dropdown, table);
	},

	headingSourceView,
	HeadingSourceView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self),
			table = TVRO.Table(self),
			nmea0183Sources,
			nmea2000Sources,
			headingSources;

		table.build(function(i, row) {
			row.attr('value', i);
			$('#name', row).text(headingSources[i].name);
			$('#source', row).text(headingSources[i].source);
		});

		webService.request('get_heading_config', function(response) {
			var getHeadingSource = function() {
				return {
					name: $('nmea_name', this).text(),
					source: $('nmea_source', this).text()
				}
			}

			nmea0183Sources = $('nmea0183 nmea_message', response).map(getHeadingSource).get();
			nmea2000Sources = $('nmea2000 nmea_message', response).map(getHeadingSource).get();
			headingSources = nmea0183Sources.concat(nmea2000Sources);
			console.log(headingSources);
			table.build(headingSources.length);
			radio.refresh();
		});

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to proceed.');
			else {
				if (nmea0183Sources.indexOf(headingSources[selectedValue]) !== -1) {
					webService.request('set_heading_config', {
						nmea0183: { enable: 'Y', nmea_source: headingSources[selectedValue].source },
						nmea2000: { enable: 'N' }
					});
				} else if (nmea2000Sources.indexOf(headingSources[selectedValue]) !== -1) {
					webService.request('set_heading_config', {
						nmea0183: { enable: 'N' },
						nmea2000: { enable: 'Y', nmea_source: headingSources[selectedValue].source }
					});
				}
				window.location = '/wizard/service.php';
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			if (antType === 'TV1' || antType === 'TV3' || antType === 'RV1') $(document.body).setClass('at-vessel-location-view');
			else if (antType === 'TV5' || antType === 'TV6') $(document.body).setClass('at-backup-gps-source-view');
		});

		return $.extend({}, self, {});
	};

	return {
		init: function() {
			vesselLocationView = GpsSourceView('#vessel-location-view');
			coordinatesView = CoordinatesView('#coordinates-view');
			cityDropdown = CityDropdown('#city-dropdown');
			backupGpsSourceView = GpsSourceView('#backup-gps-source-view');
			headingSourceView = HeadingSourceView('#heading-source-view');

			webService.request('antenna_versions', function(response) {
				antType = $('au model', response).text();
				if (antType === 'TV1' || antType === 'TV3' || antType === 'RV1') $(document.body).setClass('at-vessel-location-view');
				else if (antType === 'TV5' || antType === 'TV6') $(document.body).setClass('at-backup-gps-source-view');
			});
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.GpsPage();