<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<link type="text/css" rel="stylesheet" href="/css/home.css">
<script type="text/javascript" src="/js/home.js"></script>
<script type="text/javascript" src="/RoboHelp_CSH 2.js"></script>

<div id="menu" class="view menu">
	<div id="autoswitch" class="autoswitch section">
		<img src="/images/img.gif">
		<h3 id="autoswitch-master" class="master">Kitchen</h3>
		<a id="autoswitch-dropdown-btn" href="#" class="select-btn">Select</a>
	</div>
	<div id="gps" class="gps section">
		<h3>Location</h3>
		<div id="latitude" class="coordinate"></div>
		<div id="longitude" class="coordinate"></div>
	</div>
	<div id="antenna" class="antenna section">
		<h3>Antenna</h3>
		<div id="antenna-type" class="type"></div>
	</div>
	<div id="satellite" class="satellite section">
		<h3 id="group-name group" class="name"></h3>
		<h3 id="satellite-name single" class="name"></h3>
		<div id="manual group" class="manual">
			<h3>Manual Mode</h3>
			<a id="on-off-btn" class="on-off-btn is-on">
				<div class="on">ON</div>
				<div class="off">OFF</div>
			</a>
		</div>
		<img id="satellite-signal" class="signal signal-0" src="/images/img.gif">
		<a id="satellite-dropdown-btn" href="#" class="select-btn">Select</a>
	</div>
</div>

<div id="view" class="view">
	<div id="vessel" class="vessel">
		<h1 id="vessel-heading" class="heading"></h1>
		<img id="vessel-animation" class="animation" src="/images/img.gif">
		<h3 id="vessel-name" class="name"></h3>
	</div>
</div>