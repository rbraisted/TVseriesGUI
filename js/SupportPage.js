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
  );

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
      TVRO.getSystemInfo(),
      TVRO.getPowerInfo()
    ).then(function(info) {
      var systemInfo = info[0];
      var powerInfo = info[1];

      //  appears in subject field, all on a single line
      var subject =
        'TV-Hub: ' + systemInfo.antModel + ' ' + systemInfo.hubSn +
        ' Antenna Unit S/N: ' + systemInfo.antSn +
        ' Date/Time: ' + systemInfo.dateTime;

      //  appears in email body, newlines
      //  the idea here is to match this to the data displayed in SystemInfoView
      var body =
        'TV-Hub' +
        '\n S/N: ' + systemInfo.hubSn +
        '\n Date/Time: ' + systemInfo.dateTime +
        '\n Version: ' + systemInfo.hubVer +
        '\n Web UI Version: ' + systemInfo.webUIVersion +
        '\n Satellite Library Version: ' + systemInfo.satVer +
        '\n Satellite Service: ' + systemInfo.service +
        '\n Support IP: ' + systemInfo.gprsIp +
        '\n DiSEqC Version: ' + systemInfo.diseqcVer +
        '\n IP Autoswitch Version: ' + systemInfo.ipautoswVer +

        '\n' +
        '\nTV-Hub Power' + 
        '\n Input Supply Voltage 15 VDC' + powerInfo.hubInputSupplyV +
        '\n 42 VDC Input' + powerInfo.hubInput42V +
        '\n 8 VDC' + powerInfo.hubEight +
        '\n 5 VDC' + powerInfo.hubFive +
        '\n 3.3 VDC' + powerInfo.hubThreeThree +
        '\n 42 VDC Output' + powerInfo.hubOutput42V +
        '\n 24 VDC Output' + powerInfo.hubOutput24V +
        '\n Temperature (Celsius)' + powerInfo.hubTempCelsius +

        '\n' +
        '\nAntenna Unit' +
        '\n Model: ' + systemInfo.antModel +
        '\n S/N: ' + systemInfo.antSn +
        '\n Main Version: ' + systemInfo.antVer +
        '\n RF Version: ' + systemInfo.rfVer +
        '\n FPGA Version: ' + systemInfo.fpgaVer +
        '\n AZ/EL Version: ' + systemInfo.azVer +
        '\n SKEW Version: ' + systemInfo.skewVer +
        '\n LNB Type: ' + systemInfo.lnbName +
        '\n LNB Version: ' + systemInfo.lnbVer +

        '\n' +
        '\nAntenna Power' + 
        '\n Main 42 VDC' + powerInfo.antDc +
        '\n Motor 32 VDC' + powerInfo.antMotor +
        '\n 8 VDC' + powerInfo.antEight +
        '\n 5 VDC' + powerInfo.antFive +
        '\n LNB 13/18 VDC' + powerInfo.antLnb;

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

    if (!hash || hash === '/system-info') systemInfoView.reload();

		if (hash === '/command-line') commandLineView.startOutput();
		else commandLineView.stopOutput();

    document.body.className = hash;
	});

	TVRO.reload();
});