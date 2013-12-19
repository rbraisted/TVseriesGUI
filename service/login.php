<?php
/******************************************************************************
 *  FILE NAME:    login.php
 *  
 *  AUTHOR:		  SDansereau
 *
 *  DESCRIPTION:  Initialises the login page.
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
 *  DATE STARTED: 20130910
 ******************************************************************************/

	require($_SERVER['DOCUMENT_ROOT'] . '/controllers/loginService.php');

	$page = new Login();
	
	if( isset($_POST) && (count($_POST) > 0) ) {
	   $cmd = $_POST['cmd'];
	
	   if ( method_exists($page, $cmd) ) {
	      $page->$cmd();
	      
	   } else {
	      $page->index();
	   }
	   
	} else {
	   $page->index();
	}
	
?>