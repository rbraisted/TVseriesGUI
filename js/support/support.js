"use strict";

TVRO.SupportPage = function() {
	var self = new TVRO.Page(),
		supa = $.extend({}, self);

	self.init = function() {
		supa.init();

		$('[id ~= menu-btn ]', '#menu').click(function() {
			var btn = $(this),
				view = '';

			$('[id ~= menu-btn ]', '#menu').removeClass('is-selected');
			btn.toggleClass('is-selected', true);

			if (btn.hasId('about-the-app-btn')) view = 'about-the-app-view';
			else if (btn.hasId('about-the-satellites-btn')) view = 'about-the-satellites-view';
			else if (btn.hasId('technical-definitions-btn')) view = 'technical-definitions-view';
			else if (btn.hasId('about-blockage-btn')) view = 'about-blockage-view';
			else if (btn.hasId('diagnostic-log-btn')) view = 'diagnostic-log-view';
			else if (btn.hasId('restart-system-btn')) view = 'restart-system-view';
			else if (btn.hasId('event-history-btn')) view = 'event-history-view';
			else if (btn.hasId('command-line-btn')) view = 'command-line-view';

			$('#menu, #about-the-app-view, #about-the-satellites-view, #technical-definitions-view, #about-blockage-view, #diagnostic-log-view, #restart-system-view, #event-history-view, #command-line-view').removeClass('is-active');
			$('[id ~= '+view+' ]').toggleClass('is-active', true);
		});

		$('#back-btn').click(function() {
			$('[id ~= menu-btn ]', '#menu').removeClass('is-selected');
			$('#menu, #about-the-app-view, #about-the-satellites-view, #technical-definitions-view, #about-blockage-view, #diagnostic-log-view, #restart-system-view, #event-history-view, #command-line-view').removeClass('is-active');
			$('#menu').toggleClass('is-active', true);
		});
	};

	return self;
};

TVRO.page = new TVRO.SupportPage();