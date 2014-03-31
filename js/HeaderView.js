!function(TVRO) {
  "use strict";

  var HeaderView = function(jQ) {
    var self;

    //  goes to wizard if wizard has not been completed
    //  goes to home if wizard has been completed
    var homeBtn = $('.\\#home-btn', jQ).click(function() {

    });

    var navJq = $('.\\#nav-view');
    var navBtn = $('.\\#nav-btn', jQ).click(function() {
      statusJq.removeClass('$expanded');
      navJq.toggleClass('$expanded');
    });

    var statusJq = $('.\\#status-view');
    var statusBtn = $('.\\#status-btn', jQ).click(function() {
      TVRO.getAntennaStatus().then(function(xml) {
        var powerStatus = 'OK';
        var acuStatus = $('acu state', xml).text();
        var antennaStatus = $('antenna state', xml).text();

        //  applied to all in document,
        //  so #status-btn and #status-view
        $('.\\#power-status')
          .removeClass('$warning $error')
          .addClass({
            'OK': ''
          }[powerStatus]);

        $('.\\#acu-status')
          .removeClass('$warning $error')
          .addClass({
            'OK': '',
            'FLASHING': '$warning',
            'CALGYRO': '$warning',
            'ERROR': '$error'
          }[acuStatus]);

        $('.\\#antenna-status')
          .removeClass('$warning $error')
          .addClass({
            'TRACKING': '',
            'INITIALIZING': '$warning',
            'SEARCHING': '$warning',
            'IDLE': '$warning',
            'CABLE UNWRAP': '$warning',
            'ERROR': '$error'
          }[antennaStatus]);

        //  just the #status-view
        $('.\\#power-status', statusJq).text(powerStatus);
        $('.\\#acu-status', statusJq).text(acuStatus);
        $('.\\#antenna-status', statusJq).text(antennaStatus);
      });        

      navJq.removeClass('$expanded');
      statusJq.toggleClass('$expanded');
    });

    return self = {};
  };

  TVRO.HeaderView = HeaderView;

}(window.TVRO);