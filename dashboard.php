<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<div id="dashboard-page" class="page">
	<link type="text/css" rel="stylesheet" href="/css/dashboard.css">
	<script type="text/javascript" src="/js/dashboard.js"></script>

	<div id="vessel" class="vessel">
		<div id="vessel-heading" class="vessel-heading"></div>
		<img id="vessel-image" class="vessel-image" src="/images/img.gif">
		<img id="vessel-animation" class="vessel-animation" src="/images/img.gif">
		<div id="vessel-name" class="vessel-name"></div>
	</div>

	<menu>
		<section class="autoswitch">
			<h3>AUTOSWITCH</h3>
			<div id="autoswitch">
				<div id="autoswitch-label" class="label">Autoswitch</div>
				<a id="autoswitch-button" class="of-btn button"><div class="on">On</div><div class="off">Off</div></a>
			</div>
			<div id="master">
				<div id="master-label" class="label">Master Bedroom</div>
				<a id="master-button" href="#" class="button">Switch</a>
			</div>
		</section>
		<section class="location">
			<h3>LOCATION</h3>
			<div id="lat" class="label"></div>
			<div id="lon" class="label"></div>
		</section>
		<section class="ant">
			<h3>ANTENNA</h3>
			<div id="ant-type" class="label"></div>
		</section>
		<section class="sat">
			<h3>SATELLITE</h3>
			<div id="sat-name" class="label"></div>
			<a id="sat-button" href="#" class="button">Switch</a>
			<div id="sat-id" class="label"></div>
			<img id="sat-signal" class="sat-signal sat-signal-0" src="/images/img.gif">
		</section>
	</menu>

	<div id="demo-mode" class="demo-mode">Demo Mode</div>

	<div id="master-list" class="alert-overlay">
		<div class="alert-overlay-bg"></div>
		<div class="master-list">
			<h2>Switch Master</h2>
			<div class="master-list-item">
				<img class="" src="/images/img.gif">
				Salon
			</div>
			<div class="master-list-item selected">
				<img class="" src="/images/img.gif">
				Master Bedroom
			</div>
			<div class="master-list-item">
				<img class="" src="/images/img.gif">
				Bedroom 1
			</div>
			<div class="master-list-item">
				<img class="" src="/images/img.gif">
				Deck 1
			</div>
			<div class="master-list-item">
				<img class="" src="/images/img.gif">
				Roofdeck
			</div>
			<div class="master-list-item">
				<img class="" src="/images/img.gif">
				Bedroom 2
			</div>
		</div>
	</div>
 </div>