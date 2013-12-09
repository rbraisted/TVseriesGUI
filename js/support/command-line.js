"use strict";

TVRO.CommandLine = function() {
	var self = {};

	self.init = function() {
		$('#command-line-btn').toggleClass('selected', true);

		$('#send-btn').click(function() {
			var command = $('#input').val();
			$.ajax({  
				type: 'post',
				url: 'systemCMD.php',
				dataType : 'xml',
				data : "cmd="+command,
				success: function(response){
					$('#input').val('');
				},
				error: function(response) {

				}
			});
		});
	};

	return self;
};

TVRO.page.mc = new TVRO.CommandLine();