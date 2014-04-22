$(document).ready(function(e) {
	
	$('#fileToDownload,#fileToUpload').mousedown(function(){
		$("#response").html('');
	});
	
	$('#getFile').click(function(){
		var ftd = $('#fileToDownload').val();
		
		if ( '' != ftd ) {
			location.href = 'downloadFile.php?file='+ftd;
		}
		return false;
	});
	
	$('#setFile').click(function(){
		
		var fname = $('#fileToUpload').val();
		
		if( fname.length > 0 ) {
			
			// Checks for wrong update file
			if ( fname.match(/HD7-/) || fname.match(/V7/) ) {
				var message = "Wrong produce update file!";
				$('#response').html(message).css('color','red');
				return false;
				
			} else {
				// upload file to web server
				$.ajaxFileUpload({
					url:'xmlservices.php/set_config_file',
					secureuri:false,
					fileElementId:'fileToUpload',
					dataType: 'xml',
					success: function (xml)
					{
						var err = $(xml).find('message').attr('error');
		
						if ( err.length > 0 ) {
							
							if ( err == "0" ) {
								var message = 'Successfully Sent!';
								$('#response').html(message).css('color','green');
								
								if ( fname.match(/TV\d-/) &&  fname.match(/\.kvh$/) ) {
									$('#updateOption').removeClass('hideField');
									
								} else {
									$('#updateOption').addClass('hideField');

								}
								$('#fname').val($(xml).find("file_name").text());
								return false;
		
							} else {
								var message = returnError(err);
								$('#response').html(message).css('color','red');
								return false;
								
							}
							
						}
						
					},
					error: function(jqXHR, textStatus, errorThrown)
					{
						$('#response').html('ERROR: '+textStatus);
						return false;
					}
					
				});
			
			}
			
		}
		
		return false;
		
	});
	
	$('#install_software').click(function(){
		$('#response').html('').css('color','green');
		var recData='<ipacu_request>';
		recData+='<message name="install_software" />;'
		recData+='<install>Y</install>';
		recData+='<flash_all>'+$('#fdinYesNo').val()+'</flash_all>';
		recData+='<filename>'+$('#fname').val()+'</filename>';
		recData+='</ipacu_request>';

		$.ajax({
			type: 'post',
			url : '/webservice.php',
			contentType : 'text/xml',
			processData : false,
			dataType : 'xml',
			data : recData,
			success: function (xml)
			{
				var err = $(xml).find('message').attr('error');
	
				if ( err.length > 0 ) {
	
					if ( '0' == err ) {
						var message = 'Successfully Sent';
						$('#response').html(message).css('color','green');
						return false;
	
					} else {
						var message = returnError(err);
						$('#response').html(message).css('color','red');
						return false;
						
					}
					
				}
				
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				var message = "ERROR: " + textStatus;
				$("#response").html(message).css('color','red');
				return false;
			}
		});
		
	});

});
