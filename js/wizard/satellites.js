"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SatellitesPage = function() {
	var
	webService = TVRO.WebService(),

	optionsView,
	circularOptionsView,
	tv5ManualOptionsView,
	OptionsView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to continue.');
			else if (selectedValue === 'SINGLE') $(document.body).setClass('at-single-view');
			else if (selectedValue === 'PRESET') $(document.body).setClass('at-group-view');
			else if (selectedValue === 'NEW') $(document.body).setClass('at-group-edit-view');
		});

		$('[id ~= prev-btn ]', self).click(function() {
			if (self.is(optionsView)) window.location = '';
			else if (self.is(circularOptionsView)) window.location = '';
			else if (self.is(tv5ManualOptionsView)) window.location = '';
		});

		return $.extend({}, self, {});
	},

	singleView,
	SingleView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio('#radio', self),
			table = TVRO.Table('#table', self);

		table.build(10);

		$('[id ~= next-btn ]', self).click(function() {
		});
		$('[id ~= prev-btn ]', self).click(function() {
		});
		return $.extend({}, self, {});
	},

	groupView,
	GroupView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio('#radio', self),
			table = TVRO.Table(radio);

		table.build(10);

		$('[id ~= next-btn ]', self).click(function() {
		});
		$('[id ~= prev-btn ]', self).click(function() {
		});
		return $.extend({}, self, {});
	},
	
	groupEditView,
	GroupEditView = function() {
		var self = $.apply($, arguments);
		$('[id ~= next-btn ]', self).click(function() {
		});
		$('[id ~= prev-btn ]', self).click(function() {
		});
		return $.extend({}, self, {});
	},
	
	groupSatellitesView,
	GroupSatellitesView = function() {
		var self = $.apply($, arguments);
		$('[id ~= next-btn ]', self).click(function() {
		});
		$('[id ~= prev-btn ]', self).click(function() {
		});
		return $.extend({}, self, {});
	};


	return {
		init: function() {
			optionsView = OptionsView('#options-view');
			circularOptionsView = OptionsView('#circular-options-view');
			tv5ManualOptionsView = OptionsView('#tv5-manual-options-view');
			singleView = SingleView('#single-view');
			groupView = GroupView('#group-view');
			groupEditView = GroupEditView('#group-edit-view');
			groupSatellitesView = GroupSatellitesView('#group-satellites-view');
		}
	}
};

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SatellitesPage();