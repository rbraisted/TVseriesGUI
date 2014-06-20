!function(TVRO) {	
  "use strict";

  var SerialLogView = function(jQ) {
    var self;

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      window.document.location = 'logfile.php?file=IPACU.serial.log';
    });

    var emailBtn = $('.\\#email-btn', jQ).click(function() {
      Promise.all(
        TVRO.getSystemInfo(),
        TVRO.getSerialLog()
      ).then(function(res) {
        var email = 'support@kvh.com';
        var systemInfo = res[0];
        var serialLog = res[1];

        var subject = encode(
          'TV-Hub: ' + systemInfo.antModel + ' ' + systemInfo.hubSn +
          ' Antenna Unit S/N: ' + systemInfo.antSn +
          ' Date/Time: ' + systemInfo.dateTime
        );

        var body = encode(serialLog);

        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
      });
    });

    var reload = function() {
      $('.\\#spinner', jQ).show();

      //  check the current log progress
      TVRO.getSerialLogProgress().then(function(progress) {
        if (percent < 0.01) TVRO.startSerialLog({ restart: 'N' }).then(function() {
          setTimeout(reload,1000);
        });

        else TVRO.getSerialLog().then(function(serialLog) {
          $('.\\#serial-log', jQ).text(serialLog);
          $('.\\#spinner', jQ).hide();
        });
      });
    };

    return self = {
      reload: reload
    };
  };

  TVRO.SerialLogView = SerialLogView;

}(window.TVRO);