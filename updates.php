<? include $_SERVER[DOCUMENT_ROOT] . '/base.php'; ?>

<div id="updates" class="updates technician-mode">
	<link type="text/css" rel="stylesheet" href="/css/updates.css">
	<script type="text/javascript" src="/js/ajaxfileupload.js"></script>
	<script type="text/javascript" src="/js/updates.js"></script>

	<h1>Updates</h1>

	<menu>
		<div id="tv1" class="ant-type">
			<div class="ant-name">TV1</div>
			<div id="tv1-connected-status" class="connected-status">CONNECTED</div>
			<div id="tv1-portal-version" class="portal-version"></div>
			<div id="tv1-system-version" class="system-version"></div>
			<div id="tv1-device-version" class="device-version"></div>
		</div>
		<div id="tv3" class="ant-type">
			<div class="ant-name">TV3</div>
			<div id="tv3-connected-status" class="connected-status">CONNECTED</div>
			<div id="tv3-portal-version" class="portal-version"></div>
			<div id="tv3-system-version" class="system-version"></div>
			<div id="tv3-device-version" class="device-version"></div>
		</div>
		<div id="tv5" class="ant-type">
			<div class="ant-name">TV5</div>
			<div id="tv5-connected-status" class="connected-status">CONNECTED</div>
			<div id="tv5-portal-version" class="portal-version"></div>
			<div id="tv5-system-version" class="system-version"></div>
			<div id="tv5-device-version" class="device-version"></div>
		</div>
		<div id="tv6" class="ant-type">
			<div class="ant-name">TV6</div>
			<div id="tv6-connected-status" class="connected-status">CONNECTED</div>
			<div id="tv6-portal-version" class="portal-version"></div>
			<div id="tv6-system-version" class="system-version"></div>
			<div id="tv6-device-version" class="device-version"></div>
		</div>
	</menu>

	<div id="update" class="update">
		<div id="download-button">
			CLICK TO DOWNLOAD
			this button will download the update.
			ios currently handles this already.
		</div>

		<br>

		<div>
			CLICK TO UPLOAD
			this button will make a webservice call to upload/install software.
			it will bring up the file browsers on desktop, but it needs to call some custom ios code to display a list of downloaded files on ios.
			<input id="install-input" type="file">
		</div>

		<br>

		<div id="install-button">
			CLICK TO INSTALL
		</div>

		<br>

		<div id="selected-ant-type"></div>
		<div id="selected-portal-version"></div>
		<div id="selected-system-version"></div>
		<div id="selected-device-version"></div>
	</div>

</div>