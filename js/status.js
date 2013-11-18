TVRO.Status = function() {
	var status = {},
		webService = new TVRO.WebService();

	status.update = function() {
		webService.getAntennaStatus(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				lat = Number(xml.find('gps lat').text()).toFixed(3),
				lon = Number(xml.find('gps lon').text()).toFixed(3),
				heading = Number(xml.find('antenna brst hdg').text()).toFixed(1),
				satName = xml.find('satellite name').text()+' '+xml.find('satellite antSatID').text(),
				antSignal = xml.find('antenna rf bars').text();

			$('#lat').text((lat > 0.0) ? lat+' N' : Math.abs(lat)+' S');
			$('#lon').text((lon > 0.0) ? lon+' E' : Math.abs(lon)+' W');
			$('#heading').text(heading+'˚');
			$('#sat-name').text(satName);
			$('#ant-signal').removeClass('ant-signal-0 ant-signal-1 ant-signal-2 ant-signal-3 ant-signal-4 ant-signal-5');
			$('#ant-signal').addClass('ant-signal-'+antSignal);
		});

		webService.getAntennaVersions(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				type = xml.find('au model').text();

			$('#ant-type').text(type);
		});

		webService.getProductRegistration(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				name = xml.find('product vessel_name').text();

			$('#ves-name').text(name);
		});
	}

	return status;
};

$(document).ready(function() {
	window.tvro.status = new TVRO.Status();
	window.tvro.status.update();
	window.setInterval(window.tvro.status.update, 2000);
});