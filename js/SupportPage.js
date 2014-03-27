$(function() {

	var menuTableView = TVRO.TableView($('.\\#menu-table-view'))
		.setValues([
      'System Info',
			'Operational Log',
			'Event Log',
			'Restart System',
			'Command Line'
		])
		.onBuild(function(row, value) {
			$('.\\#menu-item', row).text(value);
		})
    .onClick(function(value) {
      window.location.hash = '/' + /^\S*/.exec(value.toLowerCase());
    })
		.build();

  var systemInfoView = TVRO.SystemInfoView(
    $('.\\#system-info-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '';
        })
        .end()
  ).reload();

	var operationalLogView = TVRO.OperationalLogView(
		$('.\\#operational-log-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	var eventLogView = TVRO.EventLogView(
		$('.\\#event-log-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	).reload();

	var restartSystemView = TVRO.RestartSystemView(
		$('.\\#restart-system-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	var commandLineView = TVRO.CommandLineView(
		$('.\\#command-line-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	TVRO.onHashChange(function(hash) {
		//	not sure, but eventually move this into tvro.js ??
		if (hash.charAt(0) === '/') {
			hash = hash.substr(1);
		}

    var paths = {};
    paths['system'] = '/system-info';
    paths['operational'] = '/operational-log';
    paths['event'] = '/event-log';
    paths['restart'] = '/restart-system';
    paths['command'] = '/command-line';
		document.body.className = paths[hash];

    menuTableView.setValue({
      system: 'System Info',
      operational: 'Operational Log',
      event: 'Event Log',
      restart: 'Restart System',
      command: 'Command Line'
    }[hash]);

		if (hash === 'command') commandLineView.startOutput();
		else commandLineView.stopOutput();
	});

	TVRO.reload();
});