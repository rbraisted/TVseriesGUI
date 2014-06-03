!function(TVRO) {	
	"use strict";

	var OperationalLogView = function(jQ) {
		var self;

    var interval;

    var stopInterval = function() {
      if (interval) clearInterval(interval);
      interval = undefined;
    };

    var startInterval = function() {
      stopInterval();
      interval = setInterval(function() {
        TVRO.serialLogStatus(1, 1).then(function(xml) {
          var percent = $('percent', xml).text();
          $('.\\#percent', jQ).text(percent);
          $('.\\#progress', jQ).width(percent + '%');
        });
      }, 1000);
    };

		var startBtn = $('.\\#start-btn', jQ).click(function() {
			TVRO.startSerialLog({'restart':'N'});
		});

		var restartBtn = $('.\\#restart-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to restart the antenna?');
			if (confirmed) TVRO.startSerialLog({'restart':'Y'});
		});

		return self = {
      startUpdating: startInterval,
      stopUpdating: stopInterval
    };
	};

	TVRO.OperationalLogView = OperationalLogView;
	
}(window.TVRO);