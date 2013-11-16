<? include $_SERVER[DOCUMENT_ROOT] . '/views/base.php'; ?>

<div id="status" class="status-page">
	<link type="text/css" rel="stylesheet" href="/css/status.css">
	<script type="text/javascript" src="/js/status.js"></script>

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