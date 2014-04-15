!function(TVRO) {
  "use strict";

  var EventLogView = function(jQ) {
    var self;

    var events = [];
    var eventsLoading = false;
    var loadEvents = function() {
      if (eventsLoading) return;
      eventsLoading = true;

      TVRO.getEventHistoryCount().then(function(xml){
        var event_count = $('event_count',xml).text();

        TVRO.getRecentEventHistory({
          'begin_at_event': 1,
          'how_many_events' : event_count
        }).then(function(xml) {
          var newEvents = _.map($('event', xml), function(event) {
            var text = $(event).text();
            return {
              date: text.substr(0, text.indexOf('::')),
              message: text.substr(text.indexOf('::')+2)
            }
          });
          events = events.concat(newEvents);
          events.reverse();
          eventTableView.setValues(events).build();
          eventsLoading = false;
        });
      });
    };

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
        TVRO.getAntennaVersions(),
        TVRO.getAntennaStatus(),
        TVRO.getEventHistoryLog()
      ).then(function(xmls) {
        var email = '';
        var antModel = $('au model', xmls[0]).text();
        var antSn = $('au sn', xmls[0]).text();
        var hubSn = $('acu sn', xmls[0]).text();
        var dateTime = $('gps dt', xmls[1]).text();

        var subject =
          'TV-Hub: ' + antModel + ' ' + hubSn +
          ' Antenna Unit S/N: ' + antSn +
          ' Date/Time: ' + dateTime;

        var body = $('content', xmls[2]).text();

        window.location = 'mailto:' + email + '?subject=' + subject + '&?body=' + body;
      });
    });

    var reload = function() {
      events = [];
      eventsLoading = false;
      loadEvents();
    };

    return self = {
      reload: reload
    };
  };

  TVRO.EventLogView = EventLogView;

}(window.TVRO);