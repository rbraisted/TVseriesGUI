"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.ServicePage = function() {
	var
	webService = TVRO.WebService(),

	serviceProviderView,
	ServiceProviderView = function() {
		var self = TVRO.Radio.apply({}, arguments);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = self.selectedValue();
			if (!selectedValue) alert('You must select an option to continue.');
			else if (selectedValue === 'DISH') $(document.body).setClass('at-dish-network-view');
			else if (selectedValue === 'DIRECTV') {
				$(document.body).setClass('at-spinner-view');
				webService.request('set_autoswitch_service', {
					enable: 'Y',
					service: 'DIRECTV',
					satellite_group: 'DIRECTV-USA'
				}, function() {
					$(document.body).setClass('at-local-channels-view');
				});			
			} else if (selectedValue === 'OTHER') {
				webService.request('set_autoswitch_service', {
					enable: 'Y',
					service: 'OTHER'
				});
				window.location = '/wizard/satellites.php';
			} else if (selectedValue === 'BELL') {
				$(document.body).setClass('at-spinner-view');
				webService.request('set_autoswitch_service', {
					enable: 'Y',
					service: 'BELL',
					satellite_group: 'BELL'
				}, function() {
					window.location = '/wizard/system.php';
				});
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			window.location = '/wizard/gps.php';
		});

		return $.extend({}, self, {});
	},

	localChannelsView,
	LocalChannelsView = function() {
		var self = $.apply($, arguments);

		$('[id ~= install-btn ]', self).click(function() {
			$(document.body).setClass('at-spinner-view');
			webService.request('select_satellite', {
				antSatID: '119WD'
			}, function() {
				$(document.body).setClass('at-directv-view');
			});
		});

		$('[id ~= next-btn ]', self).click(function() {
			$(document.body).setClass('at-directv-view');
		});
		
		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-service-provider-view');
		});

		return $.extend({}, self, {});
	},

	directvView,
	DirectvView = function() {
		var self = TVRO.Radio.apply({}, arguments),
			triAmericas = false;

		webService.request('antenna_versions', function(response) {
			triAmericas = $('lnb name', response).text() === 'Tri-Americas';
		});

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = self.selectedValue();
			if (!selectedValue) alert('You must select an option to continue.');
			else if (selectedValue === 'AUTOMATIC') window.location = '/wizard/autoswitch.php';
			else if (selectedValue === 'SINGLE') {
				webService.request('select_satellite', { antSatID: '101W' });
				if (triAmericas) $(document.body).setClass('at-service-subtype-view');
				else window.location = '/wizard/end.php';
			} else if (selectedValue === 'MANUAL') {
				webService.request('set_autoswitch_service', {
					enable: 'N',
					service: 'DIRECTV',
					satellite_group: 'DIRECTV-USA'
				});
				if (triAmericas) $(document.body).setClass('at-service-subtype-view');
				else window.location = '/wizard/end.php';
			}
		});
		
		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-local-channels-view');
		});

		return $.extend({}, self, {});
	},

	serviceSubtypeView,
	ServiceSubtypeView = function() {
		var	self = $.apply($, arguments),
			radio = TVRO.Radio(self);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = self.selectedValue();
			if (!selectedValue) alert('You must select an option to continue.');
			else {
				webService.request('set_autoswitch_service', {
					service_subtype: selectedValue
				});
				window.location = '/wizard/end.php';
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-directv-view');
		});

		return $.extend({}, self, {});
	},

	dishNetworkView,
	DishNetworkView = function() {
		var	self = $.apply($, arguments),
			groupTable = TVRO.Table('#group', self),
			singleTable = TVRO.Table('#single', self),
			groupRadio = TVRO.Radio('#group', self),
			singleRadio = TVRO.Radio('#single', self);

		//	make a webService call here to get the single sats
		//	and sat groups and then populate the tables

		singleRadio.hide();

		groupRadio.click(function(value) {
			if (value === 'OTHER') {
				groupRadio.hide();
				groupRadio.setSelectedValue();
				singleRadio.setSelectedValue();
				singleRadio.show();
			}
		});

		singleRadio.click(function(value) {
			if (value === 'OTHER') {
				singleRadio.hide();
				singleRadio.setSelectedValue();
				groupRadio.setSelectedValue();
				groupRadio.show();
			}
		});

		$('[id ~= next-btn ]', self).click(function() {
			var singleValue = singleRadio.selectedValue(),
				groupValue = groupRadio.selectedValue();
			if (singleValue) {
				$(document.body).setClass('at-spinner-view');
				webService.request('select_satellite', {
					antSatID: singleValue
				}, function() {
					window.location = '/wizard/system.php';
				});
			} else if (groupValue) {
				$(document.body).setClass('at-spinner-view');
				webService.request('set_autoswitch_service', {
					satellite_group: groupValue
				}, function() {
					window.location = '/wizard/system.php';
				});
			} else {
				alert('You must select an option to continue.');
			}
		});
		
		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-service-provider-view');
		});

		return $.extend({}, self, {});
	},

	spinnerView,
	SpinnerView = function() {
		var self = $.apply($, arguments),
			spinner = $('#spinner', self),
			rotation = 0;

		setInterval(function() {
			rotation -= 45;
			spinner.css({
				'transform': 'rotate('+rotation+'deg)',
				'-moz-transform': 'rotate('+rotation+'deg)',
				'-ms-transform': 'rotate('+rotation+'deg)',
				'-webkit-transform': 'rotate('+rotation+'deg)'
			});
		}, 125);

		return $.extend({}, self, {});
	};

	return {
		init: function() {
			serviceProviderView = ServiceProviderView('#service-provider-view');
			localChannelsView = LocalChannelsView('#local-channels-view');
			directvView = DirectvView('#directv-view');
			dishNetworkView = DishNetworkView('#dish-network-view');
			spinnerView = SpinnerView('#spinner-view')
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.ServicePage();