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

    var emailBtn = $('.\\#email-btn', jQ).click(function() {
      Promise.all(
        TVRO.getSystemInfo(),
        TVRO.getEventHistoryLog()
      ).then(function(res) {
        var email = 'support@kvh.com';
        var systemInfo = res[0];
        var eventHistoryLog = res[1];

        var subject = encode(
          'TV-Hub: ' + systemInfo.antModel + ' ' + systemInfo.hubSn +
          ' Antenna Unit S/N: ' + systemInfo.antSn +
          ' Date/Time: ' + systemInfo.dateTime
        );

        var body = encode(eventHistoryLog);

        window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
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