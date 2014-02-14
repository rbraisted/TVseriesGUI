"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

//	this page
//	should have 1 radio (gps options)
//	1 dropdown (cities)
//	also there is one modal view but only on mobile
//	here's how we'll do it:
//	at-splash we see the options
//	at-coordinates we see the modal
//	in the CoordinatesView the back button
//	checks if the CoordinatesView inputs are empty
//	if so, uncheck the radio
//	same for the dropdown actually, when the dropdown closes, if there's
//	no city selected, we should uncheck the radio
//	the CoordinatesView on save will update the #latitude and #longitude inputs
//	of the OptionsView with the values of the same inputs in CoordinatesView
//	when we hit next in options view
//	we will check if the radio has a selected value
//	seems pretty easy yes???

TVRO.GpsPage = function() {
	var
	webService = TVRO.WebService(),

	vesselLocationView,
	backupGpsSourceView,
	GpsSourceView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self),
			selectedValue,
			lastSelectedValue;

		radio.click(function(value) {
			lastSelectedValue = selectedValue;
			selectedValue = value;
			if (value === 'coordinates') {
				coordinatesView.setCoordinates({
					latitude: $('#latitude', self).val(),
					longitude: $('#longitude', self).val()
				});
				$(document.body).setClass('at-coordinates-view');
			}
		});

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to proceed.'); 
			else if (selectedValue === 'nmea0183' || selectedValue === 'nmea2000') {
				webService.request('set_gps_config', {
					nmea0183: { enable: (selectedValue === 'nmea0183' ? 'Y' : 'N') },
					nmea2000: { enable: (selectedValue === 'nmea2000' ? 'Y' : 'N') }
				});
				$(document.body).setClass('at-heading-source-view');
			} else if (selectedValue === 'coordinates' || selectedValue === 'city') {
				webService.request('set_gps', {
					lat: (selectedValue === 'coordinates' ? $('#latitude', self).val() : ''),
					lon: (selectedValue === 'coordinates' ? $('#longitude', self).val() : ''),
					city: (selectedValue === 'city' ? dropdown.selectedValue() : '')
				});
				$(document.body).setClass('at-heading-source-view');
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			window.location = '/wizard/registration.php';
		});

		return $.extend({}, self, {
			undoSelection: function() {
				radio.setSelectedValue(lastSelectedValue);
				selectedValue = lastSelectedValue;
			},
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

		$('[id ~= cancel-btn ]', self).click(function() {
			vesselLocationView.undoSelection();
			$(document.body).setClass('at-vessel-location-view');
		});

		$('[id ~= save-btn ]', self).click(function() {
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

	headingSourceView,
	HeadingSourceView = function() {
		var self = $.apply($, arguments);

		$('[id ~= next-btn ]', self).click(function() {
			//	in the pdf it seems like the next pages are:
			//	circular lnb - 9 (service)
			//	tv5 manual - 1 (???)
			//	linear lnb tv1 & tv3 - 17 (satellite)
			//	linear lnb tv5 & tv6 - 14 (satellite)
			//	tri-americas lnb - 11 (service)
			//	note: these may not cover all cases, haven't checked yet
		});

		$('[id ~= prev-btn ]', self).click(function() {
			//	depends on ant type
			//	tv1, tv3, rv1 - goes to vesselLocationView
			//	tv5, tv6 - goes to backupGpsSourceView
		});

		return $.extend({}, self, {});
	};

	return {
		init: function() {
			vesselLocationView = GpsSourceView('#vessel-location-view');
			backupGpsSourceView = GpsSourceView('#backup-gps-source-view');
			coordinatesView = CoordinatesView('#coordinates-view');
			headingSourceView = HeadingSourceView('#heading-source-view');
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.GpsPage();