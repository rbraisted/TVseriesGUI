<?php
	
	$myfile = "log.txt";
	$fh = fopen($myfile, 'w') or die("can't open file");
	file_put_contents($myfile, $_POST["text"]);

	fclose($fh);

	header('Content-type: text/plain');
	header('Content-Disposition: attachment; filename="log.txt"');
	
?>