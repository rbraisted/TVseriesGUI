<?php
	// require($_SERVER['DOCUMENT_ROOT'] . "/session.php");
	require($_SERVER['DOCUMENT_ROOT'] . "/controllers/diagnostics/product-manuals.php");
	
	$page = new ProductManuals();
	$page->index();
?>
