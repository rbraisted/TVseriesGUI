TVRO.Satellites = function() {
	var self = {},
		updateInterval,
		webService = new TVRO.WebService();

	self.init = function() {
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

	return self;
};

$(document).ready(function() {
	window.tvro.satellites = new TVRO.Satellites();
	window.tvro.satellites.init();
});