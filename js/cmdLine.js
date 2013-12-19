/******************************************************************************
 *  FILE NAME:    cmdLine.js
 *  
 *  AUTHOR:		  SDansereau
 *
 *  DESCRIPTION:  This script is used to send commands to the antenna
 *
 *  NOTES:        None
 *
 *  Copyright (C) 2011 KVH Industries
 *                All rights reserved
 *
 *  Proprietary Notice: This document contains proprietary information of KVH
 *  Industries, Inc. and neither the document not proprietary information shall
 *  published, reproduced, copied, disclosed or used for any purpose other than
 *  the consideration of this document without the expressed written permission
 *  of a duly authorized representative of said Company
 *
 *  DATE STARTED: 20110624
 *
 ******************************************************************************/
function send_A_command(what2do)
{
    $.ajax({  
        type: 'post',
        url: 'systemCMD.php',
        dataType : 'xml',
        data : "cmd="+what2do,
        success: function(response){
            $("#CMDtoSend").val('');
        },  
        error: function(response){

        }
    });

}

function enter2send()
{
    // Gives the Send button focus so the user
    // can hit Enter to send a command
    document.buttonHasFocus.CMDtoSend.focus();
}

function submitenter(myfield,e)
{
	// Looks for the Enter key to be pressed to send a command
	var keycode;
	if ( window.event ) {
		keycode = window.event.keyCode;
  
	} else if (e) {
		keycode = e.which;
  
	} else {
		return true;
  
	}

	if ( 13 == keycode ) {
		
		if( '' != $('#CMDtoSend').val() ) {
			sendAcmd();
		}
		
		return false;
  
	} else {
		return true;
  
	}

}

// Sends a command to the antenna via telnet
function sendAcmd()
{
    var cmd2send = $('#CMDtoSend').val();
    send_A_command(cmd2send);
}

// Sends a command to Restart the Antenna
$('#restart_system').click(function() {
    
    $('body').css('cursor', 'wait');

    var recData  = '<ipacu_request>';
        recData += '<message name="calibrate_gyro" />';
        recData += '<sys>ANT</sys>';
        recData += '</ipacu_request>';

    $.ajax({
        type: 'post',
        url : 'antservice.php',
        contentType : 'text/xml',
        processData : false,
        dataType : 'xml',
        data : recData,
        success: function (xml)
        {
                
            var error = $(xml).find('message').attr('error');

            if ( '0' == error ) {
                $('body').css('cursor', 'default');
                var show_msg = 'Successfully submitted !';
                var color = "green";

            } else {
                $('body').css('cursor', 'default');
                var show_msg = 'Error#: ' + error;
                var color = 'red';
                
            }

            $('#restart_system_result').html(show_msg).css('color', color);
            
        },  
        error: function(jqXHR, textStatus, errorThrown) 
        {
            $('body').css('cursor', 'default');

            var show_msg = 'Error: ' + textStatus;
            $('#restart_system_result').html(show_msg).css('color', 'red');
            
        }
        
    });  
    
    return false; 
    
});