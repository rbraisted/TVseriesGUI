<? include $_SERVER['DOCUMENT_ROOT'] . '/settings/base.php'; ?>

<div id="mc" class="mc">
	<link type="text/css" rel="stylesheet" href="/css/settings/network-settings.css">
	<script type="text/javascript" src="/js/settings/network-settings.js"></script>

	<a id="back-btn" href="/settings/" class="back-btn"><img src="/images/img.gif" />Settings</a>

	<div class="mcg">
		<div class="headline">Network Settings</div>

		<div id="wireless-settings" class="settings wireless-settings">
			<div class="title">Wireless Settings</div>
			<div class="setting">Mode: <span id="wireless-mode">---</span></div>
			<div id="if-mode-settings" class="if-mode-settings">
				<div class="setting">IP Address: <span id="if-mode-ip">---</span></div>
				<div class="setting">Subnet: <span id="if-mode-subnet">---</span></div>
				<div class="setting">Gateway: <span id="if-mode-gateway">---</span></div>
				<div class="setting">Broadcast: <span id="if-mode-broadcast">---</span></div>
				<div class="setting">SSID: <span id="if-mode-ssid">---</span></div>
			</div>
			<div id="adhoc-mode-settings" class="adhoc-mode-settings">
				<div class="setting">IP Address: <span id="adhoc-mode-ip">---</span></div>
				<div class="setting">Security: <span id="adhoc-mode-security">---</span></div>
				<div class="setting">Password: <span id="adhoc-mode-password">---</span></div>
			</div>
			<a id="edit-wireless-btn" href="#" class="border-btn">Edit</a>
		</div>

		<div id="ethernet-settings" class="settings">
			<div class="title">Ethernet Settings</div>
			<div class="setting">Mode: <span id="ethernet-mode">---</span></div>
			<div class="setting">IP Address: <span id="ethernet-ip">---</span></div>
			<div class="setting">Subnet: <span id="ethernet-subnet">---</span></div>
			<div class="setting">Gateway: <span id="ethernet-gateway">---</span></div>
			<div class="setting">Broadcast: <span id="ethernet-broadcast">---</span></div>
			<a id="edit-ethernet-btn" href="#" class="border-btn">Edit</a>
		</div>
	</div>
</div>