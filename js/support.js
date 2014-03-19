$(function() {
	"use strict";

	var menu = tvro.table($('.\\#menu-table-view'))
		.vals([
			'Operational Log',
			'Event Log',
			'Restart System',
			'Command Line'
		])
		.click(function(row, val) {
			window.location.hash = '/'+encode(val);
		})
		.build(function(row, val) {
			$('.\\#menu-item', row).text(val);
		})
		.build();

	var operationalLogView = OperationalLogView(
		$('.\\#operational-log-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	var eventLogView = EventLogView(
		$('.\\#event-log-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	var restartSystemView = RestartSystemView(
		$('.\\#restart-system-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	var cmdLineView = CmdLineView(
		$('.\\#command-line-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	tvro.hash(function(hash) {

		hash = decode(hash);

		//	not sure, but eventually move this into tvro.js ??
		if (hash.charAt(0) === '/') {
			hash = hash.substr(1);
		}

		$(document.body).setClass({
			'Operational Log': '/operational-log',
			'Event Log': '/event-log',
			'Restart System': '/restart-system',
			'Command Line': '/command-line'
		}[hash]);

		if (hash === 'Command Line') {
			//	start the command line output
			cmdLineView.startOutput();
		} else {
			//	stop the command line output
			cmdLineView.stopOutput();
		}
	});

	tvro.hash();
});