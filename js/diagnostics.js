var DiagnosticsPage = function() {


	setInterval(function() {
		var windowWidth = $(window).width(),
			htmlWidth = $('html').width(),
			bodyWidth = $('body').width(),
			text = 'window: '+windowWidth+'<br>html: '+htmlWidth+'<br>body: '+bodyWidth;
		$('#test').html(text);

	}, 10);

	$('.diagnostics-nav-button').click(function() {
		$('#sidebar, .diagnostics-nav-button, .diagnostics-section').removeClass('selected');
		$('#'+this.id+', #'+this.getAttribute('section')+', .diagnostics-sections').toggleClass('selected', true);
		//'#'+this.getAttribute('section')
		$('#back-button').text('< '+$('#'+this.getAttribute('section')+' .section-title').text());
	});

	$('#back-button').click(function() {
		$('.diagnostics-nav-button, .diagnostics-sections, .diagnostics-section').removeClass('selected');
		$('#sidebar').toggleClass('selected', true);
	});

	$.ajaxSetup({
		type: 'post',
		contentType : "text/xml",
		processData : false,
		dataType : 'xml'
	});

	$.ajax({
		url : 'dummy/xmlservices.php',
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
	window.diagnosticsPage = new DiagnosticsPage();
});