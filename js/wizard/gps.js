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

	installerIdentificationView,
	InstallerIdentificationView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to proceed.'); 
			else if (selectedValue === 'CDT') $(document.body).setClass('at-cdt-vessel-info-view');
			else if (selectedValue === 'DIY') $(document.body).setClass('at-diy-vessel-info-view');
		});

		return $.extend({}, self, {});
	};

	return {
		init: function() {
			webService.request('get_product_registration', function(response) {
			});
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.GpsPage();