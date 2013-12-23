<?php
  /******************************************************************************
 *  FILE NAME:   systemCMD.php
 *
 *  DESCRIPTION:  This script sends the command entered to the Antenna
 *				  via a telnet session
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
 *  DATE STARTED: 20130917
 *
 ******************************************************************************/

// Opens a telnet session to receive data from the antenna
$fp = fsockopen('127.0.0.1', 50001, $errno, $errstr);

if (!$fp) {
	$err='10';
} else {
	// Sends a command to the antenna
	if(fwrite($fp, $_POST['cmd']."\r\n")){
		$err='0';
	}else{
		$err='11';
	}
	fclose($fp);
}

$sxe=new SimpleXMLElement('<ipacu_response />');
$sxeAdd=$sxe->addChild('message');
$sxeAdd->addAttribute('name', 'systemCMD');
$sxeAdd->addAttribute('error', $err);

header('Content-type: text/xml');
echo $sxe->asXML();

?>