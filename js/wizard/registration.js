"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.RegistrationPage = function() {
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
	},

	//	base class for VesselInfoView and InstallerInfoView
	InfoView = function() {
		var self = $.apply($, arguments);

		return $.extend({}, self, {
			//	check if any <input> has a required attr and no value entered
			//	if so, show the appropriate alert and return false
			//	if not, return true - the form is valid
			isValid: function() {
				var isValid = true;
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

				if (self.is(cdtVesselInfoView)) $(document.body).setClass('at-installer-info-view');
				else if (self.is(diyVesselInfoView)) window.location = '/wizard/gps.php';
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-installer-identification-view');
		});

		return $.extend({}, self, {
			loadData: function(data) {
				$('[id ~= vessel ]', self).val($('product vessel_name', data).text());
				$('[id ~= owner ]', self).val($('user name', data).text());
				$('[id ~= contact ]', self).val($('user contact_name', data).text());
				$('[id ~= phone ]', self).val($('user phone', data).text());
				$('[id ~= email ]', self).val($('user email', data).text());					
			}
		});
	},

	installerInfoView,
	InstallerInfoView = function() {
		var self = InfoView.apply({}, arguments),
			toggle = TVRO.Toggle('#toggle', self);

		toggle.click(function(isOn) {
			toggle.toggleClass('is-selected', isOn);
			//	set a good cookie
		});

		$('[id ~= next-btn ]', self).click(function() {
			if (self.isValid()) {
				webService.request('set_product_registration', {
					dealer: {
						company: $('#company', self).val(),
						installer_name: $('#contact', self).val(),
						installer_phone: $('#phone', self).val(),
						installer_email: $('#email', self).val()
					}
				});

				window.location = '/wizard/gps.php';
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-cdt-vessel-info-view');
		});

		return $.extend({}, self, {
			loadData: function(data) {
				$('#company', self).val($('dealer company', data).text());
				$('#contact', self).val($('dealer installer_name', data).text());
				$('#phone', self).val($('dealer installer_phone', data).text());
				$('#email', self).val($('dealer installer_email', data).text());
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