<?php
/******************************************************************************
 *  FILE NAME:    hd11syservice.php
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
    class TVROsyservice extends TVROxmlWebService
    {
        function TVROsyservice()
        {
        }
    
        function index()
        {
        }

/******************************************************************************
 *                        _doSimple()
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
        private function _doSimple($message, $content="")
        {
            $xmlReq = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
            $xmlReq .= "<ipacu_request><message name=\"" . $message . "\"/>".$content."</ipacu_request>";
    
            return($this->_xmlRequest($xmlReq));
        }
    
/******************************************************************************
 *                        Function List
 *   Author:      S Dansereau
 *   Start Date:  20110624
 *   Description: A set of setter and getter entry points with function names
 *                are self explanatory.
 *
 *   Inputs: N/A
 *
 *   Returns:   
 *
 *   Side Effects: N/A
 *
 *****************************************************************************/
        function get_message_protocol_version()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_vessel_config()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function set_vessel_config($name, $antenna_mount, $boat_length)
        {
            $extra  = "<name>$name</name>";
            $extra .= "<antenna_mount>$antenna_mount</antenna_mount>";
            $extra .= "<feet>$boat_length</feet>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function get_eth()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function set_eth($mode, $ip, $netmask, $gateway, $broadcast)
        {
            $extra  = "<mode>$mode</mode>";
            $extra .= "<ip>$ip</ip>";
            $extra .= "<netmask>$netmask</netmask>";
            $extra .= "<gateway>$gateway</gateway>";
            $extra .= "<broadcast>$broadcast</broadcast>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function set_eth_factory()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_wlan()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function set_wlan($mode, $adhocsecmode, $adhocseckey, $adhocip, $ifmode, $ifessid, $ifsecmode, $ifsalg, $ifseckey, $ifip, $ifnetmask, $ifgateway, $ifbroadcast)
        {
            echo "set_wlan";
            
            $extra  = "<mode>".$mode."</mode>";
            
            if ( "ADHOC" == $mode ) {
                $extra .= "<adhoc_mode>";
                $extra .= "<security>";
                $extra .= "<mode>".$adhocsecmode."</mode>";
                $extra .= "<key>".$adhocseckey."</key>";
                $extra .= "</security>";
                $extra .= "<ip>".$adhocip."</ip>";
                $extra .= "</adhoc_mode>";
            
            } else if ( "IF" == $mode ) {
                $extra .= "<if_mode>";
                $extra .= "<mode>".$ifmode."</mode>";
                $extra .= "<essid><![CDATA[".$ifessid."]]></essid>";
                $extra .= "<security>";
                $extra .= "<mode>".$ifsecmode."</mode>";
                $extra .= "<algorithm>".$ifsalg."</algorithm>";
                $extra .= "<key><![CDATA[".$ifseckey."]]></key>";
                $extra .= "</security>";
                $extra .= "<ip>".$ifip."</ip>";
                $extra .= "<netmask>".$ifnetmask."</netmask>";
                $extra .= "<gateway>".$ifgateway."</gateway>";
                $extra .= "<broadcast>".$ifbroadcast."</broadcast>";
                $extra .= "</if_mode>";
            
            } else {
                // WiFi is OFF
            }
            
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function set_wlan_factory()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_lan()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_sat_selector_list()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function cell_modem_status()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function cell_modem_dial_out($remoteIP, $connection_port, $command)
        {
            $extra  = "<remote_ip>$remoteIP</remote_ip>";
            $extra .= "<connection_port>$connection_port</connection_port>";
            $extra .= "<command>$command</command>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function get_smartswitch_status()
        {
            return($this->_doSimple(__FUNCTION__));
        }

        function set_smartswitch($enabled, $autoselect, $switch_selection, $group_selection)
        {
            $extra  = "<enabled>$enabled</enabled>";
            $extra .= "<autoselect>$switch_selection</autoselect>";
            $extra .= "<input>$switch_selection</input>";
            $extra .= "<output>$group_selection</output>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function set_smartswitch_config($name_A, $enabled_A, $name_B, $enabled_B, $name_1, $enabled_1, $name_2, $enabled_2, $name_3, $enabled_3)
        {
            $extra  = "<A><name>$name_A</name><enabled>$enabled_A</enabled></A>";
            $extra .= "<B><name>$name_B</name><enabled>$enabled_B</enabled></B>";
            $extra .= "<1><name>$name_1</name><enabled>$enabled_1</enabled></1>";
            $extra .= "<2><name>$name_2</name><enabled>$enabled_2</enabled></2>";
            $extra .= "<3><name>$name_3</name><enabled>$enabled_3</enabled></3>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }

        function get_smartswitch_config()
        {
            return($this->_doSimple(__FUNCTION__));
        }

        function set_dualdome_config($local_identity, $local_ip, $remote_ip)
        {
            $extra  = "<local_identity>$local_identity</local_identity>";
            $extra .= "<local_ip>$local_ip</local_ip>";
            $extra .= "<remote_ip>$remote_ip</remote_ip>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function get_dualdome_status()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_config_file($filename)
        {
             
            if  ($filename == "satInfoWorkingCopy" ) {
                $filename = "satInfoWorkingCopy.xml";
                
            } else if ( $filename == "eth" ) {
                $filename = "eth.conf";
                
            } else if ( $filename == "wlan" ) {
                $filename = "wlan.conf";
                
            } else if ( $filename == "eth-factory" ) {
                $filename = "eth.factory.conf";
                
            } else if ( $filename == "wlan-factory" ) {
                $filename = "wlan.factory.conf";
                
            } else if ( $filename == "serial" ) {
                $filename = "serial.conf";
                
            } else if ( $filename == "vessel") {
                $filename = "vessel.conf";
                
            } else if ( $filename == "autoswitch" ) {
                $filename = "autoswitch.conf";
                
            } else if ( $filename == "smartswitch" ) {
                $filename = "smartswitch.conf";
                
            } else if ( $filename == "dualdome" ) {
                $filename = "dualdome.conf";
                
            }
    
            $extra = "<filename>$filename</filename>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function set_config_file($filename, $content)
        {
    
            if($filename == "satInfoWorkingCopy") {
                $file_path = file_get_contents( "satInfoWorkingCopy.xml", FILE_TEXT);
                
            } else if ( $filename == "eth" ) {
                $file_path = file_get_contents("network/eth.conf", FILE_TEXT);
                
            } else if ( $filename == "wlan" ) {
                $file_path = file_get_contents("network/wlan.conf", FILE_TEXT);
                
            } else if ( $filename == "eth-factory" ) {
                $file_path = file_get_contents("network/eth.factory.conf", FILE_TEXT);
                
            } else if ( $filename == "wlan-factory" ) {
                $file_path = file_get_contents( "network/wlan.factory.conf", FILE_TEXT);
                
            } else if ( $filename == "serial" ) {
                $file_path = file_get_contents("serial.conf", FILE_TEXT);
                
            } else if ( $filename == "vessel" ) {
                $file_path = file_get_contents("vessel.conf", FILE_TEXT);
                
            } else if ( $filename == "autoswitch" ) {
                $file_path = file_get_contents("autoswitch.conf", FILE_TEXT);
                
            } else if ( $filename == "smartswitch" ) {
                $file_path = file_get_contents("smartswitch.conf", FILE_TEXT);
                
            } else if ( $filename == "dualdome" ) {
                $file_path = file_get_contents("dualdome.conf", FILE_TEXT);
                
            }
    
            $extra = "<filename>$file_path</filename><content>$content</content>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function get_serial_log()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_event_history_log()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_event_history_count()
        {
            return($this->_doSimple(__FUNCTION__));
        }
    
        function get_recent_event_history($begin_at_event, $how_many_events)
        {
            $extra  = "<begin_at_event>$begin_at_event</begin_at_event>";
            $extra .= "<how_many_events>$how_many_events</how_many_events>";
             
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function upload_software($filename)
        {
            $extra = "<filename>$filename</filename>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        function install_software($install, $filename)
        {
            $extra  = "<install>$install</install>";
            $extra .= "<filename>$filename</filename>";
    
            return($this->_doSimple(__FUNCTION__, $extra));
        }
    
        // Copies the update file from a url to the sbc
        function start_update_download($fname , $fpath)
        {
            $fname = urldecode($fname);
            $fpath = urldecode($fpath);
    
            $filecontent = '';
            $dest_path = '/run/shm/temp/software';
            $url = $fpath;
    
            if ( !file_exists($dest_path) ) {
                mkdir($dest_path);
            }
            
            if ( !copy($url, $dest_path . "/" . $fname) ) {
                echo "failed to copy $file...\n";
                
            } else {
                echo "SUCCESS";
                
            }
        }//start_update_download()

        function set_product_registration($edit_dt, $firstname, $lastname, $salutation, $title, $email, $company, $addr1, $addr2, $city, $state, $country, $zip, $phone, $mobile, $fax, $website, $market, $sector, $platform, $purch_dt, $dealer, $state, $country, $vessel_name, $vessel_length, $vessel_year, $installed_by)
        {
            $extra  = "<edit_dt>$edit_dt</edit_dt>";
            $extra .= "<user>";
            $extra .= "<firstname>$firstname</firstname>";
            $extra .= "<lastname>$lastname</lastname>";
            $extra .= "<salutation>$salutation</salutation>";
            $extra .= "<title>$title</title>";
            $extra .= "<email>$email</email>";
            $extra .= "<company>$company</company>";
            $extra .= "<addr1>$addr1</addr1>";
            $extra .= "<addr2>$addr2</addr2>";
            $extra .= "<city>$city</city>";
            $extra .= "<state>$state</state>";
            $extra .= "<country>$country</country>";
            $extra .= "<zip>$zip</zip>";
            $extra .= "<phone>$phone</phone>";
            $extra .= "<mobile>$mobile</mobile>";
            $extra .= "<fax>$fax</fax>";
            $extra .= "<website>$website</website>";
            $extra .= "</user>";

            $extra .= "<product>";
            $extra .= "<market>$market</market>";
            $extra .= "<sector>$sector</sector>";
            $extra .= "<platform>$platform</platform>";
            $extra .= "<purch_dt>$purch_dt</purch_dt>";
            $extra .= "<dealer>$dealer</dealer>";
            $extra .= "<state>$state</state>";
            $extra .= "<country>$country</country>";
            $extra .= "<vessel_name>$vessel_name</vessel_name>";
            $extra .= "<vessel_length>$vessel_length</vessel_length>";
            $extra .= "<vessel_year>$vessel_year</vessel_year>";
            $extra .= "<installed_by>$installed_by</installed_by>";
            $extra .= "</product>";

    
            return($this->_doSimple(__FUNCTION__, $extra));
        }

        function get_product_registration()
        {
            return($this->_doSimple(__FUNCTION__));
        }

        function set_product_registered()
        {
            return($this->_doSimple(__FUNCTION__));
        }

    }
?>