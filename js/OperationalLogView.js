!function(TVRO) {	
	"use strict";

	var OperationalLogView = function(jQ) {
		var self;

		var startBtn = $('.\\#start-btn', jQ).click(function() {
			TVRO.startSerialLog({'restart':'N'});
		});

		var restartBtn = $('.\\#restart-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to restart the antenna?');
			if (confirmed) TVRO.startSerialLog({'restart':'Y'});
		});

		return self = {};
	};

	TVRO.OperationalLogView = OperationalLogView;
	
}(window.TVRO);