<? include $_SERVER['DOCUMENT_ROOT'] . '/settings/base.php'; ?>

<div id="mc" class="mc">
	<link type="text/css" rel="stylesheet" href="/css/settings/ethernet-settings.css">
	<script type="text/javascript" src="/js/settings/ethernet-settings.js"></script>

	<a id="back-btn" href="/settings/" class="back-btn"><img src="/images/img.gif" />Settings</a>

	<div class="mcg">
		<div class="headline">Network Settings</div>

		<div id="ethernet-settings" class="settings">
			<div class="title">Ethernet Settings</div>
			<div class="setting">
				<span class="label">Mode: </span>
				<a id="disabled-btn" href="#">DISABLED</a>
				<a id="static-btn" href="#">STATIC</a>
				<a id="dhcp-btn" href="#">DCHP</a>
			</div>
			<div id="static-settings">
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
			</div>
			<a id="save-btn" href="#" class="border-btn">Save</a>
			<a id="cancel-btn" href="#" class="border-btn">Cancel</a>
			<a id="reset-btn" href="#" class="border-btn">Revert to Factory Settings</a>
		</div>
	</div>
</div>