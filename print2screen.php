<?
	$i = 0;
	do {
		$count++;
		echo "line $count<br>";
		if (!($count%3) || !($count%5)) {
			$count++;
			echo "<br>";
			flush();
			sleep(1);
		}
	} while (1);
?>