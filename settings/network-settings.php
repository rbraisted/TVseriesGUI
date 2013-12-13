<? include $_SERVER['DOCUMENT_ROOT'] . '/settings/base.php'; ?>

<div id="mc" class="mc">
	<link type="text/css" rel="stylesheet" href="/css/settings/network-settings.css">
	<script type="text/javascript" src="/js/settings/network-settings.js"></script>

	<a id="back-btn" href="/settings/" class="back-btn"><img src="/images/img.gif" />Settings</a>

	<div class="mcg">
		
		<div id="wireless-settings" class="settings">
			<div class="headline">Wireless Settings</div>
			<div class="setting"><span class="label">Mode:</span><span id="wireless-mode"></span></div>
			<div id="if-mode">
				<div class="setting"><span class="label">IP Address:</span><span id="if-ip"></span></div>
				<div class="setting"><span class="label">Subnet:</span><span id="if-subnet"></span></div>
				<div class="setting"><span class="label">Gateway:</span><span id="if-gateway"></span></div>
				<div class="setting"><span class="label">Broadcast:</span><span id="if-broadcast"></span></div>
				<div class="setting"><span class="label">SSID:</span><span id="if-ssid"></span></div>
			</div>
			<div id="adhoc-mode">
				<div class="setting"><span class="label">IP Address:</span><span id="adhoc-ip"></span></div>
				<div class="setting"><span class="label">Security:</span><span id="adhoc-security"></span></div>
				<div class="setting"><span class="label">Password:</span><span id="adhoc-password"></span></div>
			</div>
			<a href="/settings/wireless-settings.php" class="border-btn">Edit</a>
		</div>

		<div id="ethernet-settings" class="settings">
			<div class="headline">Ethernet Settings</div>
			<div class="setting"><span class="label">Mode:</span><span id="ethernet-mode"></span></div>
			<div class="setting"><span class="label">IP Address:</span><span id="ethernet-ip"></span></div>
			<div class="setting"><span class="label">Subnet:</span><span id="ethernet-subnet"></span></div>
			<div class="setting"><span class="label">Gateway:</span><span id="ethernet-gateway"></span></div>
			<div class="setting"><span class="label">Broadcast:</span><span id="ethernet-broadcast"></span></div>
			<a href="/settings/ethernet-settings.php" class="border-btn">Edit</a>
		</div>
	</div>
</div>