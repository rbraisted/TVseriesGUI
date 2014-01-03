<? include $_SERVER['DOCUMENT_ROOT'] . '/newbase.php'; ?>

<link type="text/css" rel="stylesheet" href="/css/home.css">
<script type="text/javascript" src="/js/home.js"></script>
<script type="text/javascript" src="/RoboHelp_CSH 2.js"></script>

<div id="menu" class="view menu">
	<div id="autoswitch" class="autoswitch section">
		<img src="/images/img.gif">
		<label>Autoswitch</label>
		<a id="on-off-switch" class="btn on-off-switch is-on">
			<div class="on">ON</div>
			<div class="off">OFF</div>
		</a>
	</div>
	<div id="gps" class="gps section">
		<label>Location</label>
		<div id="latitude" class="coordinate"></div>
		<div id="longitude" class="coordinate"></div>
	</div>
	<div id="antenna" class="antenna section">
		<label>Antenna</label>
		<div id="antenna-type" class="antenna-type"></div>
	</div>
	<div id="satellite" class="satellite section">
		<label id="group-name group"></label>
		<label id="satellite-name single"></label>
		<div id="manual group" class="manual">
			<label>Manual Mode</label>
			<a id="on-off-switch" class="on-off-switch is-on">
				<div class="on">ON</div>
				<div class="off">OFF</div>
			</a>
		</div>
		<img id="satellite-signal" class="signal signal-0" src="/images/img.gif">
	</div>
</div>

<div id="view" class="view is-active">
	<div id="vessel" class="vessel">
		<div id="vessel-heading" class="vessel-heading"></div>
		<img id="vessel-image" class="vessel-image" src="/images/img.gif">
		<img id="vessel-animation" class="vessel-animation" src="/images/img.gif">
		<div id="vessel-name" class="vessel-name"></div>
	</div>
</div>

<!--

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

<a id="help-btn" href="javascript:RH_ShowHelp(0, 'V11_Published_Condensed/index.htm', HH_HELP_CONTEXT, 4)" class="help-btn">HELP</a>

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
-->