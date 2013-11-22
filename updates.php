<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<div id="updates-page" class="page technician-mode">
	<link type="text/css" rel="stylesheet" href="/css/updates.css">
	<script type="text/javascript" src="/js/ajaxfileupload.js"></script>
	<script type="text/javascript" src="/js/updates.js"></script>

	<div id="updates-menu" class="mmc smc lsb updates-menu selected">
		<a id="tv1" href="#" class="ant row">
			<div class="type">TV1</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">Antenna S/W Version: <span id="tv1-system-version"></span>
				</div><div class="por">Latest S/W Version Available: <span id="tv1-portal-version"></span>
				</div><div class="dev">Downloaded S/W Version: <span id="tv1-system-version"></span></div>
			</div>
		</a>
		<a id="tv3" href="#" class="ant row">
			<div class="type">TV3</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">Antenna S/W Version: <span id="tv3-system-version"></span>
				</div><div class="por">Latest S/W Version Available: <span id="tv3-portal-version"></span>
				</div><div class="dev">Downloaded S/W Version: <span id="tv3-system-version"></span></div>
			</div>
		</a>
		<a id="tv5" href="#" class="ant row">
			<div class="type">TV5</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">Antenna S/W Version: <span id="tv5-system-version"></span>
				</div><div class="por">Latest S/W Version Available: <span id="tv5-portal-version"></span>
				</div><div class="dev">Downloaded S/W Version: <span id="tv5-system-version"></span></div>
			</div>
		</a>
		<a id="tv6" href="#" class="ant row">
			<div class="type">TV6</div>
			<div class="conn">connected</div>
			<img src="/images/img.gif" />
			<div class="ver row">
				<div class="sys">Antenna S/W Version: <span id="tv6-system-version"></span>
				</div><div class="por">Latest S/W Version Available: <span id="tv6-portal-version"></span>
				</div><div class="dev">Downloaded S/W Version: <span id="tv6-system-version"></span></div>
			</div>
		</a>
	</div>

	<div id="updates-main" class="smc mmc lmc updates-main">
		<a id="back-btn" href="#" class="back-btn"><img src="/images/img.gif" />Updates</a>

		<div id="selected-ant-type" class="type">TV5</div>

		<div class="row por">
			<div class="bg"></div>
			<div class="col">
				<div class="label">Latest Software Available</div>
				<div class="ver">S/W Version <span id="selected-portal-version"></span> available to download</div>
				<div class="cta">Download Update</div>
				<a id="download-btn" href="#" class="btn"></a>
			</div>
		</div>

		<div class="row dev">
			<div class="bg"></div>
			<div class="col">
				<div class="label">My Computer</div>
				<div class="ver">S/W Version <span id="selected-device-version"></span> ready to install</div>
				<div class="cta">Install Update</div>
				<a id="install-btn" href="#" class="btn"><input id="upload" type="file" /></a>
			</div>
		</div>

		<div class="row sys">
			<div class="bg"></div>
			<div class="col">
				<div class="label">My Antenna Software</div>
				<div class="ver">Antenna S/W Version <span id="selected-system-version"></span> installed</div>
			</div>
		</div>
	</div>

</div>