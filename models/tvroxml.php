<?php
/******************************************************************************
 *  FILE NAME:    hd11xml.php
 *  
 *  AUTHOR:       SDansereau
 *
 *  DESCRIPTION:  Entry point for the hd11-acuservices
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
 *  DATE STARTED: 20110422
 *
 ******************************************************************************/

    require_once("tvrowebservice.php");
    libxml_use_internal_errors(true);
    
/******************************************************************************/
/***                        PHP CLASS DEFINITION                            ***/
/******************************************************************************/
    class TVROxml extends TVROxmlWebService
    {

        function TVROxml()
        {

        }

        function index()
        {

        }
    
/******************************************************************************
 *                        doSimple()
 *   Author:      S Dansereau
 *   Start Date:  20110624
 *   Description: Wraps the XML request in a proper XML tags
 *
 *   Inputs: N/A
 *
 *   Returns:   
 *
 *   Side Effects: N/A
 *
 *****************************************************************************/
        private function doSimple($message, $content="")
        {
            $xmlReq ="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
            $xmlReq .="<ipacu_request><message name=\"" . $message . "\"/>".$content."</ipacu_request>";
    
            return($this->_xmlRequest($xmlReq));
        }
    
/******************************************************************************
 *                        Function List
 *   Author:      S Dansereau
 *   Start Date:  20110624
 *   Description: A set of setter and getter entry points with function names
 *                are self explanitory.
 *
 *   Inputs: N/A
 *
 *   Returns:   
 *
 *   Side Effects: N/A
 *
 *****************************************************************************/
        function antenna_status()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
        function antenna_versions()
        {
            return($this->doSimple(__FUNCTION__));
        }

        function get_antenna_config()
        {
            return($this->doSimple(__FUNCTION__));
        }

        function set_antenna_config($sidemode, $sleepmode)
        {
            $extra  = "<sidemode>$sidemode</sidemode>";
            $extra .= "<sleep>$sleepmode</sleep>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function get_satellite_list($region_filter, $user_choice_filter)
        {
            $extra  = "<region_filter>$region_filter</region_filter>";
            $extra .= "<user_choice_filter>$user_choice_filter</user_choice_filter>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function select_satellite($antSatID, $listID)
        {
            $extra  = "<antSatID>$antSatID</antSatID>";
            $extra .= "<listID>$listID</listID>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function set_satellite_identity($listID, $antSatID, $name, $region, $satLongitude, $preSkew, $time, $enabled, $favorites, $select, $isTriSatID, $lo1, $lo2)
        {
            $extra  = "<listID>$listID</listID>";
            $extra .= "<antSatID>$antSatID</antSatID>";
            $extra .= "<name>$name</name>";
            $extra .= "<region>$region</region>";
            $extra .= "<lon>$satLongitude</lon>";
            $extra .= "<skew>$preSkew</skew>";
            $extra .= "<time>$time</time>";
            $extra .= "<enabled>$enabled</enabled>";
            $extra .= "<favorites>$favorites</favorites>";
            $extra .= "<select>$select</select>";
            $extra .= "<triSatID>$isTriSatID</triSatID>";
            $extra .= "<lo1>$lo1</lo1>";
            $extra .= "<lo2>$lo2</lo2>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function get_satellite_params($listID)
        {
            $extra = "<listID>$listID</listID>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function set_satellite_params($listID, $xponder, $polarization, $band, $frequency, $symbolRate, $FEC, $networkId, $decoderType)
        {
            $extra  = "<listID>$listID</listID>";
            $extra .= "<xponder>";
            $extra .= "<id>$xponder</id>";
            $extra .= "<pol>$polarization</pol>";
            $extra .= "<band>$band</band>";
            $extra .= "<freq>$frequency</freq>";
            $extra .= "<symRate>$symbolRate</symRate>";
            $extra .= "<FECinner>$FEC</FECinner>";
            $extra .= "<netID>$networkId</netID>";
            $extra .= "<modType>$decoderType</modType>";
            $extra .= "</xponder>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function reset_satellite_params($listID)
        {
            $extra = "<listID>$listID</listID>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function start_serial_log($restart)
        {
    
            $extra = "<restart>$restart</restart>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function serial_log_status()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
        function antenna_maintenance_position()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
    
        function set_gps($lat, $lon)
        {
            $extra = "<lat>$lat</lat><lon>$lon</lon>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function set_nmea_gprmc($nmea_string)
        {
            $extra = "<nmea>$nmea_string</nmea>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function get_nmea_heading()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
        function set_nmea_heading($nmea_string)
        {
            $extra = "<nmea>$nmea_string</nmea>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function reboot($sbc,$ant)
        {
            $extra  = "<sbc>$sbc</sbc>";
            $extra .= "<ant>$ant</ant>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function calibrate_gyro()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
        function reset_software($rev)
        {
            $extra = "<rollback>$rev</rollback>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function power()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
        function ophours()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
        function get_lcd_brightness()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
        function set_lcd_brightness($brightness)
        {
            $extra = "<brightness>$brightness</brightness>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function set_date_time($date, $time)
        {
            $extra = "<date>$date</date><time>$time</time>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
        function set_autoswitch_config($enabled, $sat_select, $listID)
        {
            $extra  = "<enabled>$enabled</enabled>";
            $extra .= "<satellites>";
            $extra .= "<satellite>";
            $extra .= "<sat_select>$sat_select</sat_select>";
            $extra .= "<listID>$listID</listID>";
            $extra .= "</satellite>";
            $extra .= "</satellite_list>";
    
            return($this->doSimple(__FUNCTION__, $extra));
        }
    
    
        function get_autoswitch_status()
        {
            return($this->doSimple(__FUNCTION__));
        }
		
		function get_satellite_groups()
        {
            return($this->doSimple(__FUNCTION__));
        }
    
    }
?>