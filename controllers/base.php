<?php
	class Base
	{
		function Base()
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
			$this->loadView('base.php');
		}
	
		function loadView($view, $data=array())
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