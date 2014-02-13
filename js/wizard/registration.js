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

	InfoView = function() {
		var self = $.apply($, arguments);

		return $.extend({}, self, {
			isValid: function() {
				var isValid = true;
				console.log("!");
				$('input', self).each(function() {
					if (this.hasAttribute('required') && !this.value) {
						alert({
							vessel: 'You must enter a vessel name to proceed.',
							company: 'You must enter a company name to proceed.',
							owner: 'You must enter an owner name to proceed.',
							contact: 'You must enter a contact name to proceed.',
							phone: 'You must enter a phone number to proceed.',
							email: 'You must enter an email address to proceed.'
						}[this.id]);
						isValid = false;
						return false;
					}
				});
				return isValid;
			}
		});
	},

	cdtVesselInfoView,
	diyVesselInfoView,
	VesselInfoView = function() {
		var self = InfoView.apply({}, arguments);

		$('[id ~= next-btn ]', self).click(function() {
			// var requiredFieldsNotEmpty = true;
			// $('input', self).each(function() {
			// 	if (this.hasAttribute('required') && !this.value) {
			// 		alert({
			// 			name: 'You must enter a vessel name to proceed.',
			// 			owner: 'You must enter an owner name to proceed.',
			// 			contact: 'You must enter a vessel contact to proceed.',
			// 			phone: 'You must enter a phone number to proceed.',
			// 			email: 'You must enter an email address to proceed.'
			// 		}[this.id]);
			// 		requiredFieldsNotEmpty = false;
			// 		return false;
			// 	}
			// });

			if (self.isValid()) {
				webService.request('set_product_registration', {
					product: {
						vessel_name: $('#name', self).val()
					},
					user: {
						name: $('#owner', self).val(),
						contact_name: $('#contact', self).val(),
						phone: $('#phone', self).val(),
						email: $('#email', self).val()
					}
				});

				if (self.is('#cdt-vessel-info-view')) {
					$(document.body).setClass('at-installer-info-view');
				}

				if (self.is('#diy-vessel-info-view')) {
					//	leave this page, go to gps set up
				}
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-installer-identification-view');
		});

		return $.extend({}, self, {
			loadData: function(data) {
				$('[id ~= vessel ]').val($('product vessel_name', data).text());
				$('[id ~= owner ]').val($('user name', data).text());
				$('[id ~= contact ]').val($('user contact_name', data).text());
				$('[id ~= phone ]').val($('user phone', data).text());
				$('[id ~= email ]').val($('user email', data).text());					
			}
		});
	},

	installerInfoView,
	InstallerInfoView = function() {
		var self = InfoView.apply({}, arguments);
		$('[id ~= next-btn ]', self).click(function() {
			if (self.isValid()) {
			}
		});

		return $.extend({}, self, {
			loadData: function(data) {
				$('#company').val($('dealer company', data).text());
				$('#contact').val($('dealer installer_name', data).text());
				$('#phone').val($('dealer installer_phone', data).text());
				$('#email').val($('dealer installer_email', data).text());
			}
		});
	};

	return {
		init: function() {
			installerIdentificationView = InstallerIdentificationView('#installer-identification-view');
			cdtVesselInfoView = VesselInfoView('#cdt-vessel-info-view');
			diyVesselInfoView = VesselInfoView('#diy-vessel-info-view');
			installerInfoView = InstallerInfoView('#installer-info-view');

			webService.request('get_product_registration', function(response) {
				cdtVesselInfoView.loadData(response);
				diyVesselInfoView.loadData(response);
				installerInfoView.loadData(response);
			});	
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.RegistrationPage();