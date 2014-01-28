<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/updates.css">
<script type="text/javascript" src="/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/js/updates.js"></script>

<!-- <div id="menu-view" class="view menu-view">
	<a id="tv1-btn" class="btn menu-btn">
		<div class="ant-type">TV1</div>
		<div class="ant-connected">connected</div>
		<img src="/images/img.gif" />
		<div class="system-version software-version">
			Antenna S/W Version:
			<span id="tv1-system-version"></span>
		</div>
		<div class="portal-version software-version">
			Latest S/W Version Available:
			<span id="tv1-portal-version"></span>
		</div>
		<div class="device-version software-version">
			Downloaded S/W Version:
			<span id="tv1-device-version"></span>
		</div>
	</a>
</div>

<div id="updates-view" class="view main-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Updates</label>
		</a>
		<h1>Updates</h1>
	</div>
</div> -->

<div id="sb" class="sb selected">
	<a id="tv1-btn" class="menu-btn ant-btn">
		<div class="ant-type">TV1</div>
		<div class="ant-connected">connected</div>
		<img src="/images/img.gif" />
		<div class="system-version software-version">Antenna S/W Version: <span id="tv1-system-version">---</span>
		</div><div class="portal-version software-version">Latest S/W Version Available: <span id="tv1-portal-version">---</span>
		</div><div class="device-version software-version">Downloaded S/W Version: <span id="tv1-device-version">---</span></div>
	</a>
	<a id="tv3-btn" class="menu-btn ant-btn">
		<div class="ant-type">TV3</div>
		<div class="ant-connected">connected</div>
		<img src="/images/img.gif" />
		<div class="system-version software-version">Antenna S/W Version: <span id="tv3-system-version">---</span>
		</div><div class="portal-version software-version">Latest S/W Version Available: <span id="tv3-portal-version">---</span>
		</div><div class="device-version software-version">Downloaded S/W Version: <span id="tv3-device-version">---</span></div>
	</a>
	<a id="tv5-btn" class="menu-btn ant-btn">
		<div class="ant-type">TV5</div>
		<div class="ant-connected">connected</div>
		<img src="/images/img.gif" />
		<div class="system-version software-version">Antenna S/W Version: <span id="tv5-system-version">---</span>
		</div><div class="portal-version software-version">Latest S/W Version Available: <span id="tv5-portal-version">---</span>
		</div><div class="device-version software-version">Downloaded S/W Version: <span id="tv5-device-version">---</span></div>
	</a>
	<a id="tv6-btn" class="menu-btn ant-btn">
		<div class="ant-type">TV6</div>
		<div class="ant-connected">connected</div>
		<img src="/images/img.gif" />
		<div class="system-version software-version">Antenna S/W Version: <span id="tv6-system-version">---</span>
		</div><div class="portal-version software-version">Latest S/W Version Available: <span id="tv6-portal-version">---</span>
		</div><div class="device-version software-version">Downloaded S/W Version: <span id="tv6-device-version">---</span></div>
	</a>
</div>

<div id="mc" class="mc">
	<a id="back-btn" class="back-btn"><img src="/images/img.gif" />Updates</a>
	<div id="ant-type" class="ant-type">TV5</div>
	<div class="portal">
		<div class="bg"></div>
		<div class="mcg">
			<div class="label">Latest Software Available</div>
			<div class="software-version">S/W Version <span id="portal-version"></span> available to download</div>
			<div class="cta">Download Update</div>
			<a id="download-btn" class="btn"></a>
		</div>
	</div>
	<div class="device">
		<div class="bg"></div>
		<div class="mcg">
			<div id="computer" class="label computer">My Computer</div>
			<div id="device">
				<div class="label">On Device</div>
				<div class="software-version">S/W Version <span id="device-version"></span> ready to install</div>
			</div>
			<div class="cta">Install Update</div>
			<a id="install-btn" class="btn"><input id="upload" type="file" /></a>
		</div>
	</div>
	<div class="system">
		<div class="bg"></div>
		<div class="mcg">
			<div class="label">My Antenna Software</div>
			<div class="software-version">Antenna S/W Version <span id="system-version"></span> installed</div>
		</div>
	</div>
</div>