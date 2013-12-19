<?php
/******************************************************************************
 *  FILE NAME:    login.php
 *
 *  AUTHOR:		  SDansereau
 *
 *  DESCRIPTION:  Builds the login web page with the needed libraries and
 *                test login user name and password.
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

	require_once('mc.php');
	require($_SERVER['DOCUMENT_ROOT'] . 'models/tvrosyservice.php');
	//require($_SERVER['DOCUMENT_ROOT'] . 'models/db_connect.php');

	define('USER_SERVICE', 'service');
	define('PASS_SERVICE', 'service');
	
	class Login extends Mc 
	{
	    function Login()
	    {
	        parent::Mc();
			
			$this->tvrosyservices = new TvroSyservice();
	    }
	
	    function index($data=NULL)
	    {
			
            $this->loadView("loginService.php", $data);
	    }
	
		function doServiceLogin()
		{
            
            if ( isset($_POST['usernameService']) && isset($_POST['passwordService']) ) {
                $usernameService = htmlspecialchars($_POST['usernameService'],ENT_QUOTES);
                $passwordService = htmlspecialchars($_POST['passwordService'],ENT_QUOTES);
				//$db_login = new MY_DB;
				//$login=$db_login->usr_login($usernameService,$passwordService);
				session_start();
				//Service User Name and Password
                /*if ( ($login['usr_login'] == $usernameService)
				 && ($login['usr_pass'] == $passwordService)
				 && ('admin' == $login['usr_role'] || 'tech' == $login['usr_role']) ) {*/
                if ( (USER_SERVICE == $usernameService)
                		&& (PASS_SERVICE == $passwordService) ) {
					// Redirect to kvhservice page.
					session_id("tvroService");
                    $_SESSION['serviceUser'] = 'service';//$login['usr_role'];
                    $_SESSION['lastaccess'] = time();
                    session_write_close();
					
                    $host  = 'http://'.$_SERVER['HTTP_HOST'] . '/kvhservice.php?' .SID;
                    header("Location: ". $host);
                    exit;
					
                } else {
                    // Wrong username or Password. Show error here.
                    $data['loginR'] = "Login failed - Please try again.";
                    $this->index($data);
                    session_destroy();
                }
	         
            }
	
        }
		
		
    }

?>