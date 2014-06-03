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
      .find('.\\#remote-diagnostics-btn')
        .click(function() {
          window.location.hash = '/remote-diagnostics';
        })
        .end()
  );

  var remoteDiagnosticsView = TVRO.RemoteDiagnosticsView(
    $('.\\#remote-diagnostics-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '/system-info';
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
      .find('.\\#view-btn')
        .click(function() {
          window.location.hash = '/serial-log';
        })
        .end()
  );

	var serialLogView = TVRO.SerialLogView(
		$('.\\#serial-log-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '/operational-log';
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
      var subject = encode(
        'TV-Hub: ' + systemInfo.antModel + ' ' + systemInfo.hubSn +
        ' Antenna Unit S/N: ' + systemInfo.antSn +
        ' Date/Time: ' + systemInfo.dateTime
      );

      //  appears in email body, newlines
      //  the idea here is to match this to the data displayed in SystemInfoView
      var body = encode(
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
        '\nTV-Hub Power' + 
        '\nInput Supply Voltage 10-30 VDC' + powerInfo.hubInputSupplyV +
        '\n42 VDC Input' + powerInfo.hubInput42V +
        '\n8 VDC' + powerInfo.hubEight +
        '\n5 VDC' + powerInfo.hubFive +
        '\n3.3 VDC' + powerInfo.hubThreeThree +
        '\n42 VDC Output' + powerInfo.hubOutput42V +
        '\n24 VDC Output' + powerInfo.hubOutput24V +
        '\nTemperature (Celsius)' + powerInfo.hubTempCelsius +

        '\n' +
        '\nAntenna Unit' +
        '\nModel: ' + systemInfo.antModel +
        '\nS/N: ' + systemInfo.antSn +
        '\nMain Version: ' + systemInfo.antVer +
        '\nRF Version: ' + systemInfo.rfVer +
        '\nFPGA Version: ' + systemInfo.fpgaVer +
        '\nAZ/EL Version: ' + systemInfo.azVer +
        '\nSKEW Version: ' + systemInfo.skewVer +
        '\nLNB Type: ' + systemInfo.lnbName +
        '\nLNB Version: ' + systemInfo.lnbVer +

        '\n' +
        '\nAntenna Power' + 
        '\nMain 42 VDC' + powerInfo.antDc +
        '\nMotor 32 VDC' + powerInfo.antMotor +
        '\n8 VDC' + powerInfo.antEight +
        '\n5 VDC' + powerInfo.antFive +
        '\nLNB 13/18 VDC' + powerInfo.antLnb
      );

      window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    });
  });

	TVRO.onHashChange(function(hash) {
    headerView.reload();

    menuTableView.setValue({
      '/system-info': 'System Info',
      '/operational-log': 'Operational Log',
      '/serial-log': 'Operational Log',
      '/event-log': 'Event Log',
      '/restart-system': 'Restart System',
      '/command-line': 'Command Line'
    }[hash]);

    if (!hash || hash === '/system-info') systemInfoView.reload();

    if (hash === '/operational-log') operationalLogView.startUpdating();
    else operationalLogView.stopUpdating();

    if (hash !== '/remote-diagnostics') remoteDiagnosticsView.stopUpdating();

    if (hash === '/serial-log') serialLogView.reload();

		if (hash === '/command-line') commandLineView.startOutput();
		else commandLineView.stopOutput();

    document.body.className = hash;
	});

	TVRO.reload();
});