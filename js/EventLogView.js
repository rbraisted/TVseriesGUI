!function(TVRO) {
  "use strict";

  var EventLogView = function(jQ) {
    var self;

    var eventTableView = TVRO.TableView(
        $('.\\#event-table-view', jQ)
    ).onBuild(function(row, event) {
      $('.\\#event-date', row).text(event.date);
      $('.\\#event-message', row).text(event.message);
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      window.document.location = 'logfile.php?file=majorError.log';
    });

    var clearBtn = $('.\\#clear-btn', jQ).click(function() {
      TVRO.clearEventHistoryLog().then(self.reload);
    });

    var emailBtn = $('.\\#email-btn', jQ).click(function() {
      Promise.all(
          TVRO.getSystemInfo(),
          TVRO.getEventHistoryLog()
      ).then(function(res) {
        var email = 'support@kvh.com';
        var systemInfo = res[0];
        var eventHistoryLog = res[1];

        var subject = encode('TV-Hub: ' + systemInfo.antModel + ' ' + systemInfo.hubSn
                             + ' Antenna Unit S/N: ' + systemInfo.antSn
                             + ' Date/Time: ' + systemInfo.dateTime);

        var body = encode(eventHistoryLog);

        var isMobile = navigator.userAgent.match(/Mobi/i) !== null;
        var isAndroid = navigator.userAgent.match(/Android/i) !== null;

        if (isMobile) {
          if (isAndroid) {
            // The Android email App has a limit near 71850 Characters prior
            // to encoding for the message body size. Encoding dramatically
            // increases the size. 
            var truncatedBody = encode(eventHistoryLog.substring(0, 71850));
            window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + truncatedBody;
          } else {
            window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
          }
        } else {

          var emailInfoWindow = window.open("", "", "width=" + screen.availWidth * .95 + ", height=200");

          emailInfoWindow.document.write("<p>Please compose an email with the following information:<br><br>Recipent: <b>"
                                         + decode(email)
                                         +"</b><br>Subject: <b>"
                                         + decode(subject)
                                         + "</b><br>Body: <b>Please save the log and attach it to the email.</b>"
                                         + "</p>");
        }
      });
    });

    return self = {
        reload: function() {
          TVRO.getEventHistory().then(function(events) {
            events.reverse();
            eventTableView.setValues(events).build();
          });
        }
    };
  };

  TVRO.EventLogView = EventLogView;

}(window.TVRO);