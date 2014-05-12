!function(TVRO) {
  "use strict";

	var CommandLineView = function(jQ) {
		var self;

		var output = $('.\\#output', jQ);
		var input = $('.\\#input', jQ);
		
		// if "Enter" key on key board pressed send the command
		$('.\\#input').keypress(function(event){
		    var keycode = (event.keyCode ? event.keyCode : event.which);
		    if(keycode == '13'){
		    	$(".\\#send-btn").click();
		    }
		});
		
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