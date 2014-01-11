"use strict";



TVRO.DiagnosticLog = function() {
	var self = {},
		view = $('[id ~= diagnostic-log ]'),
		webService = new TVRO.WebService();

	self.init = function() {
		$('[id ~= operational-btn ]', view).click(function() {
			window.location.href = 'logfile.php?file=IPACU.serial.log';
		});

		$('[id ~= start-btn ]', view).click(function() {
			webService.request('start_serial_log', {'restart':'N'});
		});

		$('[id ~= restart-btn ]', view).click(function() {
			webService.request('start_serial_log', {'restart':'Y'});
		});

		$('[id ~= entry-btn ]', view).click(function() {
			window.location.href = 'logfile.php?file=majorError.log';
		});
	}

	return self;
}



TVRO.RestartSystem = function() {
	var self = {},
		view = $('[id ~= restart-system ]'),
		webService = new TVRO.WebService();

	self.init = function() {
		$('[id ~= system-btn ]', view).click(function() {
			webService.request('reboot', {'sys':'SBC'});
		});

		$('[id ~= antenna-btn ]', view).click(function() {
			webService.request('reboot', {'sys':'ANT'});
		});

		$('[id ~= all-btn ]', view).click(function() {
			webService.request('reboot', {'sys':'ALL'});
		});
	}

	return self;
}



TVRO.EventHistory = function() {
	var self = {},
		view = $('[id ~= event-history ]'),
		eventsView = $('[id ~= events ]', view),
		eventViewTemplate = $('[id ~= event ]', view).detach(),
		webService = new TVRO.WebService();

	self.init = function() {
		$('[id ~= load-btn ]', view).click(function() {
			self.load();
		});

		$('[id ~= email-btn ]', view).click(function() {
			webService.request('get_event_history_log', function(response) {
				var eventHistoryLog = $('content', response).text();
				//	TODO: call mailto
			});
		});

		self.load();
	}

	self.load = function() {
		webService.request('get_recent_event_history', {
			'begin_at_event' : $('[id ~= event ]', eventsView).length,
			'how_many_events' : 5
		}, function(response) {
			var events = $('event', response);
			for (var i = 0; i < events.length; i++) {
				var event = $(events[i]).text(),
					dateTime = event.substr(0, event.indexOf('::')),
					message = event.substr(event.indexOf('::')+2),
					eventView = eventViewTemplate.clone(),
					dateTimeView = $('[id ~= date-time ]', eventView),
					messageView = $('[id ~= message ]', eventView);
				dateTimeView.text(dateTime);
				messageView.text(message);
				eventsView.append(eventView);
				eventsView.scrollTop(eventsView.prop('scrollHeight'));
			}
		});
	}

	return self;
}



TVRO.Support = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		var menu = $('[id ~= menu ]'),
			menuBtns = $('[id ~= menu-btn ]', menu),
			backBtns = $('[id ~= back-btn ]');

		TVRO.DiagnosticLog().init();
		TVRO.RestartSystem().init();
		TVRO.EventHistory().init();

		menuBtns.click(function() {
			var menuBtn = $(this);

			if (menuBtn.hasClass('is-selected')) return;

			menuBtns.removeClass('is-selected');
			menuBtn.addClass('is-selected');

			if (menuBtn.hasId('about-the-app-btn')) $(document.body).setClass('at-about-the-app');
			else if (menuBtn.hasId('about-the-satellites-btn')) $(document.body).setClass('at-about-the-satellites');
			else if (menuBtn.hasId('technical-definitions-btn')) $(document.body).setClass('at-technical-definitions');
			else if (menuBtn.hasId('about-blockage-btn')) $(document.body).setClass('at-about-blockage');
			else if (menuBtn.hasId('diagnostic-log-btn')) $(document.body).setClass('at-diagnostic-log');
			else if (menuBtn.hasId('restart-system-btn')) $(document.body).setClass('at-restart-system');
			else if (menuBtn.hasId('event-history-btn')) $(document.body).setClass('at-event-history');
			else if (menuBtn.hasId('command-line-btn')) $(document.body).setClass('at-command-line');
		});

		backBtns.click(function() {
			$(document.body).setClass('at-menu');
			menuBtns.removeClass('is-selected');
		});

		$(document.body).setClass('at-event-history');
	}

	return self;
}

TVRO.page = new TVRO.Support();

// TVRO.EventHistoryView = function() {
// 	var self = {};

// 	return self;
// };

// TVRO.SupportPage = function() {
// 	var self = {};

// 	self.init = function() {
// 		$('[id ~= menu-btn ]', '#menu').click(function() {
// 			var btn = $(this),
// 				view = '';

// 			$('[id ~= menu-btn ]', '#menu').removeClass('is-selected');
// 			btn.toggleClass('is-selected', true);

// 			if (btn.hasId('about-the-app-btn')) view = 'about-the-app-view';
// 			else if (btn.hasId('about-the-satellites-btn')) view = 'about-the-satellites-view';
// 			else if (btn.hasId('technical-definitions-btn')) view = 'technical-definitions-view';
// 			else if (btn.hasId('about-blockage-btn')) view = 'about-blockage-view';
// 			else if (btn.hasId('diagnostic-log-btn')) view = 'diagnostic-log-view';
// 			else if (btn.hasId('restart-system-btn')) view = 'restart-system-view';
// 			else if (btn.hasId('event-history-btn')) view = 'event-history-view';
// 			else if (btn.hasId('command-line-btn')) view = 'command-line-view';

// 			$('#menu, #about-the-app-view, #about-the-satellites-view, #technical-definitions-view, #about-blockage-view, #diagnostic-log-view, #restart-system-view, #event-history-view, #command-line-view').removeClass('is-active');
// 			$('[id ~= '+view+' ]').toggleClass('is-active', true);
// 		});

// 		$('[id ~= back-btn ]').click(function() {
// 			$('[id ~= menu-btn ]', '#menu').removeClass('is-selected');
// 			$('#menu, #about-the-app-view, #about-the-satellites-view, #technical-definitions-view, #about-blockage-view, #diagnostic-log-view, #restart-system-view, #event-history-view, #command-line-view').removeClass('is-active');
// 			$('#menu').toggleClass('is-active', true);
// 		});
// 	};

// 	return self;
// };

// TVRO.page = new TVRO.SupportPage();