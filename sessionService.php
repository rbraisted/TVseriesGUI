<?php
/******************************************************************************
 *  FILE NAME:    session.php
 *  
 *  AUTHOR:		  SDansereau
 *
 *  DESCRIPTION:  Checks for a valid session. If no valid session exist the user
 *                is redirected back to the kvhservice login page.
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
 *
 ******************************************************************************/

   // use common session
   session_id("tvroService");

   session_start();

   // validate session
   if ( !isset($_SESSION) || !isset($_SESSION['serviceUser']) ) {
      $host  = 'http://'.$_SERVER['HTTP_HOST'] . '/service/loginService.php';
      header('Location: '.$host);
   }
   
?>