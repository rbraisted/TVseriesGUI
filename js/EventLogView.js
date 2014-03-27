!function(TVRO) {
  "use strict";

  var EventLogView = function(jQ) {
    var self;

    var events = [];
    var eventsLoading = false;
    var loadEvents = function() {
      if (eventsLoading) return;
      eventsLoading = true;

      TVRO.getRecentEventHistory({
        'begin_at_event': events.length,
        'how_many_events' : 15
      }).then(function(xml) {
        var newEvents = _.map($('event', xml), function(event) {
          var text = $(event).text();
          return {
            date: text.substr(0, text.indexOf('::')),
            message: text.substr(text.indexOf('::')+2)
          }
        });

        events = events.concat(newEvents);
        eventTableView.setValues(events).build();
        eventsLoading = false;
      });
    };

    var eventTableView = TVRO.TableView(
      $('.\\#event-table-view', jQ)
        .scroll(function() {
          var tableView = $(this);
          //  if scroll to the bottom
          if (tableView[0].scrollHeight - tableView.scrollTop() == tableView.outerHeight()) {
            // load more events
            loadEvents();
          }
        })
    ).onBuild(function(row, event) {
      $('.\\#event-date', row).text(event.date);
      $('.\\#event-message', row).text(event.message);
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      TVRO.getEventHistoryLog(undefined, true).then(function(xml) {
        var content = $('content', xml)[0].innerHTML;
        var date = new Date();
        var time = date.getTime();
        var logFile = 'logs/log' + time + '.txt';

        $.ajax({
          url: 'save.php',
          data: {
            text: content,
            file:logFile
          },
          type: 'post',
          success: function() {
            window.document.location = logFile;
          }
        });     
      });
    });

    var emailBtn = $('.\\#email-btn', jQ).click(function() {
      TVRO.getEventHistoryLog({}, 1).then(function(xml) {
        var content = $('content', xml)[0].innerHTML;
        window.open("mailto:?subject=TVRO Event Log&body="+content);
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