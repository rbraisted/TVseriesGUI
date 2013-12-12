<? include $_SERVER['DOCUMENT_ROOT'] . '/settings/base.php'; ?>

<div id="mc" class="mc">
	<link type="text/css" rel="stylesheet" href="/css/settings/wireless-settings.css">
	<script type="text/javascript" src="/js/settings/wireless-settings.js"></script>

	<a id="back-btn" href="/settings/" class="back-btn"><img src="/images/img.gif" />Settings</a>

	<div class="mcg">
		<div class="headline">WIRELESS SETTINGS</div>

		<div class="setting">
			<span class="label">Mode: </span>
			<a id="mode-btn" href="#" class="dropdown-btn">DISABLED</a>
		</div>

		<div id="adhoc-mode">
			<div class="setting">
				<span class="label">IP Address:</span>
				<span id="adhoc-ip"></span>
			</div>
			<div class="setting">
				<span class="label">Security Mode:</span>
				<a id="adhoc-security-btn" href="#" class="dropdown-btn">OFF</a>
			</div>
			<div id="adhoc-security" class="setting">
				<span class="label">Password:</span>
				<input id="adhoc-password" type="text" class="password" />
			</div>
		</div>

		<div id="if-mode">
			<div class="setting">
				<span class="label">Network Mode:</span>
				<a id="if-mode-btn" href="#" class="dropdown-btn">STATIC</a>
			</div>

			<div id="static-mode">
				<div id="static-ip" class="setting">
					<span class="label">IP Address:</span>
					<input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" />
				</div>
				<div id="static-subnet" class="setting">
					<span class="label">Subnet:</span>
					<input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" />
				</div>
				<div id="static-gateway" class="setting">
					<span class="label">Gateway:</span>
					<input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" />
				</div>
				<div id="static-broadcast" class="setting">
					<span class="label">Broadcast:</span>
					<input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" /><input type="text" class="octet" />
				</div>
				<div class="setting">
					<span class="label">SSID:</span>
					<input id="static-ssid" type="text" class="ssid" />
				</div>
				<div class="setting">
					<span class="label">Security Mode:</span>
					<a id="static-security-btn" href="#" class="dropdown-btn">OFF</a>
				</div>
				<div id="static-security" class="setting">
					<span class="label">Password:</span>
					<input id="static-password" type="text" class="password" />
				</div>
			</div>

			<div id="dynamic-mode">
				<div class="setting">
					<span class="label">SSID:</span>
					<input id="dynamic-ssid" type="text" class="ssid" />
				</div>
				<div class="setting">
					<span class="label">Security Mode:</span>
					<a id="dynamic-security-btn" href="#" class="dropdown-btn">OFF</a>
				</div>
				<div id="dynamic-security" class="setting">
					<span class="label">Password:</span>
					<input id="dynamic-password" type="text" class="password" />
				</div>
			</div>
		</div>

		<div class="buttons">
			<a id="save-btn" href="#" class="border-btn">Save</a><!--
		 --><a id="cancel-btn" href="#" class="border-btn">Cancel</a><!--
		 --><a id="reset-btn" href="#" class="border-btn">Factory Settings</a>
		</div>

		<div id="mode-dropdown" class="dropdown">
			<div class="dropdown-header">WIRELESS MODE</div>
			<a href="#" value="OFF" class="dropdown-option selected"><img src="/images/img.gif">DISABLED</a>
			<a href="#" value="ADHOC" class="dropdown-option"><img src="/images/img.gif">ADHOC</a>
			<a href="#" value="IF" class="dropdown-option"><img src="/images/img.gif">INFRASTRUCTURE</a>
		</div>

		<div id="if-mode-dropdown" class="dropdown">
			<div class="dropdown-header">INFRASTRUCTURE MODE</div>
			<a href="#" value="STATIC" class="dropdown-option selected"><img src="/images/img.gif">STATIC</a>
			<a href="#" value="DYNAMIC" class="dropdown-option"><img src="/images/img.gif">DHCP</a>
		</div>

		<div id="adhoc-security-dropdown" class="dropdown">
			<div class="dropdown-header">ADHOC SECURITY MODE</div>
			<a href="#" value="OFF" class="dropdown-option selected"><img src="/images/img.gif">OFF</a>
			<a href="#" value="WEP" class="dropdown-option"><img src="/images/img.gif">WEP</a>
		</div>

		<div id="static-security-dropdown" class="dropdown">
			<div class="dropdown-header">INFRASTRUCTURE MODE</div>
			<a href="#" value="OFF" class="dropdown-option selected"><img src="/images/img.gif">OFF</a>
			<a href="#" value="WPA_PSK" class="dropdown-option"><img src="/images/img.gif">WPA_PSK</a>
		</div>

		<div id="dynamic-security-dropdown" class="dropdown">
			<div class="dropdown-header">INFRASTRUCTURE MODE</div>
			<a href="#" value="OFF" class="dropdown-option selected"><img src="/images/img.gif">OFF</a>
			<a href="#" value="WPA_PSK" class="dropdown-option"><img src="/images/img.gif">WPA_PSK</a>
		</div>

	</div>
</div>