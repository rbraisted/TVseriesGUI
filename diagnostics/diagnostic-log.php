<?php
	// require($_SERVER['DOCUMENT_ROOT'] . "/session.php");
	require($_SERVER['DOCUMENT_ROOT'] . "/controllers/diagnostics/diagnostic-log.php");
	
	$page = new DiagnosticLog();
	$page->index();
?>
