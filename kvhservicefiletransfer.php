<?php
/******************************************************************************
 *  FILE NAME:    kvhservicefiletransfer.php
 *  
 *  AUTHOR:		  SDansereau
 *
 *  DESCRIPTION:  Instantiates an instance of the kvhservicefiletransfer page 
 *                and checks for a valid session. If no valid session exist the
 *                user is redirected back to the login page.
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
 *  DATE STARTED: 20130911
 *
 ******************************************************************************/

	require($_SERVER['DOCUMENT_ROOT'].'/sessionService.php');
	require($_SERVER['DOCUMENT_ROOT'].'/controllers/kvhservice.php');
	
	$page = new Kvhservice();
	$page->filetransfer();
?>