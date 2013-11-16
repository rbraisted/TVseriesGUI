<?php
	// require($_SERVER['DOCUMENT_ROOT'] . "/session.php");
	require($_SERVER['DOCUMENT_ROOT'] . "/controllers/diagnostics/diagnostics.php");
	
	$page = new Diagnostics();
	$page->index();
?>
