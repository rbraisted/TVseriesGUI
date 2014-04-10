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

    TVRO.getSystemInfo().then(function(systemInfo) {
      var subject =
        'TV-Hub: ' + systemInfo.antModel + ' ' + systemInfo.hubSn +
        ' Antenna Unit S/N: ' + systemInfo.antSn +
        ' Date/Time: ' + systemInfo.dateTime;

      var body =
        'TV-Hub' +
        '\nS/N: ' + systemInfo.hubSn +
        '\nDate/Time: ' + systemInfo.dateTime +
        '\nVersion: ' + systemInfo.hubVer +
        '\nWeb UI Version: ' + systemInfo.webUIVersion +
        '\nSatellite Library Version: ' + systemInfo.satVer +
        '\nSatellite Service: ' + systemInfo.service +
        '\nSupport IP: ' + systemInfo.gprsIp +
        '\nDiSEqC Version: ' + systemInfo.diseqcVer +
        '\nIP Autoswitch Version: ' + systemInfo.ipautoswVer +
        '\n' +
        '\nAntenna Unit' +
        '\n Model: ' + systemInfo.antModel +
        '\n S/N: ' + systemInfo.antSn +
        '\n Main Version: ' + systemInfo.antVer +
        '\n RF Version: ' + systemInfo.rfVer +
        '\n FPGA Version: ' + systemInfo.fpgaVer +
        '\n AZ/EL Version: ' + systemInfo.azVer +
        '\n SKEW Version: ' + systemInfo.skewVer +
        '\n LNB Type: ' + systemInfo.lnbName +
        '\n LNB Version: ' + systemInfo.lnbVer;

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