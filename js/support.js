"use strict";

TVRO.Support = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		var menu = $('[id ~= menu ]'),
			menuBtns = $('[id ~= menu-btn ]', menu),
			backBtns = $('[id ~= back-btn ]');

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
			else if (menuBtn.hasId('restart-sytem-btn')) $(document.body).setClass('at-restart-sytem');
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