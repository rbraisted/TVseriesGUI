<?php

	$file = $_REQUEST['file'];
	$strLen = strlen($file);
	$index  = strrpos($file,'/');
	if (file_exists($file)) {
		header('Content-Description: File Transfer');
		header('Content-type: text/plain');
		header("Content-Disposition: attachment; filename=".substr($file,$index+1,$strLen-$index));
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		flush();
		readfile($file);
		exit;
		
	} else {
		
		header( 'Location: ' . "/kvhservicefiletransfer.php?fnf=File Not Found&fn=".$file);
		exit;
	}

?>