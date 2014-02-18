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
			if (!selectedValue) alert('You must select an option to proceed.');
			else if (selectedValue === 'DISH') $(document.body).setClass('at-dish-network-view');
			else if (selectedValue === 'OTHER') window.location = '/wizard/satellites.php';
			else if (selectedValue === 'DIRECTV') $(document.body).setClass('at-local-channels-view');
			else if (selectedValue === 'BELL') {
				webService.request('set_autoswitch_service', {
					enable: 'Y',
					service: 'BELL',
					satellite_group: 'BELL'
				});
				window.location = '/wizard/system.php';
			}
		});

		$('[id ~= prev-btn ]', self).click(function() {
			
		});

		return $.extend({}, self, {});
	},

	localChannelsView,
	LocalChannelsView = function() {
		var self = $.apply($, arguments);

		$('[id ~= install-btn ]', self).click(function() {
			webService.request('set_autoswitch_service', {
				enable: 'Y',
				service: 'DIRECTV',
				satellite_group: 'BELL' // not sure which group should be installed here
			});
			$(document.body).setClass('at-directv-view');
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
		var self = TVRO.Radio.apply({}, arguments);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = self.selectedValue();
			if (!selectedValue) alert('You must select an option to proceed.');
			else {
				
			}
		});
		
		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-local-channels-view');
		});

		return $.extend({}, self, {});
	},

	dishNetworkView,
	DishNetworkView = function() {
		var	self = $.apply($, arguments),
			singleRadio = TVRO.Radio('#single', self),
			groupRadio = TVRO.Radio('#group', self);

		$('[id ~= next-btn ]', self).click(function() {
			
		});
		
		$('[id ~= prev-btn ]', self).click(function() {
			
		});

		return $.extend({}, self, {});
	};

	return {
		init: function() {
			serviceProviderView = ServiceProviderView('#service-provider-view');
			localChannelsView = LocalChannelsView('#local-channels-view');
			directvView = DirectvView('#directv-view');
			dishNetworkView = DishNetworkView('#dish-network-view');
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.ServicePage();