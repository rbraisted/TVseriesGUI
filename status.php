<!DOCTYPE html>
<html>
	<head>
	<title>KVH TVRO</title>
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />

		<link type="text/css" rel="stylesheet" href="css/base.css">

		<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.10.3.min.js"></script>
		<script type="text/javascript" src="js/script.js"></script>

		<script type="text/javascript" src="js/status.js"></script>
	</head>
	<body>

		<? include 'views/header.php'; ?>

		<div id="status" class="status-page">
			<div class="gps">
				<div id="latitude" class="lat">34.011N</div>
				<div id="longitude" class="lon">118.09W</div>
			</div>
			<div class="antenna">
				<div class="antenna-label">ANTENNA:</div>
				<div id="ant-type" class="antenna-type">TV5</div>
			</div>
			<div class="vessel">
				<div id="heading" class="vessel-heading">289&deg;T</div>
				<div id="ves-name" class="vessel-name">Vain Media</div>
			</div>
			<div class="master">
				<div class="master-label">Master:</div>
				<div id="autoswitch-master" class="master-type">Salon</div>
				<div class="master-switch">Switch Master</div>
			</div>
			<div class="satellite">
				<div id="sat-signal" class="satellite-signal satellite-signal-0"></div>
				<div id="sat-name" class="satellite-name">Echostar 3 61W</div>
			</div>
		</div>
	</body>
</html>