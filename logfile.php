<?php
//header("Content-type: application/x-file-to-save");
//header("Content-Disposition: attachment; filename=".$_REQUEST['file']);
//readfile($_REQUEST['file']);
//echo 'success';
	
	require ($_SERVER['DOCUMENT_ROOT'] . "/models/tvrosyservice.php");
	
	$service = new TVROsyservice();
	$fileName = $_REQUEST['file'];
	
	if ( "majorError.log" == $fileName ) {
		list($err, $sxe) = $service->get_event_history_log();
	
	} else if ( "IPACU.serial.log" == $fileName ) {
		list($err, $sxe) = $service->get_serial_log();
		
	} else {
		return false;
		
	}


	$fileContents = $sxe->content;

	if ( "" != $fileContents ) {
		header('Content-Description: File Transfer');
		header('Content-type: text/plain');
		header('Content-Disposition: attachment; filename='.$fileName);
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		flush();
		echo $fileContents;
		exit;
		
	} else {
		header('Content-Description: File Transfer');
		header('Content-type: text/plain');
		header('Content-Disposition: attachment; filename='.$fileName);
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		flush();
		echo "Server Response: There were no contents or the file was not found.";
		exit;
	}

?>
