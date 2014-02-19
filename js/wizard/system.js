"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SystemPage = function() {
	var
	webService = TVRO.WebService(),


	skewAngleView,
	SkewAngleView = function() {
		var self = $.apply($, arguments);

		$('[id ~= next-btn ]', self).click(function() {

		});

		$('[id ~= prev-btn ]', self).click(function() {
			webService.request('get_autoswitch_status', function(response) {
				window.location = '/wizard/'
			});
		});

		return $.extend({}, self, {});
	},


	otherSystemConfigView,
	linearSystemConfigView,
	SystemConfigView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to proceed.');
		});

		$('[id ~= prev-btn ]', self).click(function() {

		});

		$.each([1, 2, 3, 4], function() {
			var i = this;
			$('[id ~= diagram-'+i+'-btn ]', self).click(function() {
				$(document.body).setClass('at-diagram-'+i+'-view');
				return false;
			});
		});

		return $.extend({}, self, {});
	},


	diagram1View,
	diagram2View,
	diagram3View,
	diagram4View,
	DiagramView = function() {
		var self = $.apply($, arguments);

		$('[id ~= close-btn ]', self).click(function() {
			$(document.body).setClass('at-linear-system-config-view');
		});

		return $.extend({}, self, {});
	};


	return {
		init: function() {
			skewAngleView = SkewAngleView('#skew-angle-view');
			otherSystemConfigView = SystemConfigView('#other-system-config-view');
			linearSystemConfigView = SystemConfigView('#linear-system-config-view');
			diagram1View = DiagramView('#diagram-1-view');
			diagram2View = DiagramView('#diagram-2-view');
			diagram3View = DiagramView('#diagram-3-view');
			diagram4View = DiagramView('#diagram-4-view');
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SystemPage();