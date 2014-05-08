!function(TVRO) {	
	"use strict";

	var SerialLogView = function(jQ) {
		var self;

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      window.document.location = 'logfile.php?file=IPACU.serial.log';
    });

    var emailBtn = $('.\\#email-btn', jQ).click(function() {
      Promise.all(
        TVRO.getAntennaVersions(),
        TVRO.getAntennaStatus(),
        TVRO.getSerialLog(1, 1),
        TVRO.startSerialLog({ restart: 'N' })
      ).then(function(xmls) {
        var email = 'support@kvh.com';
        var antModel = $('au model', xmls[0]).text();
        var antSn = $('au sn', xmls[0]).text();
        var hubSn = $('acu sn', xmls[0]).text();
        var dateTime = $('gps dt', xmls[1]).text();

        var subject = encode(
          'TV-Hub: ' + antModel + ' ' + hubSn +
          ' Antenna Unit S/N: ' + antSn +
          ' Date/Time: ' + dateTime
        );

        var body = encode($('content', xmls[2]).text());

        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
      });
    });

    var reload = function() {
      TVRO.getSerialLog(1, 1).then(function(xml) {
        var serialLog = $('content', xml).text();
        $('.\\#serial-log', jQ).text(serialLog);
      }, function(error) {
        //  serial log isn't available yet, start the log and reload.
        TVRO.startSerialLog({ restart: 'N' }).then(TVRO.reload);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SerialLogView = SerialLogView;
	
}(window.TVRO);