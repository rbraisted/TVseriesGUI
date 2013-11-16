<?php
	// require($_SERVER['DOCUMENT_ROOT'] . "/session.php");
	require($_SERVER['DOCUMENT_ROOT'] . "/controllers/diagnostics/restart-system.php");
	
	$page = new RestartSystem();
	$page->index();
?>
