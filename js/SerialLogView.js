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
        TVRO.getSerialLog()
      ).then(function(xmls) {
        var email = '';
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
      TVRO.getSerialLog().then(function(xml) {
        var serialLog = $('content', xml).text();
        $('.\\#serial-log', jQ).text(serialLog);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SerialLogView = SerialLogView;
	
}(window.TVRO);