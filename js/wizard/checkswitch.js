"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.CheckswitchPage = function() {
	var
	webService = TVRO.WebService(),


	config1View,
	config2View,
	config3View,
	ConfigView = function() {
		var self = $.apply($, arguments);

		$('[id ~= next-btn ]', self).click(function() {
			if (self.is(config1View)) $(document.body).setClass('at-complete-1-view');
			else if (self.is(config2View)) $(document.body).setClass('at-complete-2-view');
			else if (self.is(config3View)) $(document.body).setClass('at-complete-3-view');
			webService.request('set_checkswitch_status', { enable: 'N' });
		});

		$('[id ~= prev-btn ]', self).click(function() {

		});

		return $.extend({}, self, {});			
	},


	complete1View,
	complete2View,
	complete3View,
	CompleteView = function() {
		var self = $.apply($, arguments);

		$('[id ~= diagram-btn ]', self).click(function() {
			if (self.is(complete1View)) $(document.body).setClass('at-diagram-1-view');
			else if (self.is(complete2View)) $(document.body).setClass('at-diagram-2-view');
			else if (self.is(complete3View)) $(document.body).setClass('at-diagram-3-view');
		});

		$('[id ~= next-btn ]', self).click(function() {
			if (self.is(complete3View)) window.location = '/wizard/autoswitch.php';
			else window.location = '/wizard/activation.php';
		});

		$('[id ~= prev-btn ]', self).click(function() {
			if (self.is(complete1View)) $(document.body).setClass('at-config-1-view');
			else if (self.is(complete2View)) $(document.body).setClass('at-config-2-view');
			else if (self.is(complete3View)) $(document.body).setClass('at-config-3-view');
			webService.request('set_checkswitch_status', { enable: 'Y' });
		});

		return $.extend({}, self, {});
	};


	return {
		init: function() {
			webService.request('set_checkswitch_status', { enable: 'Y' });
			config1View = ConfigView('#config-1-view');
			config2View = ConfigView('#config-2-view');
			config3View = ConfigView('#config-3-view');
			complete1View = CompleteView('#complete-1-view');
			complete2View = CompleteView('#complete-2-view');
			complete3View = CompleteView('#complete-3-view');

			$.each([1, 2, 3, 4], function(undefined, i) {
				$('[id ~= close-btn ]', '[id ~= diagram-'+i+'-view ]').click(function() {
					$(document.body).setClass('at-complete-'+i+'-view');
				});
			});
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.CheckswitchPage();