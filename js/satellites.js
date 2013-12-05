TVRO.Satellites = function() {
	var self = {},
		updateInterval,
		webService = new TVRO.WebService();

	self.init = function() {
		$('#sb a').click(function() {
			$('#sb a').removeClass('selected');
			$(this).toggleClass('selected', true);
		});
		

		self.startUpdating();
	};

	self.startUpdating = function() {
		self.update();
		updateInterval = setInterval(self.update, 2000);
	};

	self.stopUpdating = function() {
		clearInterval(updateInterval);
	};	

	self.update = function() {

	};

	//	we need -
	//	sort by selectable
	//	sort by region
	//	sort by antenna name

	return self;
};

$(document).ready(function() {
	window.tvro.satellites = new TVRO.Satellites();
	window.tvro.satellites.init();
});