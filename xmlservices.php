<?php

	require ($_SERVER['DOCUMENT_ROOT'] . "/models/tvrouploadsoftware.php");
	
	$pathInfo = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
	$pathParts = explode('/', substr($pathInfo, 1));
	
	if(isset($pathParts[0]))
	{
	   $action=$pathParts[0];
	
	   $service = new TVROuploadsoftware();
	
	   if(method_exists($service, $action)) 
	   {
	      $service->$action();
	   }
	   else 
	   {
	      echo "bad apples " . $action;
	   }
	}

?>
