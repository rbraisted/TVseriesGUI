TVRO.EventHistory = function() {
	var self = {},
		webservice = new TVRO.WebService(),
		eventHistoryCount = 0,
		eventHistoryLog,
		beginAtEvent = 1;

	self.load = function(howManyEvents) {
		webservice.getRecentEventHistory({
			'begin_at_event' : beginAtEvent,
			'how_many_events' : howManyEvents
		}, function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				events = xml.find('event');

			events.each(function() {
				var eventComponents = $(this).text().split('::'),
					dateTimeType = eventComponents[0],
					message = eventComponents[1];

				$('#events').append('<div class="event"><div class="date-time-type">'+dateTimeType+'</div><div class="message">'+message+'</div></div>');
				beginAtEvent++;
			});

			$('#events').animate({
				scrollTop: $('#events').height()
			}, 1000);
		});
	}

	self.update = function() {
		webservice.getEventHistoryCount(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');			
			eventHistoryCount = xml.find('event_count').text();
		});

		webservice.getEventHistoryLog(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error');
			eventHistoryLog = xml.find('content').text();
		});
	}

	$('#load-button').click(function() {
		self.load(5);
	});

	$('#email-button').click(function() {

	});

	return self;
};

$(document).ready(function() {
	window.tvro.eventHistory = new TVRO.EventHistory();
	window.tvro.eventHistory.update();
	window.setInterval(window.tvro.eventHistory.update, 2000);
	window.tvro.eventHistory.load(5);
});