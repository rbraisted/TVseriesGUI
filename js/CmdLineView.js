!function(exports) {
	var CmdLineView = function(jQ) {
		var self;
		var output = $('.\\#output', jQ);
		var input = $('.\\#input', jQ);
		var sendBtn = $('.\\#send-btn', jQ);

		sendBtn.click(function() {
			var cmd = input.val();
			if (cmd) {
		    $.ajax({
		        type: 'post',
		        url: 'systemCMD.php',
		        dataType : 'xml',
		        data : "cmd="+cmd,
		        success: function(response){
							input.val('');
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
			
		}
	}

	exports.CmdLineView = CmdLineView;
}(window);