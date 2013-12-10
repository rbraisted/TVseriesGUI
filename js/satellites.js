"use strict";

TVRO.SatellitesPage = function() {
	var self = {},
		webService = new TVRO.WebService(),
		satellites = [];

	self.init = function() {
		$('#sb a').click(function() {
			$('#sb a').removeClass('selected');
			$(this).toggleClass('selected', true);
		});
	};

	//	we need -
	//	sort by selectable
	//	sort by region
	//	sort by antenna name
	//	sort by enabled
	//	sort by favorite

	return self;
};

TVRO.page = new TVRO.SatellitesPage();