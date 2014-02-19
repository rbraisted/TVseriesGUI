<?php
	
	$myfile = $_POST["file"];
	$fh = fopen($myfile, 'w') or die("can't open file");
	file_put_contents($myfile, $_POST["text"]);

	fclose($fh);

	header('Content-type: text/plain');
	header('Content-disposition: attachment; filename='+$myfile);
	readfile($myfile);
?>