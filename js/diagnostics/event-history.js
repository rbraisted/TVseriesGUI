var EventHistory = function() {

	$.ajaxSetup({
		type: 'post',
		contentType : "text/xml",
		processData : false,
		dataType : 'xml'
	});

	$.ajax({
		url : '/dummy/xmlservices.php',
		data : 	'<ipacu_request>'+
					'<message name="get_recent_event_history" />'+
				'</ipacu_request>',
		success: function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				events = xml.find('event');

			events.each(function() {
				var eventComponents = $(this).text().split('::'),
					dateTimeType = eventComponents[0],
					message = eventComponents[1];
				$('#events').append('<div class="event"><div class="date-time-type">'+dateTimeType+'</div><div class="message">'+message+'</div></div>');
			});
		}
	});
};

$(document).ready(function() {
	window.EventHistory = new EventHistory();
});