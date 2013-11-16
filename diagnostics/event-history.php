<?php
	// require($_SERVER['DOCUMENT_ROOT'] . "/session.php");
	require($_SERVER['DOCUMENT_ROOT'] . "/controllers/diagnostics/event-history.php");
	
	$page = new EventHistory();
	$page->index();
?>
