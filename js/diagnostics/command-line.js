TVRO.CommandLine = function() {
	$('#send-button').click(function() {
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

$(document).ready(function() {
	window.tvro.commandLine = new TVRO.CommandLine();
});