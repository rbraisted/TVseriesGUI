<?php
/******************************************************************************
 *  FILE NAME:    mc.php
 *
 *  AUTHOR:		  SDansereau
 *
 *  DESCRIPTION:  Loads the requested web page to be viewed.
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

    class Mc
    {
        function Mc()
        {

        }
    
        function js($src)
        {
            return("<script type='text/javascript' src='$src'></script>");
        }
    
        function css($src)
        {
            return("<link href='$src' rel='stylesheet' type='text/css'></link>");
        }
       	
        function index()
        {
            $this->load->view("template");
        }
    
        function loadView($view, $data=NULL)
        {
            if($data) extract($data);
            
            ob_start();
            
            include($_SERVER['DOCUMENT_ROOT'] . "/views/" . $view);
            
            $buffer = ob_get_contents();
            
            @ob_end_clean();
            
            echo $buffer;
        }
    }
?>