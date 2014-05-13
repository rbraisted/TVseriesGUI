<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>KVH TVHUB Text Only</title>
<style>
.hideField {
    display:none;
}
</style>

<?php if(isset($extrahead)) echo $extrahead ?>

</head>
<body>
<center>
<table height="600px" border="1">
	<tr>
      <td align="center" valign="top" colspan="3" bgcolor="red"  style="font-size:12pt;color:white;">
        <strong>Improper use of this tool can directly impact the system.<br />
            Only KVH-authorized technicians should use this interface.
        </strong>
      </td>
    </tr>
    <tr>
        <td width="200" valign="top">
            <input type="button" id="button0" value="antenna_status" onclick="SendGetCommand('antenna_status')" style="width:200px" />
            <input type="button" id="button1" value="antenna_versions" onclick="SendGetCommand('antenna_versions')" style="width:200px" />
            <input type="button" id="button2" value="get_antenna_config" onclick="SendGetCommand('get_antenna_config')" style="width:200px" />
            <input type="button" id="button3" value="get_satellite_list" onclick="SendGetCommand('get_satellite_list')" style="width:200px" />
            <input type="button" id="button4" value="get_satellite_params_header" onclick="SendGetCommand('get_satellite_params_header')" style="width:200px" />
            <input type="button" id="button5" value="serial_log_status" onclick="SendGetCommand('serial_log_status')" style="width:200px" />
			<input type="button" id="button6" value="get_gps" onclick="SendGetCommand('get_gps')" style="width:200px" />
			<input type="button" id="button7" value="get_gps_cities" onclick="SendGetCommand('get_gps_cities')" style="width:200px" />
            <input type="button" id="button8" value="get_nmea_heading" onclick="SendGetCommand('get_nmea_heading')" style="width:200px" />
			<input type="button" id="button9" value="get_nmea_info" onclick="SendGetCommand('get_nmea_info')" style="width:200px" />
			<input type="button" id="button10" value="get_nmea_config" onclick="SendGetCommand('get_nmea_config')" style="width:200px" />
            <input type="button" id="button11" value="power" onclick="SendGetCommand('power')" style="width:200px" />
            <input type="button" id="button12" value="ophours" onclick="SendGetCommand('ophours')" style="width:200px" />
            <input type="button" id="button13" value="get_message_protocol_version" onclick="SendGetCommand('get_message_protocol_version')" style="width:200px" />
            <input type="button" id="button14" value="get_vessel_config" onclick="SendGetCommand('get_vessel_config')" style="width:200px" />
            <input type="button" id="button15" value="get_eth" onclick="SendGetCommand('get_eth')" style="width:200px" />
            <input type="button" id="button16" value="get_wlan" onclick="SendGetCommand('get_wlan')" style="width:200px" />
            <input type="button" id="button20" value="get_serial_log" onclick="SendGetCommand('get_serial_log')" style="width:200px" />
            <input type="button" id="button21" value="get_event_history_log" onclick="SendGetCommand('get_event_history_log')" style="width:200px" />
            <input type="button" id="button22" value="get_event_history_count" onclick="SendGetCommand('get_event_history_count')" style="width:200px" />
            <input type="button" id="button23" value="get_product_registration" onclick="SendGetCommand('get_product_registration')" style="width:200px" />
			<input type="button" id="button24" value="get_satellite_groups" onclick="SendGetCommand('get_satellite_groups')" style="width:200px" />
			<input type="button" id="button25" value="get_autoswitch_status" onclick="SendGetCommand('get_autoswitch_status')" style="width:200px" />
			<input type="button" id="button26" value="get_autoswitch_configured_names" onclick="SendGetCommand('get_autoswitch_configured_names')" style="width:200px" />
			<input type="button" id="button27" value="get_directv_service" onclick="SendGetCommand('get_directv_service')" style="width:200px" />
			<input type="button" id="button28" value="get_checkswitch_mode" onclick="SendGetCommand('get_checkswitch_mode')" style="width:200px" />
            <input type="button" id="button29" value="get_details" onclick="get_details()" style="width:200px" />
            <input type="button" id="button30" value="file_transfer" onclick="window.open('../kvhservicefiletransfer.php')" style="width:200px" />
            <input type="button" id="button31" value="telnet_connect" onclick="window.open('../kvhserviceCL.php')" style="width:200px" />
        </td>
        <td valign="top" width="100%">
            <textarea name="response" id="response" rows="40" style=" height:auto; height:100%; width:95%; font-family:monospace,courier,courier new"></textarea>
        </td>
        <td style="width:325px" valign="top" align="center">
        	<br />
        	<select id="chooseSetting" style="font-family:monospace,courier,courier new">
            	<option value="">--- Choose Setting ---</option>
                <option value="calibrate_gyro">calibrate_gyro</option>
                <option value="set_antenna_config">set_antenna_config</option>
                <option value="select_satellite">select_satellite</option>
                <option value="set_satellite_identity">set_satellite_identity</option>
                <option value="get_satellite_params">get_satellite_params</option>
                <option value="set_satellite_params">set_satellite_params</option>
                <option value="reset_satellite_params">reset_satellite_params</option>
                <option value="start_serial_log">start_serial_log</option>
                <option value="set_gps">set_gps</option>
                <option value="reboot">reboot</option>
                <option value="reset_software">reset_software</option>
				<option value="reset_user_password">reset_user_password</option>
                <option value="set_vessel_config">set_vessel_config</option>
                <option value="set_eth">set_eth</option>
                <option value="set_eth_factory">set_eth_factory</option>
                <option value="set_wlan">set_wlan</option>
                <option value="set_wlan_factory">set_wlan_factory</option>
                <option value="get_recent_event_history">get_recent_event_history</option>
                <option value="get_config_file">get_config_file</option>
                <option value="update_satellite_config">update_satellite_config</option>
				<option value="set_satellite_group">set_satellite_group</option>
				<option value="set_autoswitch_configured_names">set_autoswitch_configured_names</option>
				<option value="set_autoswitch_master">set_autoswitch_master</option>
				<option value="set_directv_service">set_directv_service</option>
				<option value="set_checkswitch_mode">set_checkswitch_mode</option>
				
                <!--option value="set_config_file">set_config_file</option-->
            </select>
            <br />
            <br />
            <br />
            <table>
            	<tr id="field_AntSatID" class="hideField">
                	<td id="fdASID" align="left" style="width:100px">&nbsp;</td>
                    <td align="left" style="width:225px">
                    	<select id="fdinAntSatID" style="width:175px;text-align:left;font-family:monospace,courier,courier new">
                        	<option value="">--- Choose One ---</option>
                            <?php if(isset($satList)) echo $satList ?>
                        </select>
                    </td>
                </tr>
                <tr>
                	<td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr id="field_Xponder" class="hideField">
                	<td id="fdX" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinXponder" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                        	<option value="">--- Choose One ---</option>
                        	<option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_Polarity" class="hideField">
                	<td id="fdPol" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinPolarity" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                        	<option value="">--- Choose One ---</option>
                        	<option value="V">Vertical</option>
                            <option value="H">Horizontal</option>
                            <option value="R">Right</option>
                            <option value="L">Left</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_NavCount" class="hideField">
                	<td id="fdNC" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinNavCount" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_NavThruHistory" class="hideField" style="text-align:center">
                	<td colspan="2">
                    	Oldest
                    	<input type="button" id="fdinNavThruHistoryOldest" value="|<" />
                        <input type="button" id="fdinNavThruHistoryOlder" value="<<" />
                        <input type="button" id="fdinNavThruHistoryNewer" value=">>" />
                        <input type="button" id="fdinNavThruHistoryNewest" value=">|" />
                        Newest
                    </td>
                </tr>
                <tr id="field_Band" class="hideField">
                	<td id="fdBnd" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinBand" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                        	<option value="">--- Choose One ---</option>
                            <option value="H">High</option>
                            <option value="L">Low</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_WLANMode" class="hideField">
                	<td id="fdWLANM" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinWLANMode" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                            <option value="OFF">OFF</option>
                            <option value="ADHOC">ADHOC</option>
                            <option value="IF">IF</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_ADHOCMode" class="hideField">
                	<td id="fdADHOCM" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinADHOCMode" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                            <option value="OFF">OFF</option>
                            <option value="WEP">WEP</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_IFMode" class="hideField">
                	<td id="fdIFM" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinIFMode" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                            <option value="DYNAMIC">DYNAMIC</option>
                            <option value="STATIC">STATIC</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_IFSecurityMode" class="hideField">
                	<td id="fdIFSec" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinIFSecurityMode" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                            <option value="OFF">OFF</option>
                            <option value="WPA_PSK">WPA PSK</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_ETHMode" class="hideField">
                	<td id="fdETHM" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinETHMode" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                            <option value="OFF">OFF</option>
                            <option value="STATIC">STATIC</option>
                            <option value="DYNAMIC">DYNAMIC</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_MasterSlaveMode" class="hideField">
                	<td id="fdMSM" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinMasterSlaveMode" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                            <option value="SINGLE">SINGLE</option>
                            <option value="MASTER">MASTER</option>
                            <option value="SLAVE">SLAVE</option>
                        </select>
                    </td>
                </tr>
            	<tr id="field_1" class="hideField">
                	<td id="fd1" align="left" style="width:100px">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin1" style="width:170px" /></td>
                </tr>
                <tr id="field_YesNo1" class="hideField">
                	<td id="fdYN1" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinYesNo1">
                        	<option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_Region" class="hideField">
                	<td id="fdRgn" align="left">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinRegion" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                        	<option value="">--- Choose One ---</option>
                            <option value="Africa">Africa</option>
                            <option value="Asia">Asia</option>
                            <option value="Australia">Australia</option>
                            <option value="Central/South America">Central/South America</option>
                            <option value="Europe">Europe</option>
                            <option value="North America">North America</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_2" class="hideField">
                	<td id="fd2" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin2" style="width:170px" /></td>
                </tr>
                <tr id="field_YesNo2" class="hideField">
                	<td id="fdYN2" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinYesNo2">
                        	<option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_FECCode" class="hideField">
                	<td id="fdFEC" align="left" width="50px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinFECCode" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                        	<option value="">--- Choose One ---</option>
                        	<option value="1/2">1/2</option>
                            <option value="2/3">2/3</option>
                            <option value="3/4">3/4</option>
                            <option value="3/5">3/5</option>
                            <option value="4/5">4/5</option>
                            <option value="5/6">5/6</option>
                            <option value="5/11">5/11</option>
                            <option value="6/7">6/7</option>
                            <option value="7/8">7/8</option>
                            <option value="8/9">8/9</option>
                            <option value="9/9">9/9</option>
                            <option value="9/10">9/10</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_3" class="hideField">
                	<td id="fd3" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin3" style="width:170px" /></td>
                </tr>
                <tr id="field_YesNo3" class="hideField">
                	<td id="fdYN3" align="left">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinYesNo3">
                        	<option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_DecoderType" class="hideField">
                	<td id="fdDec" align="left" width="50px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinDecoderType" style="width:175px;text-align:center;font-family:monospace,courier,courier new">
                        	<option value="">--- Choose One ---</option>
                        	<option value="QDVB">DVB QPSK</option>
                            <option value="QDSS">DSS DTV</option>
                            <option value="QDC2">DCII QPSK DigiCipher 2</option>
                            <option value="LQPSK">LDPC QPSK STD DVB-S2</option>
                            <option value="L8PSK">LDCP 8PSK STD DVB-S2</option>
                            <option value="TQPSK">Turbo QPSK Dish</option>
                            <option value="T8PSK">Turbo 8PSK Dish</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_EnFavSel" class="hideField">
                	<td id="fdEFS" align="left">&nbsp;</td>
                    <td align="left">
                    	<input type="checkbox" id="field_En" /><br />
						<input type="checkbox" id="field_Fav" /><br />
                        <input type="checkbox" id="field_Sel" />
                    </td>
                </tr>
                <tr id="field_4" class="hideField">
                	<td id="fd4" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin4" style="width:170px" /></td>
                </tr>
                <tr id="field_YesNo4" class="hideField">
                	<td id="fdYN4" align="left">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinYesNo4">
                        	<option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_5" class="hideField">
                	<td id="fd5" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin5" style="width:170px" /></td>
                </tr>
                <tr id="field_YesNo5" class="hideField">
                	<td id="fdYN5" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinYesNo5">
                        	<option value="Y">YES</option>
                            <option value="N">NO</option>
                        </select>
                    </td>
                </tr>
				<tr id="field_AddDel" class="hideField">
                	<td id="fdAD" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinAddDel">
                        	<option value="ADD">ADD</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </td>
                </tr>
				<tr id="field_AddDelAll" class="hideField">
                	<td id="fdADA" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinAddDelAll">
                        	<option value="ADD">ADD</option>
                            <option value="DELETE">DELETE</option>
							<option value="DELETE_ALL">DELETE ALL</option>
                        </select>
                    </td>
                </tr>
				<tr id="field_GroupNames" class="hideField">
                	<td id="fdGN" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinGroupNames">
                        	<?php if(isset($groupNames)) echo $groupNames ?>
                        </select>
                    </td>
                </tr>
				<tr id="field_AutoswitchNames" class="hideField">
                	<td id="fdAN" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinAutoswitchNames">
                        	<?php if(isset($autoswitchNames)) echo $autoswitchNames ?>
                        </select>
                    </td>
                </tr>
                <tr id="field_6" class="hideField">
                	<td id="fd6" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin6" style="width:170px" /></td>
                </tr>
				<tr id="field_SatA" class="hideField">
                	<td id="fdSA" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinSatA">
							<option value="">--- Choose One ---</option>
                        	<?php if(isset($orbitalList)) echo $orbitalList ?>
                        </select>
                    </td>
                </tr>
				<tr id="field_SatB" class="hideField">
                	<td id="fdSB" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinSatB">
							<option value="">--- Choose One ---</option>
                        	<?php if(isset($orbitalList)) echo $orbitalList ?>
                        </select>
                    </td>
                </tr>
				<tr id="field_SatC" class="hideField">
                	<td id="fdSC" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinSatC">
							<option value="">--- Choose One ---</option>
                        	<?php if(isset($orbitalList)) echo $orbitalList ?>
                        </select>
                    </td>
                </tr>
				<tr id="field_SatD" class="hideField">
                	<td id="fdSD" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinSatD">
							<option value="">--- Choose One ---</option>
                        	<?php if(isset($orbitalList)) echo $orbitalList ?>
                        </select>
                    </td>
                </tr>
                <tr id="field_7" class="hideField">
                	<td id="fd7" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin7" style="width:170px" /></td>
                </tr>
                <tr id="field_8" class="hideField">
                	<td id="fd8" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin8" style="width:170px" /></td>
                </tr>
                <tr id="field_9" class="hideField">
                	<td id="fd9" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin9" style="width:170px" /></td>
                </tr>
                <tr id="field_10" class="hideField">
                	<td id="fd10" align="left">&nbsp;</td>
                    <td align="left"><input type="text" id="fdin10" style="width:170px" /></td>
                </tr>
                
                <tr id="field_upload" class="hideField">
                	<td id="fdul" align="left">&nbsp;</td>
                    <td align="left"><input type="file" name='fileToUpload' id="fileToUpload" style="width:170px" /></td>
                </tr>

                <tr id="field_OnOff1" class="hideField">
                	<td id="fdOnOff1" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinOnOff1">
                        	<option value="ON">ON</option>
                            <option value="OFF">OFF</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_OnOff2" class="hideField">
                	<td id="fdOnOff2" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinOnOff2">
                        	<option value="ON">ON</option>
                            <option value="OFF">OFF</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_AB" class="hideField">
                	<td id="fdAB" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinAB">
                        	<option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_123" class="hideField">
                	<td id="fd123" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdin123">
                        	<option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_1248" class="hideField">
                	<td id="fd1248" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdin1248">
                        	<option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_SelectExit" class="hideField">
                	<td id="fdSE" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinSelectExit">
                        	<option value="SELECT">SELECT</option>
                            <option value="EXIT">EXIT</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_SelectDone" class="hideField">
                	<td id="fdSD" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinSelectDone">
                        	<option value="SELECT">SELECT</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_SystemReboot" class="hideField">
                	<td id="fdSysReb" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinSystemReboot">
                        	<option value="ALL">ALL</option>
                            <option value="ANT">Antenna Only</option>
                            <option value="SBC">SBC Only</option>
                        </select>
                    </td>
                </tr>
                <tr id="field_ResetSoftware" class="hideField">
                	<td id="fdReSof" align="left" style="width:100px">&nbsp;</td>
                    <td align="left">
                    	<select id="fdinResetSoftware">
                        	<option value="CURRENT">CURRENT</option>
                            <option value="ALL">ALL</option>
                            <option value="FACTORY">FACTORY</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center">&nbsp;
                    	
                    </td>
                </tr>
                <tr id="field_FetchData" class="hideField">
                    <td colspan="2" style="text-align:center">
                    	<input type="button" id="FetchData" value="Fetch Data" />
                    </td>
                </tr>
                <tr id="field_SendRequest" class="hideField">
                    <td colspan="2" style="text-align:center">
                    	<input type="button" id="sendRequest" value="SEND" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
    	<td colspan="3" align="center"><input type="button" id="clear" value="Clear" onclick="clearWindow()" style="width:200px" /></td>
    </tr>
</table>
</center>

</body>
</html>