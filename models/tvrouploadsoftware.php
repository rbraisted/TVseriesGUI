<?php
/******************************************************************************
 *  FILE NAME:    tvrouploadsoftware.php
 *
 *  AUTHOR:       SDansereau
 *
 *  DESCRIPTION:  Performs File IO
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
 *  DATE STARTED: 20111201
 *
 ******************************************************************************/
define("UPLOAD_SW_DIR", "/run/shm/temp/software");
define("INSTALL_SW_DIR", "/run/shm/temp/software");
define("TOUCH_SW_FILE", INSTALL_SW_DIR."/web_flash");
define("UPLOAD_OS_DIR", "/run/shm/temp/os");
define("INSTALL_OS_DIR", "/run/shm/temp/os");
define("TOUCH_OS_FILE", INSTALL_OS_DIR."/flash_os");
define("CONF_DIR", "/kvh/conf");

class TVROuploadsoftware
{
   function TVROuploadsoftware()
   {
   }

   function index()
   {
   }

   // routine sends xml back to caller
   //
   private function _respondClient($xml_string, $function_name)
   {
      // disable verboseness of xml lib
      libxml_use_internal_errors(true);
	  //encoding='utf-8'
      $xml_header = "<?xml version='1.0' encoding='utf-8'?>";

      $my_xml_string = $xml_header . "<ipacu_response>" . $xml_string . "</ipacu_response>";
	  //echo $my_xml_string;

      header ("Content-Type:text/xml");

      try {
         $xml = new SimpleXMLElement($my_xml_string);
         print $xml->asXML();

      } catch(Exception $e) {
         // xml formatting error - inform caller
         $my_xml_string = $xml_header . "<ipacu_response>". '<message name="' . $function_name . '" error="Error formating xml response"/></ipacu_response>';
         echo $my_xml_string;

      }

      // prevent potential memory leak
      libxml_clear_errors();
   }

   function get_serial_log()
   {
   	  $str = '';
	  $logtext = '';
      $serial_log = "/var/log/IPACU.serial.log";
      $err = "0"; $started=0; $content=NULL;

      if ( !file_exists($serial_log) ) {
         $err = "file not found";

      } else {
         $started = filectime($serial_log);
         $ftime = filectime($serial_log);
         $start_date = date("d-M-Y ", $ftime);
         $start_time = date("H:i:s.", $ftime);
         $content = file_get_contents($serial_log, FILE_TEXT);

      }

      // format response
      $xmlR = "<message name=\"" . __FUNCTION__ . "\" error=\"$err\"/>";

      if ( "0" == $err ) {
         $xmlR .= "<start_date>$start_date</start_date>";
         $xmlR .= "<start_time>$start_time</start_time>";
         $xmlR .= "<content><![CDATA[".$content."]]></content>";
      }

      $this->_respondClient($xmlR, __FUNCTION__);
   }

   private function upload_file()
   {
      $error = "0";
      $fname = "";
      $fsize = "";

      $fileElementName = 'fileToUpload';

      if ( !empty($_FILES[$fileElementName]['error']) ) {

         switch($_FILES[$fileElementName]['error']) {
            case '1':
               $error = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
            break;

            case '2':
               $error = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
            break;

            case '3':
               $error = 'The uploaded file was only partially uploaded';
            break;

            case '4':
               $error = 'No file was uploaded.';
            break;

            case '6':
               $error = 'Missing a temporary folder';
            break;

            case '7':
               $error = 'Failed to write file to disk';
            break;

            case '8':
               $error = 'File upload stopped by extension';
            break;

            case '999':
            default:
               $error = 'No error code avaiable';
            break;
         }

      } elseif( empty($_FILES['fileToUpload']['tmp_name']) || $_FILES['fileToUpload']['tmp_name'] == 'none' ) {
         $error = 'No file was uploaded..';

      } else {

		if ( !file_exists(INSTALL_SW_DIR) ) {
			mkdir(INSTALL_SW_DIR);

		}

		$fname = $_FILES['fileToUpload']['name'];
		$fsize = @filesize($_FILES['fileToUpload']['tmp_name']);

      }

      $array = array($error, $fname, $fsize);

      return($array);
   }

   function upload_software()
   {
      list($err, $fname, $fsize) = $this->upload_file();

      $xmlR = "<message name=\"" . __FUNCTION__ . "\" error=\"$err\"/>";

      if ( "0" == $err ) {
		 move_uploaded_file($_FILES['fileToUpload']['tmp_name'], INSTALL_SW_DIR . "/" . $fname);

   	 	//for security reason, remove uploaded file
   	 	@unlink($_FILES['fileToUpload']);

        $xmlR .= "<file_name>" . $fname . "</file_name>";
        $xmlR .= "<file_size>" . $fsize . "</file_size>";
      }

      $this->_respondClient($xmlR, __FUNCTION__);
   }

   function upload_os()
   {
      $xmlR = "<message name=\"" . __FUNCTION__ . "\" error=\"NOT IMPLEMENTED\"/>";

      $this->_respondClient($xmlR, __FUNCTION__);
   }

   function install_os()
   {
      $xmlR = "<message name=\"" . __FUNCTION__ . "\" error=\"NOT IMPLEMENTED\"/>";

      $this->_respondClient($xmlR, __FUNCTION__);
   }

   function set_config_file()
   {
      list($err, $fname, $fsize) = $this->upload_file();

      if ( "0" == $err ) {

		 $pos = strrpos($fname, ".kvh");

         if ( ($fname=="acuservices.conf") ||
			 ($fname=="acuservices.conf.prev") ||
			 ($fname=="acuservices.factory.conf") ||
             ($fname=="acunetwork.conf") ||
             ($fname=="acunetwork.factory.conf") ||
             ($fname=="lighttpd.conf") ||
			 ($fname=="satInfoWorkingCopy.xml") ||
			 ($fname=="tips.conf") ) {

            copy($_FILES['fileToUpload']['tmp_name'], CONF_DIR."/".$fname);

         } else if ( ($fname=="eth.conf")||($fname=="wlan.conf") ) {
            copy($_FILES['fileToUpload']['tmp_name'], CONF_DIR."/network/".$fname);

         } else if ( ($fname=="560255.xml") ) {
            copy($_FILES['fileToUpload']['tmp_name'], UPLOAD_SW_DIR."/".$fname);

		 } else if ( (false !== $pos) ) {
            copy($_FILES['fileToUpload']['tmp_name'], UPLOAD_SW_DIR."/".$fname);

         } else {
			 $err = "ERROR: You can't upload unknown files!";

		 }

		 //for security reason, remove uploaded file
		 @unlink($_FILES['fileToUpload']);
		 $xmlR = "<message name=\"" . __FUNCTION__ . "\" error=\"$err\"/>";
		 $xmlR .= "<file_name>" . $fname . "</file_name>";
         $xmlR .= "<file_size>" . $fsize . "</file_size>";

      }

	  $this->_respondClient($xmlR, __FUNCTION__);

   }

   function get_config_file()
   {
      $content="";
      $file_name = $_POST['file_name'];

      if($file_name="serial")
      {
         $content = file_get_contents(CONF_DIR . "serial.conf", FILE_TEXT);
      }
      else if($fname="sat_config")
      {
         $content = file_get_contents(CONF_DIR . "sat_config.xml", FILE_TEXT);
      }
      else if($file_name="eth-factory")
      {
         $content = file_get_contents(CONF_DIR . "network/eth.factory.conf", FILE_TEXT);
      }
      else if($file_name="wlan-factory")
      {
         $content = file_get_contents(CONF_DIR . "network/wlan.factory.conf", FILE_TEXT);
      }

      if(strlen($content)>0)
      {
         $xmlR = "<message name=\"" . __FUNCTION__ . "\" error=\"$error\">";
         $xmlR .= "<content><![CDATA[".$content."]]></content>";
         $this->_respondClient($xmlR, __FUNCTION__);
      }
   }
}
?>
