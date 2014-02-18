"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SupportPage = function() {
	var self = {},
		webService = TVRO.WebService();

	self.init = function() {
		var menuView = $('[id ~= menu-view ]'),
			menuBtns = $('[id ~= menu-btn ]', menuView),
			backBtns = $('[id ~= back-btn ]'),
			diagnosticLogView = TVRO.SupportPage.DiagnosticLogView(),
			restartSystemView = TVRO.SupportPage.RestartSystemView(),
			eventHistoryView = TVRO.SupportPage.EventHistoryView(),
			commandLineView = TVRO.SupportPage.CommandLineView();

		diagnosticLogView.init();
		restartSystemView.init();
		eventHistoryView.init();
		commandLineView.init();

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
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SupportPage.DiagnosticLogView = function() {
	var self = {},
		view = $('[id ~= diagnostic-log-view ]'),
		webService = TVRO.WebService();

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

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SupportPage.RestartSystemView = function() {
	var self = {},
		view = $('[id ~= restart-system-view ]'),
		webService = TVRO.WebService();

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

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SupportPage.EventHistoryView = function() {
	var self = {},
		view = $('[id ~= event-history-view ]'),
		eventsView = $('[id ~= events-view ]', view),
		eventViewTemplate = $('[id ~= event-view ]', view).detach(),
		webService = TVRO.WebService();

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
		self.scrollCheck();

		$('#email-btn').click(function() {
			self.email();
		});
		$('#save-btn').click(function() {
			self.save();
		});

		if (TVRO.MOBILE_APP) {
			$('#save-btn').hide();
		}
	}

	self.load = function() {
		webService.request('get_recent_event_history', {
			'begin_at_event' : $('[id ~= event-view ]', eventsView).length,
			'how_many_events' : 15
		}, function(response) {
			var events = $('event', response);
			for (var i = 0; i < events.length; i++) {
				var event = $(events[i]).text(),
					dateTime = event.substr(0, event.indexOf('::')),
					message = event.substr(event.indexOf('::')+2),
					eventView = eventViewTemplate.clone();
				$('[id ~= date-time ]', eventView).text(dateTime);
				$('[id ~= message ]', eventView).text(message);
				eventsView.append(eventView);
				eventsView.scrollTop(eventsView.prop('scrollHeight'));
			}
		});
	}

	self.scrollCheck = function() {  
		
	    var scrolltop=$('#events-view').prop('scrollTop');  
	    var scrollheight=$('#events-view').prop('scrollHeight');  
	    var windowheight=$('#events-view').prop('clientHeight');  
	    var scrolloffset=20;  
	
	    if(scrolltop>=(scrollheight-(windowheight+scrolloffset))) {  
	        //fetch new items  
	        self.load();
	    }  
	    setTimeout(function() {
	    	self.scrollCheck();
	    }, 1500);  
	}

	self.email = function() {
		webService.request('get_event_history_log', function(response) {
			var content = $('content', response)[0].innerHTML;
			window.open("mailto:?subject=TVRO Event Log&body="+content);
		});
	}

	self.save = function() {
	webService.request('get_event_history_log', function(response) {
				var content = $('content', response)[0].innerHTML;
				$.ajax({url: 'save.php',
						data: {text: content},
						type: 'post',
						success: function(output) {
							document.location = "log.txt";
						}
				});
			});

		
	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.SupportPage.CommandLineView = function() {
	var self = {},
		view = $('[id ~= command-line-view ]'),
		webService = TVRO.WebService();

	self.init = function() {

	}

	return self;
}

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SupportPage();