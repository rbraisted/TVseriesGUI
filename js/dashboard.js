TVRO.Dashboard = function() {
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
		webService.getAntennaStatus(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				lat = Number(xml.find('gps lat').text()).toFixed(3),
				lon = Number(xml.find('gps lon').text()).toFixed(3),
				vesselHeading = Number(xml.find('antenna brst hdg').text()).toFixed(1),
				satName = xml.find('satellite name').text(),
				satId = xml.find('satellite antSatID').text(),
				satSignal = xml.find('antenna rf bars').text();

			$('#lat').text((lat > 0.0) ? lat+' N' : Math.abs(lat)+' S');
			$('#lon').text((lon > 0.0) ? lon+' E' : Math.abs(lon)+' W');
			$('#vessel-heading').text(vesselHeading+'˚');
			$('#sat-name').text(satName);
			$('#sat-id').text(satId);
			$('#sat-signal').removeClass('sat-signal-0 sat-signal-1 sat-signal-2 sat-signal-3 sat-signal-4 sat-signal-5');
			$('#sat-signal').addClass('sat-signal-'+satSignal);
		});

		webService.getAntennaVersions(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				antType = xml.find('au model').text();

			$('#ant-type').text(antType);
		});

		webService.getProductRegistration(function(responseXml) {
			console.log("!");
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				vesselName = xml.find('product vessel_name').text();

			$('#vessel-name').text(vesselName);
		});
	}

	return self;
};

$(document).ready(function() {
	window.tvro.dashboard = new TVRO.Dashboard();
	window.tvro.dashboard.init();
});