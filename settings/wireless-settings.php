<? include $_SERVER['DOCUMENT_ROOT'] . '/settings/base.php'; ?>

<div id="mc" class="mc">
	<link type="text/css" rel="stylesheet" href="/css/settings/wireless-settings.css">
	<script type="text/javascript" src="/js/settings/wireless-settings.js"></script>

	<a id="back-btn" href="/settings/" class="back-btn"><img src="/images/img.gif" />Settings</a>

	<div class="mcg">
		<div class="headline">Network Settings</div>

		<div id="wireless-settings" class="settings">
			<div class="title">Wireless Settings</div>
			<div class="setting">
				<span class="label">Mode: </span>
				<a id="off-btn" href="#">DISABLED</a>
				<a id="adhoc-btn" href="#">ADHOC</a>
				<a id="if-btn" href="#">INFRASTRUCTURE</a>
			</div>
			<div id="adhoc-settings" class="adhoc-settings">
				<div class="setting"><span class="label">IP Address: <span id="adhoc-ip">---</span></div>
				<div class="setting">
					<span class="label">Security Mode: </span>
					<a id="adhoc-security-off-btn" href="#">OFF</a>
					<a id="adhoc-security-wep-btn" href="#">WEP</a>
				</div>
				<div id="adhoc-password-setting" class="adhoc-password-setting setting">
					<span class="label">Password: </span>
					<input id="adhoc-security-password" type="text" />
				</div>
			</div>
			<div id="if-settings" class="if-settings">
				<div class="setting">
					<span class="label">Mode: </span>
					<a id="static-btn" href="#">STATIC</a>
					<a id="dynamic-btn" href="#">DHCP</a>
				</div>
				<div id="static-settings" class="static-settings">
					<div class="setting">
						<span class="label">IP Address: </span>
						<input id="ip-1" type="text" />
						<input id="ip-2" type="text" />
						<input id="ip-3" type="text" />
						<input id="ip-4" type="text" />
					</div>
					<div class="setting">
						<span class="label">Subnet: </span>
						<input id="subnet-1" type="text" />
						<input id="subnet-2" type="text" />
						<input id="subnet-3" type="text" />
						<input id="subnet-4" type="text" />
					</div>
					<div class="setting">
						<span class="label">Gateway: </span>
						<input id="gateway-1" type="text" />
						<input id="gateway-2" type="text" />
						<input id="gateway-3" type="text" />
						<input id="gateway-4" type="text" />
					</div>
					<div class="setting">
						<span class="label">Broadcast: </span>
						<input id="broadcast-1" type="text" />
						<input id="broadcast-2" type="text" />
						<input id="broadcast-3" type="text" />
						<input id="broadcast-4" type="text" />
					</div>
					<div class="setting">
						<span class="label">SSID: </span>
						<input id="static-ssid" type="text" />
					</div>
					<div class="setting">
						<span class="label">Security Mode: </span>
						<a id="static-security-off-btn" href="#">OFF</a>
						<a id="static-security-wpa-psk-btn" href="#">WPA_PSK</a>
					</div>
					<div id="static-password-setting" class="static-password-setting">
						<div class="setting">
							<span class="label">Password: </span>
							<input id="static-security-password" type="text" />
						</div>
					</div>
				</div>
				<div id="dynamic-settings" class="dynamic-settings">
					<div class="setting">
						<span class="label">SSID: </span>
						<input id="dynamic-ssid" type="text" />
					</div>
					<div class="setting">
						<span class="label">Security Mode: </span>
						<a id="dynamic-security-off-btn" href="#">OFF</a>
						<a id="dynamic-security-wpa-psk-btn" href="#">WPA_PSK</a>
					</div>
					<div id="dynamic-password-setting" class="dynamic-password-setting">
						<div class="setting">
							<span class="label">Password: </span>
							<input id="dynamic-security-password" type="text" />
						</div>
					</div>
				</div>
			</div>
			<a id="save-btn" href="#" class="border-btn">Save</a>
			<a id="cancel-btn" href="#" class="border-btn">Cancel</a>
			<a id="reset-btn" href="#" class="border-btn">Revert to Factory Settings</a>
		</div>
	</div>
</div>