<? include $_SERVER['DOCUMENT_ROOT'] . '/settings/base.php'; ?>

<div id="mc" class="mc">
	<link type="text/css" rel="stylesheet" href="/css/settings/ethernet-settings.css">
	<script type="text/javascript" src="/js/settings/ethernet-settings.js"></script>

	<a id="back-btn" href="/settings/" class="back-btn"><img src="/images/img.gif" />Settings</a>

	<div class="mcg">
		<div class="headline">Ethernet Settings</div>

			<div class="setting">
				<span class="label">Mode:</span>
				<a id="mode-btn" href="#" class="dropdown-btn">DISABLED</a>
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
			</div>

			<div class="buttons">
				<a id="save-btn" href="#" class="border-btn">Save</a><!--
			 --><a id="cancel-btn" href="#" class="border-btn">Cancel</a><!--
			 --><a id="reset-btn" href="#" class="border-btn">Factory Settings</a>
			</div>

			<div id="mode-dropdown" class="dropdown">
				<div class="dropdown-header">Ethernet Mode</div>
				<a id="dropdown-option" href="#" value="OFF" class="dropdown-option selected"><img src="/images/img.gif">DISABLED</a>
				<a id="dropdown-option" href="#" value="STATIC" class="dropdown-option"><img src="/images/img.gif">STATIC</a>
				<a id="dropdown-option" href="#" value="DYNAMIC" class="dropdown-option"><img src="/images/img.gif">DHCP</a>
			</div>

		</div>
	</div>
</div>