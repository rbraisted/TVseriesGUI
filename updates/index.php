<? include $_SERVER[DOCUMENT_ROOT] . '/base.php'; ?>

<div id="updates" class="updates-page">
	<link type="text/css" rel="stylesheet" href="/css/updates/updates.css">
	<script type="text/javascript" src="/js/ajaxfileupload.js"></script>
	<script type="text/javascript" src="/js/updates/updates.js"></script>

	<div id="download-button">
		CLICK TO DOWNLOAD
		this button will download the update.
		ios currently handles this already.
	</div>

	<br>

	<div id="install-button">
		CLICK TO INSTALL
		this button will make a webservice call to upload/install software.
		it will bring up the file browsers on desktop, but it needs to call some custom ios code to display a list of downloaded files on ios.
		<input id="install-input" type="file">
	</div>

	<br>

	<div id="portal-version">---</div>
	<div id="system-version">---</div>
</div>