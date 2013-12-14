<?php
/******************************************************************************
 *  FILE NAME:    hd11webservice.php
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
 *  DATE STARTED: 20110921
 *
 ******************************************************************************/

    libxml_use_internal_errors(true);
    
/******************************************************************************/
/***                        PHP CLASS DEFINITION                            ***/
/******************************************************************************/
    class TVROxmlWebService
    {
        function TVROxmlWebService()
        {
        }
    
/******************************************************************************
 *                                 _xmlRequest()
 *   Author:      S Dansereau
 *   Start Date:  20110921
 *   Description: Opens a socket connection to the v7-serviceproxy and sends
 *                the XML request sent to it.
 *
 *   Inputs:      XML request
 *
 *   Returns:     Data requested or error message
 *
 *   Side Effects: N/A
 *
 *****************************************************************************/
        public function _xmlRequest($xmlReq)
        {
            $err = 0;
            $sxe = null;
    
            if ( ($xmlReq == NULL) || !isset($xmlReq) ) {
                $err = "unspecified request";
    
            } else {
                // Create the TCP/IP socket
                $socket = @socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    
                if ( $socket === false ) {
                    $err = "socket_create failed : (reason: " . socket_strerror(socket_last_error()) . ")\n";
    
                } else {
                    $address = "127.0.0.1";
                    $service = "tvro-acuservices";
                    $protocol = "tcp";
                    $port = getservbyname($service, $protocol);
    
                    if ( $port === false ) {
                        $err = "getservbyname failed (service : " . $service . ")";
    
                    } else {
                        socket_set_option($socket, SOL_SOCKET, SO_LINGER,array('l_linger'=>1, 'l_onoff'=>1));
                        $result = @socket_connect($socket, $address, $port);
    
                        if ( $result === false ) {
                            $err="socket connect failed. (reason : " . socket_strerror(socket_last_error($socket)) . ")\n";
    
                        } else {
                            $result = socket_write($socket, $xmlReq, strlen($xmlReq));
    
                            if ( $result === false ) {
                                $err = "socket write failed (reason : " . socket_strerror(socket_last_error($socket)) . ")\n";
    
                            } else {
                                // set up select
                                unset($read);
                                $read[] = $socket;
                                $n = @socket_select($read, $write = null, $except = null, $timeout_secs = 5);
    
                                $response = "";
    
                                if ( $n !== FALSE ) {
                                    // Continues to read if the buffer is full and concatenate the message together
                                    do {
                                        $response .= @socket_read($socket, 1024);
                                        // Incase the message is exactly 1024 bytes long check for the end of message tag
                                        $findme   = '</ipacu_response>';
                                        $pos = false;
                                        $pos = strpos($response, $findme);
    
                                    } while ( $pos === false );
    
                                    if ( $response === FALSE ) {
                                        $err = "socket read failed";
    
                                    } else {
    
                                        try {
                                            $sxe = new SimpleXMLElement($response);
                                            $err = "unexpected response";
    
                                            if(isset($sxe->message)){
                                                $err = $sxe->message['error'];
                                            }
    
                                        } catch ( Exception $e ) {
                                            $err = "server returned invalid xml";
                                            echo $response;
                                        }
                                    }
    
                                } else {
                                    $err = "socket read failed (reason : timeout)";
                                }
                            }
    
                            socket_shutdown($socket, 2);
                            socket_close($socket);
                        }
                    }
                }
            }
    
            $array = array($err, $sxe);
    
            return($array);
        }
    
        function xmlReq($xmlReq)
        {
            return($this->_xmlRequest($xmlReq));
        }
    
    }

?>