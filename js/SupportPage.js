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

    //  see SystemInfoView.js and support.php
    Promise.all(
      TVRO.getAntennaVersions(),
      TVRO.getAutoswitchStatus(),
      TVRO.getAntennaStatus(),
      TVRO.getWebUIVersion()
    ).then(function(xmls) {
      var hubSn = $('acu sn', xmls[0]).text();
      var hubVer = $('acu ver', xmls[0]).text();
      var satVer = $('sat_list ver', xmls[0]).text();
      var gprsIp = $('gprs ip', xmls[0]).text();
      var diseqcVer = $('diseqc ver', xmls[0]).text();
      var ipautoswVer = $('ipautosw ver', xmls[0]).text();
      var antModel = $('au model', xmls[0]).text();
      var antSn = $('au sn', xmls[0]).text();
      var antVer = $('au ver', xmls[0]).text();
      var rfVer = $('rf ver', xmls[0]).text();
      var fpgaVer = $('fpga:first ver', xmls[0]).text(); //  fpga was coming back twice so i just added :first
      var azVer = $('az_el ver', xmls[0]).text();
      var skewVer = $('skew_xaz ver', xmls[0]).text();
      var lnbName = $('lnb name', xmls[0]).text();
      var lnbVer = $('lnb ver', xmls[0]).text();

      var service = $('service', xmls[1]).text();
      var subType = $('service_subtype', xmls[1]).text();

      var dateTime = $('gps dt', xmls[2]).text();

      var webUIVersion = xmls[3];

      var subject = 'TV-Hub: ' + antModel + ' ' + hubSn +
        ' Antenna Unit S/N: ' + antSn +
        ' Date/Time: ' + dateTime;

      var body = 'TV-Hub' +
        '\nS/N: ' + hubSn +
        '\nDate/Time: ' + dateTime +
        '\nVersion: ' + hubVer +
        '\nWeb UI Version: ' + webUIVersion +
        '\nSatellite Library Version: ' + satVer +
        '\nSatellite Service: ' + service + ' ' + subType +
        '\nSupport IP: ' + gprsIp +
        '\nDiSEqC Version: ' + diseqcVer +
        '\nIP Autoswitch Version: ' + ipautoswVer +
        '\n' +
        '\nAntenna Unit' +
        '\n Model: ' + antModel +
        '\n S/N: ' + antSn +
        '\n Main Version: ' + antVer +
        '\n RF Version: ' + rfVer +
        '\n FPGA Version: ' + fpgaVer +
        '\n AZ/EL Version: ' + azVer +
        '\n SKEW Version: ' + skewVer +
        '\n LNB Type: ' + lnbName +
        '\n LNB Version: ' + lnbVer;

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