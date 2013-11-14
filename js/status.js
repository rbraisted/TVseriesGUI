var StatusPage = function() {

	$.ajaxSetup({
		type: 'post',
		contentType : "text/xml",
		processData : false,
		dataType : 'xml'
	});

	setInterval(func, 2000);

	function func() {

		$.ajax({
			url : 'dummy/antservice.php',
			data : 	'<ipacu_request>'+
						'<message name="antenna_status" />'+
					'</ipacu_request>',
			success: function(responseXml) {
				var xml = $(responseXml),
					error = xml.find('message').attr('error'),
					lat = Number(xml.find('gps lat').text()).toFixed(3),
					lon = Number(xml.find('gps lon').text()).toFixed(3),
					heading = Number(xml.find('antenna brst hdg').text()).toFixed(1),
					signal = xml.find('antenna rf bars').text(),
					satellite = xml.find('satellite name').text()+' '+xml.find('satellite antSatID').text();

				//	show representations of latitude and longitude values
				//	as "LAT S" or "LON W" instead of "-LAT" or "-LON"
				$('#lat').text((lat > 0.0) ? lat+' N' : Math.abs(lat)+' S');
				$('#lon').text((lon > 0.0) ? lon+' E' : Math.abs(lon)+' W');

				//	use html here instead for the degree symbol
				//	even though we should able to say .text(heading+'˚')
				//	it doesn't seem to work
				$('#heading').html(heading+'&deg;');

				//	update the sat data
				//	i'm not sure if this is a good way of doing this
				//	an alternative implementation that i'm interested in trying is:
				//	<div class="satellite-signal" signal-strength="0"></div>
				//	.satellite-signal[signal-strength=0] { style properties }
				//	$('.satellite-signal').attr('signal-strength', some value);
				$('#sat-name').text(satellite);
				$('#sat-signal').removeClass('satellite-signal-0 satellite-signal-1 satellite-signal-2 satellite-signal-3 satellite-signal-4 satellite-signal-5');
				$('#sat-signal').addClass('satellite-signal-'+signal);
			}
		});

		$.ajax({
			url : 'dummy/antservice.php',
			data : 	'<ipacu_request>'+
						'<message name="antenna_versions" />'+
					'</ipacu_request>',
			success: function(responseXml) {
				var xml = $(responseXml),
					error = xml.find('message').attr('error'),
					type = xml.find('au model').text();

				$('#ant-type').text(type);
			}
		});

		$.ajax({
			url : 'dummy/xmlservices.php',
			data : 	'<ipacu_request>'+
						'<message name="get_product_registration" />'+
					'</ipacu_request>',
			success: function(responseXml) {
				var xml = $(responseXml),
					error = xml.find('message').attr('error'),
					name = xml.find('product vessel_name').text();

				$('#ves-name').text(name);
			}
		});
	}
};

$(document).ready(function() {
	window.statusPage = new StatusPage();
});