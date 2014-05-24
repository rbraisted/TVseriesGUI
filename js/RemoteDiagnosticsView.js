!function(TVRO) {	
	"use strict";

	var RemoteDiagnosticsView = function(jQ) {
    var interval; //  store this interval so we can

    var stopInterval = function() {
      if (interval) clearInterval(interval);
      interval = undefined;
      $('.\\#state', jQ).text(' ');
    };

    var startInterval = function() {
      stopInterval();
      interval = setInterval(function() {
        TVRO.getCallhome(1, 1).then(function(xml) {
          var state = $('status', xml).text();
          $('.\\#state', jQ).text(state);          
        });

      }, 1000);
    };

    var connectBtn = $('.\\#connect-btn', jQ).click(function() {
      TVRO.setCallhome({
        action: 'CONNECT'
      }).then(function(xml) {
        xml = $(xml).get(0); //  not sure why, but this isnt returning what i expected from xml
        var state = $('status', xml).text();
        $('.\\#state', jQ).text(state);

        startInterval();

      }, function() {
        alert('No internet connection detected.');
      });
    });

    var disconnectBtn = $('.\\#disconnect-btn', jQ).click(function() {
      TVRO.setCallhome({
        action: 'DISCONNECT'
      });
    });

    return {
      stopUpdating: stopInterval
    };
	};

	TVRO.RemoteDiagnosticsView = RemoteDiagnosticsView;
	
}(window.TVRO);