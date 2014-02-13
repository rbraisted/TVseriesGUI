"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.ServicePage = function() {
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

TVRO.page = TVRO.ServicePage();