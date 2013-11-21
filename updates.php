<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<div id="updates-page" class="page">
	<link type="text/css" rel="stylesheet" href="/css/updates.css">
	<script type="text/javascript" src="/js/ajaxfileupload.js"></script>
	<script type="text/javascript" src="/js/updates.js"></script>


	<div id="updates-menu" class="mmc smc lsb updates-menu">
		<a id="tv1" href="#" class="ant row">
			<div class="type">TV1</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">System: <span id="tv1-system-version"></span>
				</div><div class="por">Portal: <span id="tv1-portal-version"></span>
				</div><div class="dev">Device: <span id="tv1-system-version"></span></div>
			</div>
		</a>
		<a id="tv3" href="#" class="ant row">
			<div class="type">TV3</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">System: <span id="tv3-system-version"></span>
				</div><div class="por">Portal: <span id="tv3-portal-version"></span>
				</div><div class="dev">Device: <span id="tv3-system-version"></span></div>
			</div>
		</a>
		<a id="tv5" href="#" class="ant row">
			<div class="type">TV5</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">System: <span id="tv5-system-version"></span>
				</div><div class="por">Portal: <span id="tv5-portal-version"></span>
				</div><div class="dev">Device: <span id="tv5-system-version"></span></div>
			</div>
		</a>
		<a id="tv6" href="#" class="ant row">
			<div class="type">TV6</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">System: <span id="tv6-system-version"></span>
				</div><div class="por">Portal: <span id="tv6-portal-version"></span>
				</div><div class="dev">Device: <span id="tv6-system-version"></span></div>
			</div>
		</a>
	</div>

	<div id="updates-main" class="smc mmc lmc updates-main">
		<div id="selected-ant-type" class="type">TV5</div>

		<div class="row por">
			<div class="bg"></div>
			<div class="col">
				<div class="label">Latest Software Available</div>
				<div class="ver">Software Version <span id="selected-portal-version"></span> available to download</div>
				<div class="cta">Download Update</div>
				<a id="download-button" href="#" class="btn"></a>
			</div>
		</div>

		<div class="row dev">
			<div class="bg"></div>
			<div class="col">
				<div class="label">My Computer</div>
				<div class="ver">Software Version <span id="selected-device-version"></span> ready to install</div>
				<div class="cta">Install Update</div>
				<a id="install-button" href="#" class="btn"></a>
			</div>
		</div>

		<div class="row sys">
			<div class="bg"></div>
			<div class="col">
				<div class="label">My Antenna Software</div>
				<div class="ver">Software Version <span id="selected-system-version"></span> installed</div>
			</div>
		</div>
	</div>

</div>