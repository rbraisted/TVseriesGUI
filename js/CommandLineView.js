!function(TVRO) {
  "use strict";

	var CommandLineView = function(jQ) {
		var self;

		var output = $('.\\#output', jQ);
		var input = $('.\\#input', jQ);

		var sendBtn = $('.\\#send-btn', jQ).click(function() {
			var command = input.val();
			if (command) {
		    $.ajax({
		        type: 'post',
		        url: 'systemCMD.php',
		        dataType : 'xml',
		        data : "cmd="+command,
		        success: function(response){
							input.val(''); //  clear input
		        }
		    });
			}
		});

		return self = {
			stopOutput: function() {
				output.attr('src', '');
			},

			startOutput: function() {
				output.attr('src', '/print2screen.php');
			}
		};
	};

	TVRO.CommandLineView = CommandLineView;

}(window.TVRO);