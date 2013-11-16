<?php
	// require($_SERVER['DOCUMENT_ROOT'] . "/session.php");
	require($_SERVER['DOCUMENT_ROOT'] . "/controllers/status.php");
	
	$page = new Status();
	$page->index();
?>