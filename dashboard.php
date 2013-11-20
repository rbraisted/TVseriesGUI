<? include $_SERVER[DOCUMENT_ROOT] . '/base.php'; ?>

<div id="dashboard" class="dashboard">
	<link type="text/css" rel="stylesheet" href="/css/dashboard.css">
	<script type="text/javascript" src="/js/dashboard.js"></script>

	<menu>
		<section>
			<h3>AUTOSWITCH</h3>
			<div id="autoswitch" class="autoswitch">
				<div id="autoswitch-label" class="label">Autoswitch</div>
				<div id="autoswitch-button" class="button">Active</div>
			</div>
			<div id="master" class="master">
				<div id="master-label" class="label">Master Bedroom</div>
				<div id="master-button" class="button">Switch</div>
			</div>
		</section>
		<section>
			<h3>LOCATION</h3>
			<div id="lat" class="label"></div>
			<div id="lon" class="label"></div>
		</section>
		<section>
			<h3>ANTENNA</h3>
			<div id="ant-type" class="label"></div>
		</section>
		<section>
			<h3>SATELLITE</h3>
			<div id="sat-name" class="label"></div>
			<div id="sat-switch" class="button">Switch</div>
			<div id="sat-id" class="label"></div>
			<img id="sat-signal" class="sat-signal sat-signal-0" src="/images/img.gif">
		</section>
	</menu>

	<div id="vessel" class="vessel">
		<div id="vessel-heading" class="vessel-heading"></div>
		<img id="vessel-image" class="vessel-image" src="/images/img.gif">
		<div id="vessel-name" class="vessel-name"></div>
	</div>
 </div>