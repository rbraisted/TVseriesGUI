"use strict";

TVRO.EventHistory = function() {
	var self = {},
		webService = new TVRO.WebService(),
		eventHistoryCount = 0,
		eventHistoryLog,
		beginAtEvent = 1;

	self.init = function() {
		$('#event-history-btn').toggleClass('selected', true);

		$('#load-btn').click(function() {
			self.load(5);
		});

		$('#email-btn').click(function() {
			
		});
	};

	self.load = function(howManyEvents) {
		webService.request('get_recent_event_history', {
			'begin_at_event' : beginAtEvent,
			'how_many_events' : howManyEvents
		}, function(response) {
			response.find('event').each(function() {
				var eventComponents = $(this).text().split('::'),
					dateTimeType = eventComponents[0],
					message = eventComponents[1];

				$('#events').append('<div class="event"><div class="date-time-type">'+dateTimeType+'</div><div class="message">'+message+'</div></div>');
				beginAtEvent++;
			});
		});
	};

	self.update = function() {
		webService.request('get_event_history_count', function(response) {
			eventHistoryCount = response.find('event_count').text();
		});

		webService.request('get_event_history_log', function(response) {
			eventHistoryLog = response.find('content').text();
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.EventHistory();