"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.RegistrationPage = function() {
	var
	webService = TVRO.WebService(),

	installerIdentificationView,
	InstallerIdentificationView = function() {
		var
		self = $.apply($, arguments),
		radio = TVRO.Radio(self);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue()
			if (!selectedValue) alert('You must select an option to proceed.'); 
			else if (selectedValue === 'CDT') $(document.body).setClass('at-cdt-vessel-info-view');
			else if (selectedValue === 'DIY') $(document.body).setClass('at-diy-vessel-info-view');
		});

		return $.extend({}, self, {});
	},

	cdtVesselInfoView,
	diyVesselInfoView,
	VesselInfoView = function() {
		var self = $.apply($, arguments);

		$('[id ~= next-btn ]', self).click(function() {
			var name = $('#name').val(),
				owner = $('#owner').val(),
				contact = $('#contact').val(),
				phone = $('#phone').val(),
				email = $('#email').val();

			if (!name || !owner || !contact || !phone || !email) {
				if (!name) alert('You must enter a vessel name to proceed.');
				else if (!owner) alert('You must enter an owner name to proceed.');
				else if (!contact) alert('You must enter a vessel contact to proceed.');
				else if (!phone) alert('You must enter a phone number to proceed.');
				else if (!email) alert('You must enter an email address to proceed.');
			} else {
				webService.request('set_product_registration', {
					product: {
						vessel_name: name
					},
					user: {
						name: owner,
						contact_name: contact,
						phone: phone,
						email: email
					}
				});

				$(document.body).setClass('at-installer-info-view');
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-installer-identification-view');
		});

		return $.extend({}, self, {
			loadData: function(data) {
				$('[id ~= name ]').val($('product vessel_name', data).text());
				$('[id ~= owner ]').val($('user name', data).text());
				$('[id ~= contact ]').val($('user contact_name', data).text());
				$('[id ~= phone ]').val($('user phone', data).text());
				$('[id ~= email ]').val($('user email', data).text());					
			}
		});
	};

	return {
		init: function() {
			installerIdentificationView = InstallerIdentificationView('#installer-identification-view');
			cdtVesselInfoView = VesselInfoView('#cdt-vessel-info-view');
			diyVesselInfoView = VesselInfoView('#diy-vessel-info-view');

			webService.request('get_product_registration', function(response) {
				cdtVesselInfoView.loadData(response);
				diyVesselInfoView.loadData(response);
			});	
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.RegistrationPage();