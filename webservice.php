<?php
/******************************************************************************
 *  FILE NAME:    webservice.php
 *  
 *  AUTHOR:       SDansereau
 *
 *  DESCRIPTION:  Instantiates an instance of the web XML request.
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
 *  DATE STARTED: 20110921
 *
 ******************************************************************************/

require($_SERVER['DOCUMENT_ROOT'] . "/models/tvrowebservice.php");

$service=new TVROxmlWebService();

list($err,$sxe)=$service->xmlReq($HTTP_RAW_POST_DATA);

if($sxe){
	header('Content-Type:text/xml');
	echo $sxe->asXml();
}else{
	$sxe=new SimpleXMLElement($HTTP_RAW_POST_DATA);
	$message=$sxe->message['name'];

	$sxe=new SimpleXMLElement('<ipacu_response />');
	$sxeAdd=$sxe->addChild('message');
	$sxeAdd->addAttribute('name', $message);
	$sxeAdd->addAttribute('error', $err);
	
	header('Content-type: text/xml');
	echo $sxe->asXML();
}
?>