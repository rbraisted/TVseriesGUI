!function(TVRO) {	
	"use strict";

	var RemoteDiagnosticsView = function(jQ) {
    var connectBtn = $('.\\#connect-btn', jQ).click(function() {
      TVRO.setCallhome({
        action: 'CONNECT'
      }).then(undefined, function() {
        alert('No internet connection detected.');
      });
    });

    var disconnectBtn = $('.\\#disconnect-btn', jQ).click(function() {
      TVRO.setCallhome({
        action: 'DISCONNECT'
      });
    });
	};

	TVRO.RemoteDiagnosticsView = RemoteDiagnosticsView;
	
}(window.TVRO);