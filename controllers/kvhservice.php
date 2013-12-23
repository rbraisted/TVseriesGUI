<?php
/******************************************************************************
 *  FILE NAME:    kvhservice.php
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
require($_SERVER['DOCUMENT_ROOT'] . '/models/tvroxml.php');

class Kvhservice extends Mc 
{
	function __construct()
	{
		parent::Mc();
		$this->tvroXml=new TvroXml();
	}
	
	function index($data=array())
	{
		$data['extrahead']= parent::js('/js/jquery.js') .
							parent::js('/js/error_key.js') .
							parent::js('/js/kvhservice.js');
		
		// Displays the list of satellites accouding to the users last sort
		list($err, $sxe)=$this->tvroXml->get_satellite_list('','');
		
		if('0'==$err){
			$ct = 0;
			if ( isset($sxe) ) {
				foreach ($sxe->children() as $node) {

					foreach ($node->children() as $node2) {

						// Skip satellites we don't want to track individually
						// because they are part of a tri-sat cluster
						if ( "TRUE" == $node2->select ) {
							$masterParamsArray[$ct]['listID']          = $node2->listID;
							$masterParamsArray[$ct]['orbitalPosition'] = $node2->antSatID;
							$masterParamsArray[$ct]['name']            = $node2->name;
							$ct++;
						}

					}

				}
			
			}

			$structure = '';
			if ( isset($masterParamsArray) ) {
				for ($ct = 0; $ct < count($masterParamsArray); $ct++) {

					$structure .= '<option value="'.substr($masterParamsArray[$ct]['name'],0,18);
					$structure .= '::'.$masterParamsArray[$ct]['orbitalPosition'];
					$structure .= '::'.$masterParamsArray[$ct]['listID'].'">';
					$structure .= substr($masterParamsArray[$ct]['name'],0,18) . '    ';
					$structure .= $masterParamsArray[$ct]['orbitalPosition'].'</option>';
				}
			
			}

			$data['satList'] = $structure;
		}
		
		$this->loadView('kvhservice.php', $data);
	}
	
	function filetransfer($data=array())
	{
		$data['extrahead']= parent::js('/js/jquery.js') .
							parent::js('/js/error_key.js') .
							parent::js('/js/kvhservicefiletransfer.js') .
							parent::js('/js/ajaxfileupload.js');
		
		$data['response']=isset($_GET['fnf'])?$_GET['fnf']:'';
		$data['filename']=isset($_GET['fn'])?$_GET['fn']:'';
		
		$this->loadView('kvhservicefiletransfer.php', $data);
	}
}
?>