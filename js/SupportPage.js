$(function() {

  var headerView = TVRO.HeaderView($('.\\#header-view'));

  setInterval(function() {
    headerView.reload();
  }, 3000);

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
      window.location.hash = '/' + value.toLowerCase().replace(' ', '-');
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

  //  contacts
  var callBtn = $('.\\#call-support-btn').click(function() {
    var number = $(this).text();
    window.location = 'tel:' + number;
  });

  var emailBtn = $('.\\#email-support-btn').click(function() {
    var email = $(this).text();
    Promise.all(
      TVRO.getAntennaVersions(),
      TVRO.getAntennaStatus()
    ).then(function(xmls) {
      var antModel = $('au model', xmls[0]).text();
      var serialNumber = $('au sn', xmls[0]).text();
      var dateTime = $('gps dt', xmls[1]).text();

      var subject = [antModel,
                     serialNumber,
                     dateTime].join(' ');

      var body = ['Model: ' + antModel,
                  'Serial #: ' + serialNumber,
                  'Date/Time: ' + dateTime].join('\n');

      window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + encode(body);
    });
  });

	TVRO.onHashChange(function(hash) {
    headerView.reload();

    menuTableView.setValue({
      '/system-info': 'System Info',
      '/operational-log': 'Operational Log',
      '/event-log': 'Event Log',
      '/restart-system': 'Restart System',
      '/command-line': 'Command Line'
    }[hash]);

    document.body.className = hash;

		if (hash === '/command-line') commandLineView.startOutput();
		else commandLineView.stopOutput();
	});

	TVRO.reload();
});