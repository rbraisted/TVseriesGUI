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
		$data['extrahead']= parent::js('/js/jquery-1.10.2.min.js') .
							parent::js('/js/error_key.js') .
							parent::js('/js/kvhservice.js');

		// Displays the list of satellites according to the users last sort
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
					$orbitalPosition = $masterParamsArray[$ct]['orbitalPosition'];
					$structure .= '::'.$orbitalPosition;
					$structure .= '::'.$masterParamsArray[$ct]['listID'].'">';
					$structure .= substr($masterParamsArray[$ct]['name'],0,18) . '    ';
					$structure .= $masterParamsArray[$ct]['orbitalPosition'].'</option>';
					// For set_satellites_group
					$orbitalList .= '<option value="'.$orbitalPosition.'">'.substr($masterParamsArray[$ct]['name'],0,18) . '    ';
					$orbitalList .= $masterParamsArray[$ct]['orbitalPosition'].'</option>';
				}

			}

			$data['satList'] = $structure;
			$data['orbitalList'] = $orbitalList;
		}

		// Displays the list of satellites according to the users last sort
		list($err, $sxe)=$this->tvroXml->get_satellite_groups();

		if ( isset($sxe) ) {
			foreach ($sxe->group_list->group as $group) {
				$data['groupNames'] .= '<option value="'.$group->group_name.'">'.$group->group_name.'</option>';

			}
		}

		// Displays the list of satellites according to the users last sort
		list($err, $sxe)=$this->tvroXml->get_autoswitch_configured_names();

		if ( isset($sxe) ) {
			foreach ($sxe->autoswitch_list->autoswitch as $group) {
				$data['autoswitchNames'] .= '<option value="'.$group->sn.'">'.$group->sn.'</option>';

			}
		}

        // Displays the list of NMEA Heading Devices
        list($err, $sxe)=$this->tvroXml->get_heading_config();

        if ( isset($sxe) ) {
            foreach ($sxe->nmea0183->message_list->nmea_message as $nmeaHeadSource) {
                // Create data array of options adding 0183/ to be able to
                // parse later since this will be in one drop down with
                // nmea2000 devices.
                $data['nmeaHeadSources'] .= '<option value="0183/' . htmlentities($nmeaHeadSource->nmea_source) . '">' . $nmeaHeadSource->nmea_source . '</option>';
            }

            foreach ($sxe->nmea2000->message_list->nmea_message as $nmeaHeadSource) {
                // Create data array of options adding 2000/ to be able to
                // parse later since this will be in one drop down with
                // nmea0183 devices.
                $data['nmeaHeadSources'] .= '<option value="2000/' . htmlentities($nmeaHeadSource->nmea_source) . '">' . $nmeaHeadSource->nmea_source . '</option>';
            }
        }

        // Displays the list of NMEA GPS Devices
        list($err, $sxe)=$this->tvroXml->get_gps_config();

        if ( isset($sxe) ) {
            foreach ($sxe->nmea0183->message_list->nmea_message as $nmeaGpsSource) {
                // Create data array of options adding 0183/ to be able to
                // parse later since this will be in one drop down with
                // nmea2000 devices.
                $data['nmeaGpsSources'] .= '<option value="0183/' . htmlentities($nmeaGpsSource->nmea_source) . '">' . $nmeaGpsSource->nmea_source . '</option>';
            }

            foreach ($sxe->nmea2000->message_list->nmea_message as $nmeaGpsSource) {
                // Create data array of options adding 2000/ to be able to
                // parse later since this will be in one drop down with
                // nmea0183 devices.
                $data['nmeaGpsSources'] .= '<option value="2000/' . htmlentities($nmeaGpsSource->nmea_source) . '">' . $nmeaGpsSource->nmea_source . '</option>';
            }
        }

        // Displays the list of LNBs
        list($err, $sxe)=$this->tvroXml->get_lnb_list();

        if ( isset($sxe) ) {
            foreach ($sxe->lnb_list->name as $lnbList) {
                $data['lnbList'] .= '<option value="' . $lnbList.'">' . $lnbList . '</option>';
            }
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