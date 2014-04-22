$(document).ready(function(e) {

SendGetCommand = function(cmd){
	var recData='<ipacu_request><message name="'+cmd+'" />';
		recData+='</ipacu_request>';
	var method=eval('('+cmd+')');
	$.ajax({
		type: 'post',
		url : '/webservice.php',
		contentType : 'text/xml',
		processData : false,
		dataType : 'xml',
		data : recData,
		success: function (xml)
		{
			method(xml);
			return false;
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			$('#response').val('ERROR: '+textStatus+'\n');
			return false;
		}
	});
}
SendGetCommand2 = function(cmd,request){
	var recData='<ipacu_request><message name="'+cmd+'" />';
		recData+=request;
		recData+='</ipacu_request>';
	var method=eval('('+cmd+')');
	$.ajax({
		type: 'post',
		url : '/webservice.php',
		contentType : 'text/xml',
		processData : false,
		dataType : 'xml',
		data : recData,
		success: function (xml)
		{
			method(xml);
			return false;
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			$('#response').val('ERROR: '+textStatus+'\n');
			return false;
		}
	});
}
function antenna_status(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='ANTENNA STATUS\n\n';
		$(xml).find('gps').each(function() {
			message+='GPS\n';
			message+='State: '+$(this).find('state').text()+'\n';
			message+='Lat:   '+$(this).find('lat').text()+'\n';
			message+='Lon:   '+$(this).find('lon').text()+'\n';
			message+='DT:    '+$(this).find('dt').text()+'\n\n';
		});
		$(xml).find('acu').each(function() {
			message+='ACU\n';
			message+='State: '+$(this).find('state').text()+'\n';
			message+='Line1: '+$(this).find('line1').text()+'\n';
			message+='Line2: '+$(this).find('line2').text()+'\n\n';
		});
		$(xml).find('antenna').each(function() {
			message+='ANTENNA\n';
			message+='State:	'+$(this).find('state').text()+'\n';
			$(this).find('rf').each(function() {
				message+='SNR:	'+$(this).find('snr').text()+'\n';
				message+='Bars:	'+$(this).find('bars').text()+'\n\n';
			});
			message+='BRST\n';
			$(this).find('brst').each(function() {
				message+='Heading:   '+$(this).find('hdg').text()+'\n';
				message+='AZ Bow:    '+$(this).find('az_bow').text()+'\n';
				message+='AZ:        '+$(this).find('az').text()+'\n';
				message+='EL:        '+$(this).find('el').text()+'\n';
				message+='Tilt:      '+$(this).find('tilt').text()+'\n';
				message+='AZ Offset: '+$(this).find('azoff').text()+'\n\n';
			});
			message+='MOTOR\n';
			$(this).find('motor').each(function() {
				message+='AZ:	'+$(this).find('az').text()+'\n';
				message+='XAZ:	'+$(this).find('cross_az').text()+'\n';
				message+='EL:	'+$(this).find('el').text()+'\n';
				message+='Skew:	'+$(this).find('skew').text()+'\n\n';
			});
			message+='PWR ERROR: '+$(this).find('power_err').text()+'\n';
			message+='COM ERROR: '+$(this).find('comms_err').text()+'\n';
			message+='DEV ERROR: '+$(this).find('device_err').text()+'\n';
			message+='SYS ERROR: '+$(this).find('sys_err').text()+'\n\n';
		});
		$(xml).find('satellite').each(function() {
			message+='SATELLITE\n';
			message+='AntSat ID: '+$(this).find('antSatID').text()+'\n';
			message+='Sat Name:  '+$(this).find('name').text()+'\n';
			message+='Region:    '+$(this).find('region').text()+'\n';
			message+='Longitude: '+$(this).find('lon').text()+'\n\n';
		});
		$(xml).find('autoswitch').each(function() {
			message+='AUTOSWITCH\n';
			message+='Enable: '+$(this).find('enable').text()+'\n';
			$(this).find('master').each(function() {
				message+='SN:	'+$(this).find('sn').text()+'\n';
				message+='Sat:	'+$(this).find('sat').text()+'\n\n';
			});
		});
		$(xml).find('smartswitch').each(function() {
			message+='SMARTSWITCH\n';
			message+='Available:  '+$(this).find('available').text()+'\n';
			message+='Autoselect: '+$(this).find('autoselect').text()+'\n';
			message+='Input:      '+$(this).find('input').text()+'\n';
			message+='Output:     '+$(this).find('output').text()+'\n\n';
		});
		$(xml).find('dualdome').each(function() {
			message+='DUAL DOME\n';
			message+='Mode:	'+$(this).find('mode').text()+'\n';
			message+='State:	'+$(this).find('state').text()+'\n\n';
		});
		$(xml).find('heading').each(function() {
			message+='HEADING\n';
			message+='Status:	'+$(this).find('status').text()+'\n';
			message+='True:		'+$(this).find('true').text()+'\n';
			message+='Mag:		'+$(this).find('mag').text()+'\n';
			message+='DT:		'+$(this).find('dt').text()+'\n\n';
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function antenna_versions(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='ANTENNA VERSIONS\n\n';
		message+='System:		'+$(xml).find('system').text()+'\n';
		$(xml).find('part').each(function () {
			var parentTag=$(this).parent().get(0).tagName;
			var partData=$(this).text();
			if ('ipacu_response' ==parentTag) {
				message+='Part#:		'+partData+'\n';
				parentTag='';
			}
		});
		message+='Current Ver:	'+$(xml).find('current').text()+'\n';
		message+='Previous Ver:	'+$(xml).find('previous').text()+'\n\n';
		$(xml).find('acu').each(function() {
			message+='ACU\n';
			message+='Model:	'+$(this).find('model').text()+'\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n';
			message+='SN:	'+$(this).find('sn').text()+'\n\n';
		});
		$(xml).find('au').each(function() {
			message+='AU\n';
			message+='Model:	'+$(this).find('model').text()+'\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n';
			message+='SN:	'+$(this).find('sn').text()+'\n\n';
		});
		$(xml).find('rf').each(function() {
			message+='RF\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('az_el').each(function() {
			message+='AZ EL\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('skew_xaz').each(function() {
			message+='SKEW XAZ\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('app').each(function() {
			message+='APP\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('os').each(function() {
			message+='OS\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('sat_list').each(function() {
			message+='SAT LIST\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('fpga').each(function() {
			message+='FPGA\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('lnb').each(function() {
			message+='LNB\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$(xml).find('sensor').each(function() {
			message+='SENSOR\n';
			message+='Part:	'+$(this).find('part').text()+'\n';
			message+='Rev:	'+$(this).find('rev').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n';
			message+='SN:	'+$(this).find('sn').text()+'\n\n';
		});
		$(xml).find('gprs').each(function() {
			message+='GPRS\n';
			message+='IP:	'+$(this).find('ip').text()+'\n';
			message+='Ver:	'+$(this).find('ver').text()+'\n\n';
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function get_antenna_config(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='';
		message+='GET ANTENNA CONFIG\n\n';
		message+='Sidelobe:	'+$(xml).find('sidelobe').text()+'\n';
		message+='Sleep:		'+$(xml).find('sleep').text()+'\n';
		if('set_antenna_config'==$('#chooseSetting').val()){
			$('#fdinOnOff1').val($(xml).find('sidelobe').text());
			$('#fdinOnOff2').val($(xml).find('sleep').text());
		}
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function get_satellite_list(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET SATELLITE LIST\n\n';
		message+='Region Filter:      '+$(xml).find('region_filter').text()+'\n';
		message+='User Choice Filter: '+$(xml).find('user_choice_filter').text()+'\n\n';
		$(xml).find('sat_list').each(function() {
			$(this).find('satellite').each(function() {
				message+='SATELLITE\n';
				message+='List ID:   '+$(this).find('listID').text()+'\n';
				message+='AntSat ID: '+$(this).find('antSatID').text()+'\n';
				message+='Name:      '+$(this).find('name').text()+'\n';
				message+='Region:    '+$(this).find('region').text()+'\n';
				message+='Longitude: '+$(this).find('lon').text()+'\n';
				message+='Enable:    '+$(this).find('enable').text()+'\n';
				message+='Favorite:  '+$(this).find('favorite').text()+'\n';
				message+='Select:    '+$(this).find('select').text()+'\n';
				message+='TriSat ID: '+$(this).find('triSatID').text()+'\n\n';
			});
		});
		$('#response').val( message +'\n');
		return false;
		
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function get_satellite_params_header(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET SATELLITE PARAMS HEADER\n\n';
		message+='Part:         '+$(xml).find('part').text()+'\n';
		message+='Rev:          '+$(xml).find('rev').text()+'\n';
		message+='Rev DT:       '+$(xml).find('rev_dt').text()+'\n';
		message+='Edit DT:      '+$(xml).find('edit_dt').text()+'\n';
		message+='Master Part#: '+$(xml).find('master_part').text()+'\n';
		message+='Master Rev:   '+$(xml).find('master_rev').text()+'\n';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function serial_log_status(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='';
		message+='SERIAL LOG STATUS\n\n';
		message+='DT:		'+$(xml).find('dt').text()+'\n';
		message+='Percent:	'+$(xml).find('percent').text()+'\n';
		message+='Max:		'+$(xml).find('max').text()+'\n';
		message+='Current:	'+$(xml).find('current').text()+'\n';
		
		$('#response').val( message +'\n');
		return false;
		
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_gps(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='';
		message+='GET GPS\n\n';
		message+='State: '+$(xml).find('state').text()+'\n';
		message+='Lat:   '+$(xml).find('lat').text()+'\n';
		message+='Long:  '+$(xml).find('lon').text()+'\n';
		message+='City:  '+$(xml).find('city').text()+'\n';
		
		$('#response').val( message +'\n');
		return false;
		
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_gps_cities(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='';
		message+='GET GPS CITIES\n\n';
		$(xml).find('cities').each(function() {
			message+='City: '+$(this).find('city').text()+'\n';
		});
		
		$('#response').val( message +'\n');
		return false;
		
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_nmea_heading(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET NMEA HEADING\n\n';
		message+='Status:	'+$(xml).find('status').text()+'\n';
		message+='True:		'+$(xml).find('true').text()+'\n';
		message+='Mag:		'+$(xml).find('mag').text()+'\n';
		message+='Sensor:	'+$(xml).find('sensor').text()+'\n';
		message+='Dev:		'+$(xml).find('dev').text()+'\n';
		message+='Var:		'+$(xml).find('var').text()+'\n';
		message+='DT:		'+$(xml).find('dt').text()+'\n';
		message+='NMEA:		'+$(xml).find('nmea').text()+'\n\n';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_nmea_info(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET NMEA INFO\n\n';
		$(xml).find('nmea0183').each(function() {
			message+='NMEA 0183\n';
			message+='Available: '+$(this).find('available').text()+'\n';
			message+='Enabled: '+$(this).find('enable').text()+'\n\n';
			$(this).find('message_list').each(function() {
				$(this).find('nmea_message').each(function() {
					message+='NMEA MESSAGE:\n';
					message+='Name:   '+$(this).find('nmea_name').text()+'\n';
					message+='Source: '+$(this).find('nmea_source').text()+'\n';
				});
			});

		});
		message+='\n';
		$(xml).find('nmea2000').each(function() {
			message+='NMEA 2000\n';
			message+='Available: '+$(this).find('available').text()+'\n';
			message+='Enabled: '+$(this).find('enable').text()+'\n\n';
			$(this).find('message_list').each(function() {
				$(this).find('nmea_message').each(function() {
					message+='NMEA MESSAGE:\n';
					message+='Name:   '+$(this).find('nmea_name').text()+'\n';
					message+='Source: '+$(this).find('nmea_source').text()+'\n';
				});
			});

		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_nmea_config(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET NMEA INFO\n\n';
		$(xml).find('nmea0183').each(function() {
			message+='NMEA 0183\n';
			message+='Enabled: '+$(this).find('enable').text()+'\n\n';
			$(this).find('message_list').each(function() {
				$(this).find('nmea_message').each(function() {
					message+='NMEA MESSAGE:\n';
					message+='Name:   '+$(this).find('nmea_name').text()+'\n';
					message+='Source: '+$(this).find('nmea_source').text()+'\n';
				});
			});

		});
		message+='\n';
		$(xml).find('nmea2000').each(function() {
			message+='NMEA 2000\n';
			message+='Enabled: '+$(this).find('enable').text()+'\n\n';
			$(this).find('message_list').each(function() {
				$(this).find('nmea_message').each(function() {
					message+='NMEA MESSAGE:\n';
					message+='Name:   '+$(this).find('nmea_name').text()+'\n';
					message+='Source: '+$(this).find('nmea_source').text()+'\n';
				});
			});

		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function calibrate_gyro(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function update_satellite_config(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_satellite_group(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_autoswitch_configured_names(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_autoswitch_master(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_directv_service(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_checkswitch_mode(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function power(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message ='';
			message+='POWER\n\n';
		$(xml).find('acu').each(function() {
			message+='ACU\n';
            message+='Input Supply Voltage 15 VDC: '+$(this).find('inputsupplyv').text()+'\n';
			message+='               42 VDC Input: '+$(this).find('input42v').text()+'\n';
			message+='                  Input 24V: '+$(this).find('input24v').text()+'\n';
			message+='                      8 VDC: '+$(this).find('eight').text()+'\n';
            message+='                      5 VDC: '+$(this).find('five').text()+'\n';
			message+='                    3.3 VDC: '+$(this).find('three_three').text()+'\n';
			message+='              42 VDC Output: '+$(this).find('output42v').text()+'\n';
			message+='              24 VDC Output: '+$(this).find('output24v').text()+'\n';
            message+='               Temp Celsius: '+$(this).find('temp_celsius').text()+'\n\n';
		});
		$(xml).find('au').each(function() {
			message+='AU\n';
			message+='  Main 48 VDC: '+$(this).find('dc').text()+'\n';
			message+=' Motor 32 VDC: '+$(this).find('motor').text()+'\n';
			message+='        8 VDC: '+$(this).find('eight').text()+'\n';
			message+='        5 VDC: '+$(this).find('five').text()+'\n';
			message+='LNB 13/18 VDC: '+$(this).find('lnb').text()+'\n';
			message+=' Temp Celsius: '+$(this).find('temp_celsius').text()+'\n\n';
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function ophours(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message ='OPHOURS\n\n';
			message+='Hours:	'+$(xml).find('hours').text()+'\n';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_message_protocol_version(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message ='GET MESSAGE PROTOCOL VERSION\n\n';
			message+='Version:	'+$(xml).find('version').text()+'\n';
			message+='System:		'+$(xml).find('system').text()+'\n';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_vessel_config(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message ='GET VESSEL CONFIG\n\n';
			message+='Name:	'+$(xml).find('name').text()+'\n';
			message+='Feet:	'+$(xml).find('feet').text()+'\n';
			message+='Mount:	'+$(xml).find('antenna_mount').text()+'\n';
		if('set_vessel_config'==$('#chooseSetting').val()){
			$('#fdin1').val($(xml).find('name').text());
			$('#fdin2').val($(xml).find('feet').text());
			$('#fdin3').val($(xml).find('antenna_mount').text());
		}
		$('#response').val( message +'\n');
		return false;
		
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_eth(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message ='GET ETH\n\n';
			message+='Mode:      '+$(xml).find('mode').text()+'\n';
			message+='IP:        '+$(xml).find('ip').text()+'\n';
			message+='Netmask:   '+$(xml).find('netmask').text()+'\n';
			message+='Gateway:   '+$(xml).find('gateway').text()+'\n';
			message+='Broadcast: '+$(xml).find('broadcast').text()+'\n';
		if('set_eth'==$('#chooseSetting').val()){
			$('#fdinETHMode').val($(xml).find('mode').text());
			if('STATIC'==$(xml).find('mode').text()){
				$('#field_1').removeClass('hideField');
				$('#field_2').removeClass('hideField');
				$('#field_3').removeClass('hideField');
				$('#field_4').removeClass('hideField');
			}
			$('#fdin1').val($(xml).find('ip').text());
			$('#fdin2').val($(xml).find('netmask').text());
			$('#fdin3').val($(xml).find('gateway').text());
			$('#fdin4').val($(xml).find('broadcast').text());
		}
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_wlan(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message ='';
			message+='GET WLAN\n\n';
		var modeData='';
		$(xml).find('mode').each(function () {
			var parentTag=$(this).parent().get(0).tagName;
			if('ipacu_response'==parentTag) {
				modeData=$(this).text();
				message+='Mode: '+modeData+'\n\n';
				parentTag='';
				if('set_wlan'==$('#chooseSetting').val()){
					$('#fdinWLANMode').val(modeData);
				}
			}
		});
		$(xml).find('adhoc_mode').each(function() {
			$(this).find('security').each(function() {
				if ('OFF'==modeData||'ADHOC'==modeData){
					message+='SECURITY\n';
					message+='Mode: '+$(this).find('mode').text()+'\n';
					if('WEP'==$(this).find('mode').text()){
						message+='Key:  '+$(this).find('key').text()+'\n';
					}
				}
				$('#fdinADHOCMode').val($(this).find('mode').text());
				$('#fdin1').val($(this).find('key').text());
			});
			if ('OFF'==modeData||'ADHOC'==modeData){
				message+='\nIP:   '+$(this).find('ip').text()+'\n\n';
			}
			$('#fdin3').val($(this).find('ip').text());
			if('set_wlan'==$('#chooseSetting').val()){
				$('#fdADHOCM').html('Security');
				if('WEP'==$(this).find('mode').text()){
					$('#field_1').removeClass('hideField');
					$('#fd1').html('Password');
				}
				
			}
		});
		$(xml).find('if_mode').each(function() {
			$(this).find('mode').each(function() {
				var parentTag=$(this).parent().get(0).tagName;
				if('if_mode'==parentTag){
					if ('IF'==modeData){
						message+='Mode: '+$(this).text()+'\n\n';
					}
					if('set_wlan'==$('#chooseSetting').val()){
						$('#fdinIFMode').val($(this).text());
						if ('IF'==modeData){
							if('STATIC'==$(this).text()){
								$('#field_IFSecurityMode').removeClass('hideField');
								$('#fdIFSec').html('Security');
								$('#field_2').removeClass('hideField');
								$('#field_4').removeClass('hideField');
								$('#field_5').removeClass('hideField');
								$('#field_6').removeClass('hideField');
								$('#field_7').removeClass('hideField');
							} else if('DYNAMIC'==$(this).text() ){
								$('#field_IFSecurityMode').removeClass('hideField');
								$('#fdIFSec').html('Security');
								$('#field_2').removeClass('hideField');
							}
						}
					}
				}
			});
			
			if ('IF'==modeData){
				
				message+='ESSID: '+$(this).find('essid').text()+'\n\n';
				$(this).find('security').each(function() {
					message+='SECURITY\n';
					message+='Mode:      '+$(this).find('mode').text()+'\n';
					message+='Algorithm: '+$(this).find('algorithm').text()+'\n';
					message+='Key:       '+$(this).find('key').text()+'\n\n';
				});
				message+='IP:        '+$(this).find('ip').text()+'\n';
				message+='Netmask:   '+$(this).find('netmask').text()+'\n';
				message+='Gateway:   '+$(this).find('gateway').text()+'\n';
				message+='Broadcast: '+$(this).find('broadcast').text()+'\n\n';
			}
			
			if('set_wlan'==$('#chooseSetting').val()){
				if ('IF'==modeData){
					$('#field_IFMode').removeClass('hideField');
				}
				$('#fdIFM').html('Mode');
				$('#fdin1').val($(this).find('key').text());
				$('#fd1').html('Password');
				$('#fdin2').val($(this).find('essid').text());
				$('#fd2').html('ESSID');
				$('#fdin4').val($(this).find('ip').text());
				$('#fd4').html('IP');
				$('#fdin5').val($(this).find('netmask').text());
				$('#fd5').html('Netmask');
				$('#fdin6').val($(this).find('gateway').text());
				$('#fd6').html('Gateway');
				$('#fdin7').val($(this).find('broadcast').text());
				$('#fd7').html('Broadcast');
			}
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_wlan_factory(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_serial_log(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='GET SERIAL LOG\n\n';
			message+='Start DT: '+$(xml).find('start_dt').text()+'\n';
			message+='Content:   '+$(xml).find('content').text()+'\n';
		$('#response').val( message +'\n');
		return false;
	}else{
		if("8"==error){
			$('#response').val('ERROR# No log to retrieve.\n');
		
		}else{
			$('#response').val('ERROR: '+returnError(error)+'\n');
			
		}
		return false;
	}
}
function get_event_history_log(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='GET EVENT HISTORY LOG\n\n';
			message+='Content: '+$(xml).find('content').text()+'\n';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_event_history_count(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='GET EVENT HISTORY COUNT\n\n';
			message+='Event Count: '+$(xml).find('event_count').text()+'\n';
			if('get_recent_event_history'==$('#chooseSetting').val()){
				error_log_nav('navDownToLimit');
			}
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_product_registration(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message ='GET PRODUCT REGISTRATION\n\n';
		$(xml).find('user').each(function() {
			message+='User\n';
			message+='First Name: '+$(this).find('firstname').text()+'\n';
			message+='Last Name:  '+$(this).find('lastname').text()+'\n';
			message+='Salutation: '+$(this).find('salutation').text()+'\n';
			message+='Title:      '+$(this).find('title').text()+'\n';
			message+='Email:      '+$(this).find('email').text()+'\n';
			message+='Company:    '+$(this).find('company').text()+'\n';
			message+='Addr1:      '+$(this).find('addr1').text()+'\n';
			message+='Addr2:      '+$(this).find('addr2').text()+'\n';
			message+='City:       '+$(this).find('city').text()+'\n';
			message+='State:      '+$(this).find('state').text()+'\n';
			message+='Country:    '+$(this).find('country').text()+'\n';
			message+='Zip:        '+$(this).find('zip').text()+'\n';
			message+='Phone:      '+$(this).find('phone').text()+'\n';
			message+='Mobile:     '+$(this).find('mobile').text()+'\n';
			message+='Fax:        '+$(this).find('fax').text()+'\n';
			message+='Website:    '+$(this).find('website').text()+'\n\n';
		});
		$(xml).find('dealer').each(function() {
			message+='Dealer\n';
			message+='Company:         '+$(this).find('company').text()+'\n';
			message+='State:           '+$(this).find('state').text()+'\n';
			message+='Country:         '+$(this).find('country').text()+'\n';
			message+='Installer Name:  '+$(this).find('installer_name').text()+'\n';
			message+='Installer Email: '+$(this).find('installer_email').text()+'\n';
			message+='Installer Phone: '+$(this).find('installer_phone').text()+'\n\n';
		});
		$(xml).find('product').each(function() {
			message+='Product\n';
			message+='ACU Model:     '+$(this).find('acu_model').text()+'\n';
			message+='ACU SN:        '+$(this).find('acu_sn').text()+'\n';
			message+='ANT Model:     '+$(this).find('ant_model').text()+'\n';
			message+='ANT SN:        '+$(this).find('ant_sn').text()+'\n';
			message+='Market:        '+$(this).find('market').text()+'\n';
			message+='Sector:        '+$(this).find('sector').text()+'\n';
			message+='Line:          '+$(this).find('line').text()+'\n';
			message+='Platform:      '+$(this).find('platform').text()+'\n';
			message+='Purchase Date: '+$(this).find('purch_date').text()+'\n';
			message+='Vessel Name:   '+$(this).find('vessel_name').text()+'\n';
			message+='Vessel Length: '+$(this).find('vessel_length').text()+'\n';
			message+='Vessel Year:   '+$(this).find('vessel_year').text()+'\n\n';
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_satellite_groups(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='GET SATELLITE GROUPS\n\n';
		$(xml).find('group_list').each(function() {
			$(this).find('group').each(function() {
				message+='GROUP\n';
				message+='Group Name: '+$(this).find('group_name').text()+'\n';
				message+='Predefined: '+$(this).find('predefined').text()+'\n';
				message+='A:          '+$(this).find('A').text()+'\n';
				if(''!=$(this).find('B').text()){
					message+='B:          '+$(this).find('B').text()+'\n';
				}
				if(''!=$(this).find('C').text()){
					message+='C:          '+$(this).find('C').text()+'\n';
				}
				if(''!=$(this).find('D').text()){
					message+='D:          '+$(this).find('D').text()+'\n';
				}
				message+='\n';
			});
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_autoswitch_status(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET AUTOSWITCH STATUS\n\n';
		message+='Available:       '+$(xml).find('available').text()+'\n';
		message+='Enable:          '+$(xml).find('enable').eq(0).text()+'\n';
		message+='Service:         '+$(xml).find('service').text()+'\n';
		if('' != $(xml).find('service_subtype').text()){
			message+='Service Subtype: '+$(xml).find('service_subtype').text()+'\n';
		}
		message+='\n';
		$(xml).find('master').each(function() {
			message+='MASTER\n';
			message+='SN:      '+$(this).find('sn').text()+'\n';
			message+='Valid:   '+$(this).find('valid').text()+'\n';
			message+='Sat:     '+$(this).find('sat').text()+'\n';
			message+='Tone:    '+$(this).find('tone').text()+'\n';
			message+='Voltage: '+$(this).find('voltage').text()+'\n\n';
		});
		$(xml).find('active_list').each(function() {
			$(this).find('autoswitch').each(function() {
				message+='AUTOSWITCH\n';
				message+='SN:	'+$(this).find('sn').text()+'\n';
				message+='Name:	'+$(this).find('name').text()+'\n\n';
			});
		});
		message+='Satellite Group: '+$(xml).find('satellite_group').text()+'\n\n';
		$(xml).find('satellites').each(function() {
			$(this).find('A').each(function() {
				message+='A\n';
				message+='List ID:    '+$(this).find('listID').text()+'\n';
				message+='Ant Sat ID: '+$(this).find('antSatID').text()+'\n';
				message+='Name:       '+$(this).find('name').text()+'\n';
				message+='Region:     '+$(this).find('region').text()+'\n';
				message+='Lon:        '+$(this).find('lon').text()+'\n';
				message+='Enable:     '+$(this).find('enable').text()+'\n';
				message+='Favorite:   '+$(this).find('favorite').text()+'\n\n';
			});
			$(this).find('B').each(function() {
				if ($(this).find('listID').text()){
					message+='B\n';
					message+='List ID:    '+$(this).find('listID').text()+'\n';
					message+='Ant Sat ID: '+$(this).find('antSatID').text()+'\n';
					message+='Name:       '+$(this).find('name').text()+'\n';
					message+='Region:     '+$(this).find('region').text()+'\n';
					message+='Lon:        '+$(this).find('lon').text()+'\n';
					message+='Enable:     '+$(this).find('enable').text()+'\n';
					message+='Favorite:   '+$(this).find('favorite').text()+'\n\n';
				}
			});
			$(this).find('C').each(function() {
				if ($(this).find('listID').text()){
					message+='C\n';
					message+='List ID:    '+$(this).find('listID').text()+'\n';
					message+='Ant Sat ID: '+$(this).find('antSatID').text()+'\n';
					message+='Name:       '+$(this).find('name').text()+'\n';
					message+='Region:     '+$(this).find('region').text()+'\n';
					message+='Lon:        '+$(this).find('lon').text()+'\n';
					message+='Enable:     '+$(this).find('enable').text()+'\n';
					message+='Favorite:   '+$(this).find('favorite').text()+'\n\n';
				}
			});
			$(this).find('D').each(function() {
				if ($(this).find('listID').text()){
					message+='D\n';
					message+='List ID:    '+$(this).find('listID').text()+'\n';
					message+='Ant Sat ID: '+$(this).find('antSatID').text()+'\n';
					message+='Name:       '+$(this).find('name').text()+'\n';
					message+='Region:     '+$(this).find('region').text()+'\n';
					message+='Lon:        '+$(this).find('lon').text()+'\n';
					message+='Enable:     '+$(this).find('enable').text()+'\n';
					message+='Favorite:   '+$(this).find('favorite').text()+'\n\n';
				}
			});
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function get_autoswitch_configured_names(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET AUTOSWITCH CONFIGURED NAMES\n\n';
		message+='Available: '+$(xml).find('available').text()+'\n';
		message+='Enable:    '+$(xml).find('enable').text()+'\n\n';
		$(xml).find('autoswitch_list').each(function() {
			$(this).find('autoswitch').each(function() {
				message+='AUTOSWITCH\n';
				message+='SN:        '+$(this).find('sn').text()+'\n';
				message+='Name:      '+$(this).find('name').text()+'\n\n';
			});
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function get_directv_service(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET DIRECTV SERVICE\n\n';
		message+='Enable:     '+$(xml).find('enable').text()+'\n\n';
		$(xml).find('receiver_list').each(function() {
			message+='IP Address: '+$(this).find('ip_address').text()+'\n';
		});
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function get_checkswitch_mode(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET CHECKSWITCH MODE\n\n';
		message+='Enable: '+$(xml).find('enable').text()+'\n\n';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}

get_details = function(xml){
	var xmlReq='<ipacu_request><message name="antenna_status" /></ipacu_request>';
    $.ajax({
        type: 'post',
        url: 'webservice.php',
        contentType : 'text/xml',
        processData : false,
        dataType : 'xml',
        data : xmlReq,
        success: function(xml) 
        {
			var error=$(xml).find('message').attr('error');
			if('0'==$(xml).find('message').attr('error')){
				$(xml).find('antenna').each(function() {
					
					var perr=$(this).find('power_err').text();
					var cerr=$(this).find('comms_err').text();
					var derr=$(this).find('device_err').text();
					var serr=$(this).find('sys_err').text();
					var message='GET DETAILS\n\n';
					// ******* Power Status *******
					if('' != perr){
						message+='POWER ('+perr+')\n';
						if(perr & 0x0001){
							message+='ERROR ACU 50V Power Supply\n';
						
						}else{
							message+='OK ACU 50V Power Supply\n';
						
						}
					  
						if(perr & 0x0002){
							message+='ERROR ACU 24V Power Supply\n';
						
						}else{
							message+='OK ACU 24V Power Supply\n';
						
						}
		
						if(perr & 0x0004){
							message+='ERROR Antenna Open\n';
						
						}else{
							message+='OK Antenna Open\n';
						
						}
		
						if(perr & 0x0008){
							message+='ERROR Antenna Short\n';
						
						}else{
							message+='OK Antenna Short\n';
						
						}
						
						if(perr & 0x0010){
							message+='ERROR 24V Out Power (GPRS/SmartSwitch)\n';
						
						}else{
							message+='OK 24V Out Power (GPRS/SmartSwitch)\n';
						
						}
						
						if(perr & 0x0020){
							message+='ERROR Antenna Power Supply\n';
						
						}else{
							message+='OK Antenna Power Supply\n';
						
						}
						
						if(perr & 0x0040){
							message+='ERROR 13V Out Power (LNB/Sensor)\n\n';
						
						}else{
							message+='OK 13V Out Power (LNB/Sensor)\n\n';
						
						}
					
					}else{
						message+='POWER STATUS NOT AVAILABLE\n';
						
					}
	
	
					// ******* Communication Status *******
					if('' != cerr){
						message+='COMMUNICATIONS ('+cerr+')\n';
						if(cerr & 0x0001){
							message+='ERROR ACU to Antenna\n';
						
						}else{
							message+='OK ACU to Antenna\n';
						
						}
						
						if(cerr & 0x0002){
							message+='ERROR AZ/EL Motor to Antenna\n';
						
						}else{
							message+='OK AZ/EL Motor to Antenna\n';
						
						}
						
						if(cerr & 0x0004){
							message+='ERROR Skew/XAZ Motor to Antenna\n';
						
						}else{
							message+='OK Skew/XAZ Motor to Antenna\n';
						
						}
						
						if(cerr & 0x0008){
							message+='ERROR RF Controller to Antenna\n';
						
						}else{
							message+='OK RF Controller to Antenna\n';
						
						}
						
						if(cerr & 0x0010){
							message+='ERROR World LNB to Antenna\n';
						
						}else{
							message+='OK World LNB to Antenna\n';
						
						}
						
						if(cerr & 0x0020){
							message+='ERROR Sensor Module to Antenna\n';
						
						}else{
							message+='OK Sensor Module to Antenna\n';
						
						}
						
						if(cerr & 0x0040){
							message+='ERROR SBC Communications\n';
						
						}else{
							message+='OK SBC Communications\n';
						
						}
						
						if(cerr & 0x0080){
							message+='ERROR RF to Tuner Communications\n';
						
						}else{
							message+='OK RF to Tuner Communications\n';
						
						}
						
						if(cerr & 0x0100){
							message+='ERROR RF to FPGA Communications\n\n';
						
						}else{
							message+='OK RF to FPGA Communications\n\n';
						
						}
					
					}else{
						message+='COMMUNICATIONS STATUS NOT AVAILABLE\n';
						
					}
	
					// ******* Device Status *******
					if('' != derr){
						message+='DEVICE ('+derr+')\n';
						if(derr & 0x000001){
							message+='ERROR AZ Motor Over/Under Current\n';
						
						}else{
							message+='OK AZ Motor Over/Under Current\n';
						
						}
						
						if(derr & 0x000002){
							message+='ERROR EL Motor Over/Under Current\n';
						
						}else{
							message+='OK EL Motor Over/Under Current\n';
						
						}
						
						if(derr & 0x000004){
							message+='ERROR Skew Motor Over/Under Current\n';
						
						}else{
							message+='OK Skew Motor Over/Under Current\n';
						
						}
						
						if(derr & 0x000008){
							message+='ERROR XAZ Motor Over/Under Current\n';
						
						}else{
							message+='OK XAZ Motor Over/Under Current\n';
						
						}
						
						if(derr & 0x000010){
							message+='ERROR Antenna Gyro Bias\n';
						
						}else{
							message+='OK Antenna Gyro Bias\n';
						
						}
						
						if(derr & 0x000020){
							message+='ERROR GPS\n';
						
						}else{
							message+='OK GPS\n';
						
						}
						
						if( derr & 0x000040){
							message+='ERROR SNR Out of Range\n';
						
						}else{
							message+='OK SNR Out of Range\n';
						
						}
						
						if( derr & 0x000080){
							message+='ERROR Antenna Gyro Scale Factor\n';
						
						}else{
							message+='OK Antenna Gyro Scale Factor\n';
						
						}
						
						if( derr & 0x000100){
							message+='ERROR Sensor board Gyro or Accel\n';
						
						}else{
							message+='OK Sensor board Gyro or Accel\n';
						
						}
						
						if( derr & 0x000200){
							message+='ERROR RF Tuner Initialization\n';
						
						}else{
							message+='OK RF Tuner Initialization\n';
						
						}
						
						if( derr & 0x000400){
							message+='ERROR RF FPGA Tuner Firmware\n';
						
						}else{
							message+='OK RF FPGA Tuner Firmware\n';
						
						}
						
						if( derr & 0x000800){
							message+='ERROR Sensor board calibration\n';
						
						}else{
							message+='OK Sensor board calibration\n';
						
						}
						
						if( derr & 0x001000){
							message+='ERROR AZ Limit Switch\n';
						
						}else{
							message+='OK AZ Limit Switch\n';
						
						}
						
						if( derr & 0x002000){
							message+='ERROR EL Limit Switch\n';
						
						}else{
							message+='OK EL Limit Switch\n';
						
						}
						
						if( derr & 0x004000){
							message+='ERROR Skew Limit Switch\n';
						
						}else{
							message+='OK Skew Limit Switch\n';
						
						}
						
						if( derr & 0x008000){
							message+='ERROR XAZ Limit Switch\n';
						
						}else{
							message+='OK XAZ Limit Switch\n';
						
						}
						
						if( derr & 0x010000){
							message+='ERROR ACU EEPROM\n';
						
						}else{
							message+='OK ACU EEPROM\n';
						
						}
						
						if( derr & 0x020000){
							message+='ERROR Sensor Board EEPROM\n';
						
						}else{
							message+='OK Sensor Board EEPROM\n';
						
						}
						

						if( derr & 0x040000){
							message+='ERROR Antenna Default Condition\n';
						
						}else{
							message+='OK Antenna Default Condition\n';
						
						}
						
						if( derr & 0x080000){
							message+='ERROR RF FPGA Initialization\n';
						
						}else{
							message+='OK RF FPGA Initialization\n';
						
						}
						
						if( derr & 0x100000){
							message+='ERROR Phase Card Position\n\n';
						
						}else{
							message+='OK Phase Card Position\n\n';
						
						}
					
					}else{
						message+='DEVICE STATUS NOT AVAILABLE\n';
						
					}
				  
					// ******* System Status *******
					if('' != serr){
						message+='SYSTEM ('+serr+')\n';
						if( serr & 0x0001){
							message+='ERROR ACU Over Temperature\n';
						
						}else{
							message+='OK ACU Over Temperature\n';
						
						}
						
						if(serr & 0x0002){
							message+='ERROR Antenna Over Temperature\n';
						
						}else{
							message+='OK Antenna Over Temperature\n';
						
						}
						
						if(serr & 0x0004){
							message+='ERROR RF Configuration\n';
						
						}else{
							message+='OK RF Configuration\n';
						
						}
						
						if(serr & 0x0008){
							message+='ERROR LNB Configuration\n';
						
						}else{
							message+='OK LNB Configuration\n';
						
						}
						
						if(serr & 0x0010){
							message+='ERROR Sensor Board Over Temperature\n\n';
						
						}else{
							message+='OK Sensor Board Over Temperature\n\n';
						
						}
					
					}else{
						message+='SYSTEM STATUS NOT AVAILABLE\n';
						
					}
					
					$('#response').val( message +'\n');
				  
				});
			}else{
				$('#response').val('ERROR: '+returnError(error)+'\n');
			}
        },  
        error: function(jqXHR, textStatus, errorThrown) 
        {
            $('#response').val('ERROR: '+textStatus+'\n');
        }
		
    });
	
}

$('#chooseSetting').change(function(){
	
	switch ($('#chooseSetting').val()) { 
        case 'set_antenna_config':
			clearWindow();
			$('#field_OnOff1').removeClass('hideField');
			$('#field_OnOff2').removeClass('hideField');
			$('#fdOnOff1').html('Sidelobe');
			$('#fdOnOff2').html('Sleep');
			SendGetCommand('get_antenna_config');
            break; 
        case 'select_satellite':
			clearWindow();
			$('#field_AntSatID').removeClass('hideField');
			$('#fdASID').html('AntSatID');
			break;
		case 'set_satellite_identity':
			clearWindow();
			$('#field_AntSatID').removeClass('hideField');
			$('#fdASID').html('AntSatID');
			$('#field_SendRequest').addClass('hideField');
			$('#field_FetchData').removeClass('hideField');
			break;
		case 'get_satellite_params':
			clearWindow();
			$('#field_AntSatID').removeClass('hideField');
			$('#fdASID').html('AntSatID');
			break;
		case 'set_satellite_params':
			clearWindow();
			$('#field_AntSatID').removeClass('hideField');
			$('#fdASID').html('AntSatID');
			$('#field_SendRequest').addClass('hideField');
			$('#field_FetchData').removeClass('hideField');
			break;
		case 'reset_satellite_params':
			clearWindow();
			$('#field_AntSatID').removeClass('hideField');
			$('#fdASID').html('AntSatID');
			break;
		case 'start_serial_log':
			clearWindow();
			$('#field_YesNo1').removeClass('hideField');
			$('#fdYN1').html('With Restart');
			break;
		case 'reboot':
			clearWindow();
			$('#field_SystemReboot').removeClass('hideField');
			$('#fdSysReb').html('Options');
			break;
		case 'reset_software':
			clearWindow();
			$('#field_ResetSoftware').removeClass('hideField');
			$('#fdReSof').html('Rollback');
			break;
		case 'set_vessel_config':
			clearWindow();
			$('#field_1').removeClass('hideField');
			$('#field_2').removeClass('hideField');
			$('#field_3').removeClass('hideField');
			$('#fd1').html('Name');
			$('#fd2').html('Lenght (ft)');
			$('#fd3').html('Mount Angle');
			SendGetCommand('get_vessel_config');
			break;
		case 'set_eth':
			clearWindow();
			$('#field_ETHMode').removeClass('hideField');
			$('#fdETHM').html('Mode');
			SendGetCommand('get_eth');
			break;
		case 'set_wlan':
			clearWindow();
			$('#field_WLANMode').removeClass('hideField');
			$('#fdWLANM').html('Mode');
			SendGetCommand('get_wlan');
			break;
		case 'set_smartswitch':
			clearWindow();
			$('#field_YesNo1').removeClass('hideField');
			$('#fdYN1').html('Enable');
			$('#field_YesNo2').removeClass('hideField');
			$('#fdYN2').html('Autoselect');
			$('#field_AB').removeClass('hideField');
			$('#fdAB').html('Input');
			$('#field_123').removeClass('hideField');
			$('#fd123').html('Output');
			SendGetCommand('get_smartswitch_status');
			break;
		case 'set_smartswitch_config':
			clearWindow();
			$('#field_1').removeClass('hideField');
			$('#fd1').html('Input A Name');
			$('#field_YesNo1').removeClass('hideField');
			$('#fdYN1').html('Enable');
			$('#field_2').removeClass('hideField');
			$('#fd2').html('Input B Name');
			$('#field_YesNo2').removeClass('hideField');
			$('#fdYN2').html('Enable');
			$('#field_3').removeClass('hideField');
			$('#fd3').html('Output 1 Name');
			$('#field_YesNo3').removeClass('hideField');
			$('#fdYN3').html('Enable');
			$('#field_4').removeClass('hideField');
			$('#fd4').html('Output 2 Name');
			$('#field_YesNo4').removeClass('hideField');
			$('#fdYN4').html('Enable');
			$('#field_5').removeClass('hideField');
			$('#fd5').html('Output 3 Name');
			$('#field_YesNo5').removeClass('hideField');
			$('#fdYN5').html('Enable');
			SendGetCommand('get_smartswitch_config');
			break;
		case 'set_dualdome_config':
			clearWindow();
			$('#field_MasterSlaveMode').removeClass('hideField');
			$('#fdMSM').html('Mode');
			SendGetCommand('get_dualdome_status');
			break;
		case 'get_recent_event_history':
			clearWindow();
			$('#field_NavCount').removeClass('hideField');
			$('#fdNC').html('Lines Displayed');
			$('#field_NavThruHistory').removeClass('hideField');
			break;
		case 'set_gps':
			clearWindow();
			$('#field_1').removeClass('hideField');
			$('#fd1').html('Lat:');
			$('#field_2').removeClass('hideField');
			$('#fd2').html('Lon:');
			break;
		case 'get_config_file':
			clearWindow();
			$('#field_1').removeClass('hideField');
			$('#fd1').html('File Name');
			break;
		case 'set_config_file':
			clearWindow();
			$('#field_upload').removeClass('hideField');
			$('#fdul').html('Upload');
			break;
		case 'set_satellite_group':
			clearWindow();
			$('#field_AddDel').removeClass('hideField');
			$('#fdAD').html('Command');
			$('#field_6').removeClass('hideField');
			$('#fd6').html('Group Name');
			$('#field_SatA').removeClass('hideField');
			$('#fdSA').html('A');
			$('#field_SatB').removeClass('hideField');
			$('#fdSB').html('B');
			$('#field_SatC').removeClass('hideField');
			$('#fdSC').html('C');
			$('#field_SatD').removeClass('hideField');
			$('#fdSD').html('D');
			SendGetCommand('get_satellite_groups');
			break;
		case 'set_autoswitch_configured_names':
			clearWindow();
			$('#field_AddDelAll').removeClass('hideField');
			$('#fdADA').html('Command');
			$('#field_6').removeClass('hideField');
			$('#fd6').html('Serial Number');
			$('#field_7').removeClass('hideField');
			$('#fd7').html('Name');
			break;
		case 'set_autoswitch_master':
			clearWindow();
			$('#field_AutoswitchNames').removeClass('hideField');
			$('#fdAN').html('Serial Number');
			break;
		case 'set_directv_service':
			clearWindow();
			$('#field_YesNo1').removeClass('hideField');
			$('#fdYN1').html('Enable');
			$('#field_6').removeClass('hideField');
			$('#fd6').html('Serial Number');
			break;
		case 'set_checkswitch_mode':
			clearWindow();
			$('#field_YesNo1').removeClass('hideField');
			$('#fdYN1').html('Enable');
			break;

		default:
			clearWindow();
			break;
	}
});
$('#chooseSetting').change(function(){
	if(''==$('#chooseSetting').val()){ 
		$('#field_SendRequest').addClass('hideField');
	}else{
		if('set_satellite_identity' != $('#chooseSetting').val() && 'set_satellite_params' != $('#chooseSetting').val()){
			$('#field_SendRequest').removeClass('hideField');
		}
	}
});
$('#fdinAddDel').change(function(){
	if('DELETE'==$('#fdinAddDel').val()){ 
		$('#field_6').addClass('hideField');
		$('#field_SatA').addClass('hideField');
		$('#field_SatB').addClass('hideField');
		$('#field_SatC').addClass('hideField');
		$('#field_SatD').addClass('hideField');
		$('#fdGN').html('Group Name');
		$('#field_GroupNames').removeClass('hideField');
	}else{
		$('#field_6').removeClass('hideField');
		$('#field_SatA').removeClass('hideField');
		$('#field_SatB').removeClass('hideField');
		$('#field_SatC').removeClass('hideField');
		$('#field_SatD').removeClass('hideField');
		$('#field_GroupNames').addClass('hideField');
	}
});
$('#fdinAddDelAll').change(function(){
	if('DELETE'==$('#fdinAddDelAll').val()){ 
		$('#field_6').addClass('hideField');
		$('#field_7').addClass('hideField');
		$('#field_AutoswitchNames').removeClass('hideField');
		$('#fdAN').html('Serial Number');
	}else if('DELETE_ALL'==$('#fdinAddDelAll').val()){ 
		$('#field_6').addClass('hideField');
		$('#field_7').addClass('hideField');
		$('#field_AutoswitchNames').addClass('hideField');
	}else{
		$('#field_6').removeClass('hideField');
		$('#fd6').html('Serial Number');
		$('#field_7').removeClass('hideField');
		$('#fd7').html('Name');
		$('#field_AutoswitchNames').addClass('hideField');
	}
});
function set_antenna_config(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function select_satellite(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_satellite_identity(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_satellite_params(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='';
		message+='GET SATELLITE PARAMS\n\n';
		message+='listID:   '+$(xml).find('listID').text()+'\n';
		message+='antSatID: '+$(xml).find('antSatID').text()+'\n';
		message+='name:     '+$(xml).find('name').text()+'\n';
		message+='region:   '+$(xml).find('region').text()+'\n';
		message+='lon:      '+$(xml).find('lon').text()+'\n';
		message+='skew:     '+$(xml).find('skew').text()+'\n';
		message+='dt:       '+$(xml).find('dt').text()+'\n';
		message+='enable:   '+$(xml).find('enable').text()+'\n';
		message+='favorite: '+$(xml).find('favorite').text()+'\n';
		message+='select:   '+$(xml).find('select').text()+'\n';
		message+='triSatID: '+$(xml).find('triSatID').text()+'\n';
		message+='lo1:      '+$(xml).find('lo1').text()+'\n';
		message+='lo2:      '+$(xml).find('lo2').text()+'\n\n';
		$(xml).find('xponder').each(function() {
			message+='XPONDER '+$(this).find('id').text()+'\n';
			message+='Polorization: '+$(this).find('pol').text()+'\n';
			message+='Band:         '+$(this).find('band').text()+'\n';
			message+='Frequency:    '+$(this).find('freq').text()+'\n';
			message+='Symbol Rate:  '+$(this).find('symRate').text()+'\n';
			message+='FEC:          '+$(this).find('fec').text()+'\n';
			message+='Network ID:   '+$(this).find('netID').text()+'\n';
			message+='Mod Type:     '+$(this).find('modType').text()+'\n\n';
			if('set_satellite_params'==$('#chooseSetting').val() && $('#fdinXponder').val() ==$(this).find('id').text()){
				$('#fdinPolarity').val($(this).find('pol').text());
				$('#fdinBand').val($(this).find('band').text());
				$('#fdin1').val($(this).find('freq').text());
				$('#fdin2').val($(this).find('symRate').text());
				$('#fdinFECCode').val($(this).find('fec').text());
				$('#fdin3').val($(this).find('netID').text());
				$('#fdinDecoderType').val($(this).find('modType').text());
			}
		});
		if('set_satellite_identity'==$('#chooseSetting').val()){
			$('#fdin1').val($(xml).find('name').text());
			$('#fdinRegion').val($(xml).find('region').text());
			$('#fdin2').val($(xml).find('lon').text());
			$('#fdin3').val($(xml).find('skew').text());
			('TRUE'==$(xml).find('enable').text()) ? $('#field_En').attr('checked','checked') : $('#field_En').attr('checked','');
			('TRUE'==$(xml).find('favorite').text()) ? $('#field_Fav').attr('checked','checked') : $('#field_Fav').attr('checked','');
			('TRUE'==$(xml).find('select').text()) ? $('#field_Sel').attr('checked','checked') : $('#field_Sel').attr('checked','');
			$('#fdin4').val($(xml).find('triSatID').text());
			$('#fdin5').val($(xml).find('lo1').text());
			$('#fdin6').val($(xml).find('lo2').text());
		}
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}	
}
function set_satellite_params(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function reset_satellite_params(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function start_serial_log(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function reboot(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function reset_software(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function reset_user_password(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_vessel_config(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_eth(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_eth_factory(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_wlan(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_smartswitch(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_smartswitch_config(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_dualdome_config(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function set_gps(xml)
{
	var error=$(xml).find('message').attr('error');
	if('0'==error){
		var message='Successfully Sent';
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}
function get_config_file(xml)
{
	var error=$(xml).find('message').attr('error');
			
	if('0'==error){
		var message='GET CONF FILE\n\n';
			message+= $(xml).find('content').text()+'\n';
			
		$('#response').val( message +'\n');
		return false;
	}else{
		$('#response').val('ERROR: '+returnError(error)+'\n');
		return false;
	}
}

var upperLimit=0;
var beginAt   =0;
var howMany   =0;
var numberOfLines=10;
$('#fdinNavCount').change(function(){
	numberOfLines=$('#fdinNavCount').val();
	error_log_nav('navDownToLimit');
	return(false);
});
$('#fdinNavThruHistoryOldest').click(function(){
	error_log_nav('navUpToLimit')
	return(false);
});
$('#fdinNavThruHistoryOlder').click(function(){
	error_log_nav('navUp')
	return(false);
});
$('#fdinNavThruHistoryNewer').click(function(){
	error_log_nav('navDown')
	return(false);
});
$('#fdinNavThruHistoryNewest').click(function(){
	error_log_nav('navDownToLimit')
	return(false);
});
function error_log_nav(navType)
{
    var xmlReq='<ipacu_request><message name="get_event_history_count" /></ipacu_request>';
    $.ajax({
        type: 'post',
        url: 'webservice.php',
        contentType : 'text/xml',
        processData : false,
        dataType : 'xml',
        data : xmlReq,
        success: function(xml) 
        {
            var error=$(xml).find('message').attr('error');

            if('0'==error){
				$('#field_SendRequest').addClass('hideField');
                upperLimit=parseInt($(xml).find('event_count').text());
                if("navUpToLimit"==navType){
                    beginAt=1;

                    if(upperLimit >= numberOfLines){
                        howMany=numberOfLines;
                    }else{
                        howMany=upperLimit;
                    }
                } else if("navUp"==navType){
                    if((beginAt - numberOfLines) > 1){
                        beginAt -= numberOfLines;
                    }else{
                        beginAt=1;
                        if (upperLimit >= numberOfLines) {
                            howMany=numberOfLines;
                        }else{
                            howMany=upperLimit;
                        }
                    }
                } else if("navDown"==navType){
                    if(beginAt < upperLimit){
                        if((beginAt+numberOfLines) < upperLimit){
                            beginAt+=numberOfLines;
                            if((beginAt+numberOfLines) <= upperLimit){
                                howMany=numberOfLines;
                            }else{
                                howMany=((upperLimit - beginAt)+1);
                            }
                        }else{
                            if(upperLimit >= numberOfLines){
                                beginAt=(upperLimit - (numberOfLines-1));
                                howMany=numberOfLines;
                            }
                        }
                    }
                } else if("navDownToLimit"==navType){
                    if(upperLimit >= numberOfLines){
                        beginAt=(upperLimit - (numberOfLines-1) );
                        howMany=numberOfLines;
                    }else{
                        beginAt=1;
                        howMany=upperLimit;
                    }
                }else{
                    alert('ERROR: Navergation Limit Unknown');
                }

                nav_through_history(beginAt,howMany);
                $('#navLog').html('Events '+beginAt+' to '+(parseInt(beginAt)+(parseInt(howMany) - 1 )));
            }
        },  
        error: function(jqXHR, textStatus, errorThrown) 
        {
            $('#response').val('ERROR: '+textStatus+'\n');
        }
    });
}
function nav_through_history(beginAt,howMany)
{
    var xmlReq ='<ipacu_request>';
		xmlReq+='<message name="get_recent_event_history" />';
		xmlReq+='<begin_at_event>'+beginAt+'</begin_at_event>';
		xmlReq+='<how_many_events>'+howMany+'</how_many_events>';
		xmlReq+='</ipacu_request>';
    $.ajax({
        type: 'post',
        url: 'webservice.php',
        contentType : 'text/xml',
        processData : false,
        dataType : 'xml',
        data : xmlReq,
        success: function(xml) 
        {
            var Messages='';
            var Message='';
            var events='';
            $(xml).find('event').each(function() {
                Messages=$(this).text();
                Message=Messages.split('::');
                events+=Message[0]+'\n';
                events+=Message[1]+'\n\n';
            });
            $('#response').val(events);
        },  
        error: function(jqXHR, textStatus, errorThrown) 
        {
            $('#response').val('ERROR: '+textStatus+'\n');
        }
    });
}
$('#fdinAntSatID').change(function(){
	if('set_satellite_identity'==$('#chooseSetting').val()){
		$('#field_1').addClass('hideField');
		$('#field_Region').addClass('hideField');
		$('#field_2').addClass('hideField');
		$('#field_3').addClass('hideField');
		$('#field_4').addClass('hideField');
		$('#field_EnFavSel').addClass('hideField');
		$('#field_5').addClass('hideField');
		$('#field_6').addClass('hideField');
		$('#field_SendRequest').addClass('hideField');
		$('#field_FetchData').removeClass('hideField');
	} else if('set_satellite_params'==$('#chooseSetting').val()){
		$('#field_Xponder').addClass('hideField');
		$('#field_1').addClass('hideField');
		$('#field_2').addClass('hideField');
		$('#field_3').addClass('hideField');
		$('#field_Polarity').addClass('hideField');
		$('#field_Band').addClass('hideField');
		$('#field_FECCode').addClass('hideField');
		$('#field_DecoderType').addClass('hideField');
		$('#field_SendRequest').addClass('hideField');
		$('#field_FetchData').removeClass('hideField');
		$('#fdinXponder').val('');
	} 
});
$('#fdinXponder,#chooseSetting').change(function(){
	if('set_satellite_params'==$('#chooseSetting').val()){
		if('' != $('#fdinXponder').val()){
			$('#field_1').removeClass('hideField');
			$('#fd1').html('Frequency');
			$('#field_2').removeClass('hideField');
			$('#fd2').html('Symbol Rate');
			$('#field_3').removeClass('hideField');
			$('#fd3').html('Network ID');
			$('#field_Polarity').removeClass('hideField');
			$('#fdPol').html('Polarity');
			$('#field_Band').removeClass('hideField');
			$('#fdBnd').html('Band');
			$('#field_FECCode').removeClass('hideField');
			$('#fdFEC').html('FEC Code');
			$('#field_DecoderType').removeClass('hideField');
			$('#fdDec').html('Decoder Type');
			$('#field_SendRequest').removeClass('hideField');
			var antSatID=$('#fdinAntSatID').val().split('::');
			SendGetCommand2('get_satellite_params','<antSatID>'+antSatID[1]+'</antSatID>');
		}else{
			$('#field_1').addClass('hideField');
			$('#field_2').addClass('hideField');
			$('#field_3').addClass('hideField');
			$('#field_Polarity').addClass('hideField');
			$('#field_Band').addClass('hideField');
			$('#field_FECCode').addClass('hideField');
			$('#field_DecoderType').addClass('hideField');
			$('#field_SendRequest').addClass('hideField');
		}
	}
});
$('#sendRequest').click(function(){
	var antSatID=$('#fdinAntSatID').val().split('::');
	switch ( $('#chooseSetting').val()){
		case 'calibrate_gyro':
			SendGetCommand($('#chooseSetting').val());
			break;
		case 'set_antenna_config':
			SendGetCommand2($('#chooseSetting').val(),'<sidelobe>'+$('#fdinOnOff1').val()+'</sidelobe><sleep>'+$('#fdinOnOff2').val()+'</sleep>');
			break; 
		case 'select_satellite':
			if(''==$('#fdinAntSatID').val()){
				alert('Select a satellite');
			}else{
				SendGetCommand2($('#chooseSetting').val(),'<antSatID>'+antSatID[1]+'</antSatID>');
			}
			break;
		case 'set_satellite_identity':
			var message='';
				message+='<listID>'+antSatID[2]+'</listID>';
				message+='<antSatID>'+antSatID[1]+'</antSatID>';
				message+='<name>'+$('#fdin1').val()+'</name>';
				message+='<region>'+$('#fdinRegion').val()+'</region>';
				message+='<lon>'+$('#fdin2').val()+'</lon>';
				message+='<skew>'+$('#fdin3').val()+'</skew>';
				var en=$('#field_En').is(':checked') ? 'TRUE' : 'FALSE';
				message+='<enable>'+en+'</enable>';
				var fav=$('#field_Fav').is(':checked') ? 'TRUE' : 'FALSE';
				message+='<favorite>'+fav+'</favorite>';
				var sel=$('#field_Sel').is(':checked') ? 'TRUE' : 'FALSE';
				message+='<select>'+sel+'</select>';
				message+='<triSatID>'+$('#fdin4').val()+'</triSatID>';
				message+='<lo1>'+$('#fdin5').val()+'</lo1>';
				message+='<lo2>'+$('#fdin6').val()+'</lo2>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'get_satellite_params':
			if(''==$('#fdinAntSatID').val()){
				alert('Select a satellite');
			}else{
				SendGetCommand2($('#chooseSetting').val(),'<antSatID>'+antSatID[1]+'</antSatID>');
			}
			break;
		case 'set_satellite_params':
			var message='';
				message+='<antSatID>'+antSatID[1]+'</antSatID>';
				message+='<xponder>';
				message+='<id>'+$('#fdinXponder').val()+'</id>';
				message+='<pol>'+$('#fdinPolarity').val()+'</pol>';
				message+='<band>'+$('#fdinBand').val()+'</band>';
				message+='<freq>'+$('#fdin1').val()+'</freq>';
				message+='<symRate>'+$('#fdin2').val()+'</symRate>';
				message+='<fec>'+$('#fdinFECCode').val()+'</fec>';
				message+='<netID>'+$('#fdin3').val()+'</netID>';
				message+='<modType>'+$('#fdinDecoderType').val()+'</modType>';
				message+='</xponder>'
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'reset_satellite_params':
			var message='';
				message+='<antSatID>'+antSatID[1]+'</antSatID>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'start_serial_log':
			var message='';
				message+='<restart>'+$('#fdinYesNo1').val()+'</restart>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'reboot':
			var message='';
				message+='<sys>'+$('#fdinSystemReboot').val()+'</sys>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'reset_software':
			var message='';
				message+='<rollback>'+$('#fdinResetSoftware').val()+'</rollback>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'reset_user_password':
			var method=eval('(reset_user_password)');
			$.ajax({
				type: 'post',
				url : '/db_logins.php/reset_user_password',
				dataType : 'xml',
				success: function (xml)
				{
					method(xml);
					return false;
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
					$('#response').val('ERROR: '+textStatus+'\n');
					return false;
				}
			});
			break;
		case 'set_vessel_config':
			var message='';
				message+='<name>'+$('#fdin1').val()+'</name>';
				message+='<feet>'+$('#fdin2').val()+'</feet>';
				message+='<antenna_mount>'+$('#fdin3').val()+'</antenna_mount>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'set_eth':
			var message='';
				message+='<mode>'+$('#fdinETHMode').val()+'</mode>';
				message+='<ip>'+$('#fdin1').val()+'</ip>';
				message+='<netmask>'+$('#fdin2').val()+'</netmask>';
				message+='<gateway>'+$('#fdin3').val()+'</gateway>';
				message+='<broadcast>'+$('#fdin4').val()+'</broadcast>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'set_eth_factory':
			SendGetCommand($('#chooseSetting').val());
			break;
		case 'set_wlan':
			var message='';
				message+='<mode>'+$('#fdinWLANMode').val()+'</mode>';
			switch ( $('#fdinWLANMode').val()){ 
				case 'ADHOC':
					message+='<adhoc_mode>';
					message+='<security>';
					message+='<mode>'+$('#fdinADHOCMode').val()+'</mode>';
					message+='<key>'+$('#fdin1').val()+'</key>';
					message+='</security>';
					message+='<ip>'+$('#fdin3').val()+'</ip>';
					message+='</adhoc_mode>';
					break;
				case 'IF':
					message+='<if_mode>';
					message+='<mode>'+$('#fdinIFMode').val()+'</mode>';
					if('STATIC'==$('#fdinIFMode').val()){
						message+='<essid>'+$('#fdin2').val()+'</essid>';
						message+='<security>';
						message+='<mode>'+$('#fdinETHMode').val()+'</mode>';
						message+='<algorithm>TKIP</algorithm>';
						message+='<key>'+$('#fdin1').val()+'</key>';
						message+='</security>';
						message+='<ip>'+$('#fdin4').val()+'</ip>';
						message+='<netmask>'+$('#fdin5').val()+'</netmask>';
						message+='<gateway>'+$('#fdin6').val()+'</gateway>';
						message+='<broadcast>'+$('#fdin7').val()+'</broadcast>';
					} else if('DYNAMIC'==$('#fdinIFMode').val()){
						message+='<essid>'+$('#fdin2').val()+'</essid>';
						message+='<security>';
						message+='<mode>'+$('#fdinETHMode').val()+'</mode>';
						message+='<algorithm>TKIP</algorithm>';
						message+='<key>'+$('#fdin1').val()+'</key>';
						message+='</security>';
						message+='<ip>'+$('#fdin3').val()+'</ip>';
						message+='<netmask>'+$('#fdin4').val()+'</netmask>';
						message+='<gateway>'+$('#fdin5').val()+'</gateway>';
						message+='<broadcast>'+$('#fdin6').val()+'</broadcast>';
					}
					message+='</if_mode>';
					break;
				default :
				break;
			}
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'set_wlan_factory':
			SendGetCommand($('#chooseSetting').val());
			break;
		case 'get_recent_event_history':
			SendGetCommand('get_event_history_count');
			break;
		case 'set_gps':
			var message='';
				message+='<lat>'+$('#fdin1').val()+'</lat>';
				message+='<lon>'+$('#fdin2').val()+'</lon>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'get_config_file':
			var message='';
				message+='<filename>'+$('#fdin1').val()+'</filename>';
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'set_config_file':
			var fname=$('#fileToUpload').val();
        	if( fname.length > 0){
				// upload file to web server
				$.ajaxFileUpload({
					url:'xmlservices.php/set_config_file',
					secureuri:false,
					fileElementId:'fileToUpload',
					dataType: 'xml',
					success: function (xml)
					{
						var err=$(xml).find('message').attr('error');
		
						if(err.length > 0){
		
							if('0'==err){
								var message='Successfully Sent';
								$('#response').val( message +'\n');
								return false;
		
							}else{
								var message=err;
								$('#response').val( message +'\n');
								return false;
								
							}
							
						}
						
					},
					error: function(jqXHR, textStatus, errorThrown)
					{
						$('#response').val('ERROR: '+textStatus+'\n');
						return false;
					}
					
				});
				
			}
			break;
			
		case 'update_satellite_config':
			SendGetCommand($('#chooseSetting').val());
			break;
			
		case 'set_satellite_group':
			var message='';
			if('DELETE'==$('#fdinAddDel').val()){
				message+='<command>DELETE</command>';
				message+='<group_name>'+$('#fdinGroupNames').val()+'</group_name>';
				
			}else{
				message+='<command>ADD</command>';
				message+='<group_name>'+$('#fdin6').val()+'</group_name>';
				message+='<A>'+$('#fdinSatA').val()+'</A>';
				message+='<B>'+$('#fdinSatB').val()+'</B>';
				message+='<C>'+$('#fdinSatC').val()+'</C>';
				message+='<D>'+$('#fdinSatD').val()+'</D>';
			}
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
			
		case 'set_autoswitch_configured_names':
			var message='';
			if('DELETE'==$('#fdinAddDelAll').val()){
				message+='<command>DELETE</command>';
				message+='<sn>'+$('#fdinAutoswitchNames').val()+'</sn>';
				
			}else if('DELETE_ALL'==$('#fdinAddDelAll').val()){
				message+='<command>DELETE_ALL</command>';
				
			}else{
				message+='<command>ADD</command>';
				message+='<sn>'+$('#fdin6').val()+'</sn>';
				message+='<name>'+$('#fdin7').val()+'</name>';
			}
			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'set_autoswitch_master':
			var message='';
			message+='<sn>'+$('#fdinAutoswitchNames').val()+'</sn>';

			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'set_directv_service':
			var message='';
			message+='<enable>'+$('#fdinYesNo1').val()+'</enable>';
			message+='<ip_address>'+$('#fdin6').val()+'</ip_address>';

			SendGetCommand2($('#chooseSetting').val(),message);
			break;
		case 'set_checkswitch_mode':
			var message='';
			message+='<enable>'+$('#fdinYesNo1').val()+'</enable>';

			SendGetCommand2($('#chooseSetting').val(),message);
			break;
			
		default:
			
			break;
	}
});

$('#FetchData,#chooseSetting').click(function(){
	if('set_satellite_identity'==$('#chooseSetting').val()){
		if('' != $('#fdinAntSatID').val()){
			$('#field_1').removeClass('hideField');
			$('#fd1').html('Name');
			$('#field_Region').removeClass('hideField');
			$('#fdRgn').html('Region');
			$('#field_2').removeClass('hideField');
			$('#fd2').html('Long');
			$('#field_3').removeClass('hideField');
			$('#fd3').html('Skew');
			$('#field_EnFavSel').removeClass('hideField');
			$('#fdEFS').html('Enable<br />Favorite<br />Select');
			$('#field_4').removeClass('hideField');
			$('#fd4').html('TriSat ID');
			$('#field_5').removeClass('hideField');
			$('#fd5').html('Lo1');
			$('#field_6').removeClass('hideField');
			$('#fd6').html('Lo2');
			$('#field_FetchData').addClass('hideField');
			$('#field_SendRequest').removeClass('hideField');
			var antSatID=$('#fdinAntSatID').val().split('::');
			SendGetCommand2('get_satellite_params','<antSatID>'+antSatID[1]+'</antSatID>');
		}
	
	} else if('set_satellite_params'==$('#chooseSetting').val()){
		if('' != $('#fdinAntSatID').val()){
			$('#field_Xponder').removeClass('hideField');
			$('#fdX').html('Xponder');
			$('#field_FetchData').addClass('hideField');
		}
	}
});
$('#fdinMasterSlaveMode,#chooseSetting').change(function(){
	if ('set_dualdome_config'==$('#chooseSetting').val()) {
		switch ($('#fdinMasterSlaveMode').val()) { 
			case 'MASTER':
				$('#field_1').removeClass('hideField');
				$('#fd1').html('Master IP');
				$('#field_2').removeClass('hideField');
				$('#fd2').html('Slave IP');
				break;
				case 'SLAVE':
				$('#field_2').removeClass('hideField');
				$('#fd2').html('Slave IP');
				$('#field_1').addClass('hideField');
				break;
			default:
				$('#field_1').addClass('hideField');
				$('#field_2').addClass('hideField');
				break;
		}
	}
});
$('#fdinETHMode,#chooseSetting').change(function(){
	if ('set_eth'==$('#chooseSetting').val()) {
		switch ($('#fdinETHMode').val()) { 
			case 'STATIC':
				$('#field_1').removeClass('hideField');
				$('#field_2').removeClass('hideField');
				$('#field_3').removeClass('hideField');
				$('#field_4').removeClass('hideField');
				$('#fd1').html('IP');
				$('#fd2').html('Netmask');
				$('#fd3').html('Gateway');
				$('#fd4').html('Broadcast');
				break;
			default:
				$('#field_1').addClass('hideField');
				$('#field_2').addClass('hideField');
				$('#field_3').addClass('hideField');
				$('#field_4').addClass('hideField');
				break;
		}
	}
});
$('#fdinWLANMode,#chooseSetting').change(function(){
	if ('set_wlan'==$('#chooseSetting').val()) {
		switch ($('#fdinWLANMode').val()) { 
			case 'ADHOC':
				$('#field_IFMode').addClass('hideField');
				$('#field_IFSecurityMode').addClass('hideField');
				$('#field_1').addClass('hideField');
				$('#field_2').addClass('hideField');
				$('#field_3').removeClass('hideField');
				$('#field_ADHOCMode').removeClass('hideField');
				$('#fd3').html('IP');
				$('#field_4').addClass('hideField');
				$('#field_5').addClass('hideField');
				$('#field_6').addClass('hideField');
				$('#field_7').addClass('hideField');
				$('#fdADHOCM').html('Security');
				break;
			case 'IF':
				$('#field_1').addClass('hideField');
				$('#field_2').addClass('hideField');
				$('#field_3').addClass('hideField');
				$('#field_4').removeClass('hideField');
				$('#field_ADHOCMode').addClass('hideField');
				$('#field_IFMode').removeClass('hideField');
				$('#fdIFM').html('Mode');
				break;
			default:
				clearSelections();
				$('#field_ADHOCMode').addClass('hideField');
				$('#field_IFMode').addClass('hideField');
				$('#field_IFSecurityMode').addClass('hideField');
				break;
		}
	}
});
$('#fdinADHOCMode,#fdinWLANMode,#chooseSetting').change(function(){
	if ('set_wlan'==$('#chooseSetting').val()) {
		if ('ADHOC'==$('#fdinWLANMode').val()) {
			switch ($('#fdinADHOCMode').val()) { 
				case 'WEP':
					$('#field_1').removeClass('hideField');
					$('#fd1').html('Password');
					break;
				default:
					$('#field_1').addClass('hideField');
					break;
			}
		}
	}
});
$('#fdinIFMode,#fdinWLANMode,#chooseSetting').change(function(){
	if ('set_wlan'==$('#chooseSetting').val()) {
		if ('IF'==$('#fdinWLANMode').val()) {
			switch ($('#fdinIFMode').val()) { 
				case 'STATIC':
					$('#field_2').removeClass('hideField');
					$('#fd2').html('ESSID');
					$('#field_4').removeClass('hideField');
					$('#fd4').html('IP');
					$('#field_5').removeClass('hideField');
					$('#fd5').html('Netmask');
					$('#field_6').removeClass('hideField');
					$('#fd6').html('Gateway');
					$('#field_7').removeClass('hideField');
					$('#fd7').html('Broadcast');
					$('#field_IFSecurityMode').removeClass('hideField');
					$('#fdIFSec').html('Security');
					break;
				case 'DYNAMIC':
					$('#field_2').removeClass('hideField');
					$('#fd2').html('ESSID');
					$('#field_4').addClass('hideField');
					$('#field_IFSecurityMode').removeClass('hideField');
					$('#fdIFSec').html('Security');
					$('#field_3').addClass('hideField');
					$('#field_5').addClass('hideField');
					$('#field_6').addClass('hideField');
					$('#field_7').addClass('hideField');
					break;
				default:
					clearSelections();
					$('#field_IFSecurityMode').addClass('hideField');
					break;
			}
		}
	}
});
$('#fdinIFSecurityMode,#fdinWLANMode,#fdinIFMode,#chooseSetting').change(function(){
	if ('STATIC'==$('#fdinIFMode').val() && 'set_wlan'==$('#chooseSetting').val() && 'IF'==$('#fdinWLANMode').val()) {
		switch ($('#fdinIFSecurityMode').val()) { 
			case 'WPA_PSK':
				$('#field_1').removeClass('hideField');
				$('#fd1').html('Password');
				break;
			default:
				$('#field_1').addClass('hideField');
				break;
		}
	}
});
function clearSelections()
{
	$('#field_1').addClass('hideField');
	$('#field_2').addClass('hideField');
	$('#field_3').addClass('hideField');
	$('#field_4').addClass('hideField');
	$('#field_5').addClass('hideField');
	$('#field_6').addClass('hideField');
	$('#field_7').addClass('hideField');
}
clearWindow = function(){
	$('#response').val('');
	$('#field_1').addClass('hideField');
	$('#fdin1').val('');
	$('#field_2').addClass('hideField');
	$('#fdin2').val('');
	$('#field_3').addClass('hideField');
	$('#fdin3').val('');
	$('#field_4').addClass('hideField');
	$('#fdin4').val('');
	$('#field_5').addClass('hideField');
	$('#fdin5').val('');
	$('#field_6').addClass('hideField');
	$('#fdin6').val('');
	$('#field_7').addClass('hideField');
	$('#fdin7').val('');
	$('#field_8').addClass('hideField');
	$('#fdin8').val('');
	$('#field_9').addClass('hideField');
	$('#fdin9').val('');
	$('#field_10').addClass('hideField');
	$('#field_upload').addClass('hideField');
	$('#field_AntSatID').addClass('hideField');
	$('#field_Xponder').addClass('hideField');
	$('#field_Polarity').addClass('hideField');
	$('#field_Band').addClass('hideField');
	$('#field_FECCode').addClass('hideField');
	$('#field_DecoderType').addClass('hideField');
	$('#field_Region').addClass('hideField');
	$('#field_EnFavSel').addClass('hideField');
	$('#field_OnOff1').addClass('hideField');
	$('#field_OnOff2').addClass('hideField');
	$('#field_YesNo1').addClass('hideField');
	$('#field_YesNo2').addClass('hideField');
	$('#field_YesNo3').addClass('hideField');
	$('#field_YesNo4').addClass('hideField');
	$('#field_YesNo5').addClass('hideField');
	$('#field_AB').addClass('hideField');
	$('#field_123').addClass('hideField');
	$('#field_SystemReboot').addClass('hideField');
	$('#field_ResetSoftware').addClass('hideField');
	$('#field_ETHMode').addClass('hideField');
	$('#field_WLANMode').addClass('hideField');
	$('#field_ADHOCMode').addClass('hideField');
	$('#field_IFMode').addClass('hideField');
	$('#field_IFSecurityMode').addClass('hideField');
	$('#field_MasterSlaveMode').addClass('hideField');
	$('#field_NavCount').addClass('hideField');
	$('#field_NavThruHistory').addClass('hideField');
	$('#field_1248').addClass('hideField');
	$('#field_SelectExit').addClass('hideField');
	$('#field_SelectDone').addClass('hideField');
	$('#field_FetchData').addClass('hideField');
	$('#field_AddDel').addClass('hideField');
	$('#field_AddDelAll').addClass('hideField');
	$('#field_GroupNames').addClass('hideField');
	$('#field_AutoswitchNames').addClass('hideField');
	$('#field_SatA').addClass('hideField');
	$('#field_SatB').addClass('hideField');
	$('#field_SatC').addClass('hideField');
	$('#field_SatD').addClass('hideField');
	$('#field_SendRequest').addClass('hideField');
}

});
